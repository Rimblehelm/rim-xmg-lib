Param(
  [string]$EnvironmentName = "release",
  [string]$Reviewers = ""
)

function Write-Usage {
  Write-Host "Usage: .\create-environment.ps1 -EnvironmentName <env> [-Reviewers user1,user2,org/team]"
  Write-Host "Requires GH CLI installed and authenticated with a user who can manage environments."
}

if (-not $EnvironmentName) { Write-Usage; exit 1 }

$repo = gh repo view --json nameWithOwner -q .nameWithOwner
$owner, $repoName = $repo -split '/' , 2

Write-Host "Creating environment '$EnvironmentName' in $repo"

# If no GH_TOKEN env var is present, ensure the local gh CLI is authenticated.
if (-not $env:GH_TOKEN) {
  $authOk = $false
  try {
    gh auth status > $null 2> $null
    $authOk = $true
  } catch {
    $authOk = $false
  }
  if (-not $authOk) {
    Write-Host "ERROR: GH_TOKEN is not set and gh is not authenticated."
    Write-Host "If running in GitHub Actions, set the ADMIN_GITHUB_TOKEN repository secret to a personal access token with 'repo' and optionally 'admin:org' scopes."
    Write-Host "If running locally, run 'gh auth login' to authenticate or set GH_TOKEN."
    exit 1
  }

  try {
    gh api --method PUT "/repos/$owner/$repoName/environments/$EnvironmentName" > $null 2> $null
  } catch {
    Write-Host "ERROR: Couldn't create or update environment '$EnvironmentName'. This usually means the token used by gh lacks permission (HTTP 403)."
    Write-Host "When running from Actions, configure the ADMIN_GITHUB_TOKEN repository secret with a PAT that has the 'repo' scope and try again."
    exit 1
  }
if (-not (gh api --method PUT "/repos/$owner/$repoName/environments/$EnvironmentName" 2>$null)) {
  Write-Host "ERROR: Couldn't create or update environment '$EnvironmentName'. This usually means the token used by gh lacks permission (HTTP 403)."
  Write-Host "When running from Actions, configure the ADMIN_GITHUB_TOKEN repository secret with a PAT that has the 'repo' scope and try again."
  exit 1
}
Write-Host "Using GH user: $(gh api /user -q .login 2>$null)"

if ($Reviewers -ne "") {
  $reviewerList = $Reviewers -split ',' | ForEach-Object { $_.Trim() }
  $reviewersJson = @()

  foreach ($r in $reviewerList) {
    if ($r -like '*/*') {
      # team
      $parts = $r -split '/'
      $org = $parts[0]
      $slug = $parts[1]
      try {
        $team = gh api "/orgs/$org/teams/$slug" -q .id 2>$null
      } catch {
        Write-Host "WARNING: cannot resolve team '$org/$slug' — skipping" -ForegroundColor Yellow
        continue
      }
      if (-not $team) { Write-Host "WARNING: team '$org/$slug' not found; skipping" -ForegroundColor Yellow; continue }
      $reviewersJson += @{ type = 'Team'; id = [int]$team }
    } else {
      try {
        $uid = gh api "/users/$r" -q .id 2>$null
      } catch {
        Write-Host "WARNING: user '$r' not found or inaccessible; skipping" -ForegroundColor Yellow
        continue
      }
      if (-not $uid) { Write-Host "WARNING: user '$r' not found; skipping" -ForegroundColor Yellow; continue }
      $reviewersJson += @{ type = 'User'; id = [int]$uid }
    }
  }

  $payload = @{ type = 'required_reviewers'; reviewers = $reviewersJson; required_approving_review_count = 1 } | ConvertTo-Json -Depth 5
  $tmp = [System.IO.Path]::GetTempFileName()
  $payload | Out-File -FilePath $tmp -Encoding utf8
  try {
    gh api --method POST "/repos/$owner/$repoName/environments/$EnvironmentName/protection_rules" --input $tmp
  } catch {
    Write-Host "WARNING: could not add protection rule via GitHub API. This may be caused by permission restrictions or a different API path."
    Write-Host "Retrying with verbose output for diagnostics..."
    try {
      gh api --method POST "/repos/$owner/$repoName/environments/$EnvironmentName/protection_rules" --input $tmp --verbose
    } catch {
      Write-Host "Cannot add protection rule automatically."
      Write-Host "You can add the required reviewers via the UI: Settings -> Environments -> $EnvironmentName -> Protection rules."
      Write-Host "Or re-run this script with an ADMIN_GITHUB_TOKEN that has 'repo' and 'admin:org' scopes."
    }
  }
  Remove-Item $tmp
}

Write-Host "Done."
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

gh api --method PUT "/repos/$owner/$repoName/environments/$EnvironmentName" | Out-Null

if ($Reviewers -ne "") {
  $reviewerList = $Reviewers -split ',' | ForEach-Object { $_.Trim() }
  $reviewersJson = @()

  foreach ($r in $reviewerList) {
    if ($r -like '*/ *') {
      # team
      $parts = $r -split '/'
      $org = $parts[0]
      $slug = $parts[1]
      $team = gh api "/orgs/$org/teams/$slug" -q .id
      $reviewersJson += @{ type = 'Team'; id = [int]$team }
    } else {
      $uid = gh api "/users/$r" -q .id
      $reviewersJson += @{ type = 'User'; id = [int]$uid }
    }
  }

  $payload = @{ type = 'required_reviewers'; reviewers = $reviewersJson; required_approving_review_count = 1 } | ConvertTo-Json -Depth 5
  $tmp = [System.IO.Path]::GetTempFileName()
  $payload | Out-File -FilePath $tmp -Encoding utf8
  gh api --method POST "/repos/$owner/$repoName/environments/$EnvironmentName/protection_rules" --input $tmp
  Remove-Item $tmp
}

Write-Host "Done."
# PowerShell script to validate NPM token locally
# - Set environment variable $env:NPM_TOKEN before running
# - Uses a temporary .npmrc and runs npm whoami + npm publish --dry-run

if (-not $env:NPM_TOKEN) {
  # Use single quotes to avoid escaping the backticks inside the string
  Write-Error 'NPM_TOKEN is not set. In PowerShell: `$env:NPM_TOKEN=''your-token''`'
  exit 1
}

$TempNpmrc = [System.IO.Path]::GetTempFileName()
try {
  Set-Content -Path $TempNpmrc -Value "//registry.npmjs.org/:_authToken=$($env:NPM_TOKEN)"
  $env:NPM_CONFIG_USERCONFIG = $TempNpmrc
  Write-Host "Using temporary npm config: $TempNpmrc"

  Write-Host "1/2: npm whoami"
  $whoami = npm whoami --registry https://registry.npmjs.org/ 2>$null
  if (-not $whoami) {
    Write-Error "npm whoami failed — token invalid or lacks read access"
    npm whoami --registry https://registry.npmjs.org/ | out-host
    exit 1
  }
  Write-Host "Authenticated as: $whoami"

  Write-Host "2/2: npm publish --dry-run"
  $outfile = Join-Path -Path $env:TEMP -ChildPath "npm-publish-dryrun.log"
  npm publish --dry-run --registry https://registry.npmjs.org/ 2>&1 | Tee-Object -FilePath $outfile
  if ($LASTEXITCODE -eq 0) {
    Write-Host "Dry-run succeeded — token appears valid for publishing"
    Remove-Item $outfile -ErrorAction SilentlyContinue
    exit 0
  }

  $content = Get-Content $outfile -Raw
  if ($content -match 'EOTP') {
    Write-Error "EOTP detected — npm requires one-time password for publish. Use an Automation token for CI."
    exit 1
  }
  if ($content -match '401' -or $content -match 'Unauthorized') {
    Write-Error "401/Unauthorized detected — token may not have publish permissions"
    exit 1
  }
  Write-Error "Unknown error — see $outfile for details"
  exit 1
} finally {
  if (Test-Path $TempNpmrc) { Remove-Item $TempNpmrc -Force }
}

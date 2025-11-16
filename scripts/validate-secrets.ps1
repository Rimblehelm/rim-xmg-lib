<#
Usage:
  PowerShell:
    $env:NPM_TOKEN = 'xxx'; $env:COVERALLS_REPO_TOKEN = 'yyy'; .\scripts\validate-secrets.ps1 -Secrets NPM_TOKEN,COVERALLS_REPO_TOKEN
  Or simply run: .\scripts\validate-secrets.ps1 -Secrets 'NPM_TOKEN'
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$Secrets,
    [switch]$Warn
)

$names = $Secrets.Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }
$missing = $false

foreach($name in $names) {
    if (-not $env:$name) {
        Write-Host "MISSING: $name" -ForegroundColor Yellow
        $missing = $true
    } else {
        Write-Host "OK: $name" -ForegroundColor Green
    }
}

if ($missing) {
    if ($Warn) {
        Write-Warning "One or more secrets are missing. See docs/SECRETS.md for details, but continuing because -Warn was set."
        exit 0
    }

    Write-Error "One or more secrets are missing. See docs/SECRETS.md for details."
    exit 1
}

Write-Host "All requested secrets are present." -ForegroundColor Green
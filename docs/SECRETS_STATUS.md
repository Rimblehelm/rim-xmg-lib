# Secrets Status

This document explains the automated secrets status tracking system for the `rim-xmg-lib` repository.

## Overview

The repository uses an automated workflow ([`secret-status-check.yml`](../.github/workflows/secret-status-check.yml)) to validate that required repository secrets are properly configured for CI/CD operations. The status is displayed as a badge in the README:

[![Publish readiness](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/rimblehelm/rim-xmg-lib/main/docs/SECRETS_STATUS.json)](SECRETS_STATUS.md)

## How It Works

### Automated Checks

The `Secret Status Check` workflow runs automatically:
- **Weekly**: Every Monday at 6:00 AM UTC (scheduled via cron)
- **On push**: When commits are pushed to the `main` branch
- **On tag creation**: When version tags (e.g., `v0.0.5`) are created
- **On release**: When a GitHub Release is published
- **Manual trigger**: Can be run manually from the Actions tab

### What Gets Checked

The workflow validates the following repository secrets:

1. **`NPM_TOKEN`** (required for publishing to npmjs.org)
   - Checks if the secret exists
   - Validates that it's an **Automation** token (not a personal 2FA-protected token)
   - Verifies authentication via `npm whoami`
   - Tests publish permissions with `npm publish --dry-run`

2. **`COVERALLS_REPO_TOKEN`** (required for coverage reporting)
   - Checks if the secret exists
   - Validates the token can authenticate with Coveralls API
   - Required only for private repositories

### Status Output

The workflow creates:

1. **GitHub Check Run**: A check named "Secrets Status" attached to the commit
   - Shows which secrets are present/missing
   - Displays validation results for each secret
   - Conclusion: `success` if all required secrets are valid, `failure` otherwise

2. **Commit Status**: A status indicator visible on commits and PRs
   - Context: "Secrets Status"
   - Description: Summary of NPM_TOKEN status
   - State: `success` or `failure`

3. **`SECRETS_STATUS.json`**: A shields.io endpoint badge definition
   - Located at `docs/SECRETS_STATUS.json`
   - Used to generate the publish readiness badge
   - Updated automatically (if `STATUS_COMMIT_TOKEN` is configured)

## Badge States

The publish readiness badge in the README can show:

| Color | Message | Meaning |
|-------|---------|---------|
| 🟢 Green | `ready` | NPM_TOKEN is present and valid (Automation token) |
| 🟡 Yellow | `Not checked yet` | Initial state, workflow hasn't run yet |
| 🔴 Red | `NPM_TOKEN missing` | NPM_TOKEN secret is not configured |
| 🔴 Red | `Invalid token` | NPM_TOKEN exists but validation failed |

## Configuration

### Required Secrets

Set these in **Settings → Secrets and variables → Actions**:

#### For Publishing to npmjs.org (Token-based)

- **`NPM_TOKEN`**: npm Automation token
  - Create at: https://www.npmjs.com/settings/access-tokens
  - Type: **Automation** (required for CI, bypasses 2FA)
  - Permissions: Read and Publish
  - Used by: `publish.yml`, `release.yml` workflows

#### For Publishing to npmjs.org (Trusted Publishing/OIDC)

If using Trusted Publishing (OIDC), you don't need `NPM_TOKEN`. Instead:
- Configure a Trusted Publisher on npmjs.com pointing to this repository
- Set workflow inputs: `use_npm=true` and `use_oidc=true`
- See [README.md](../README.md#trusted-publishing-oidc) for setup instructions

#### For Coverage Reporting (Private repos only)

- **`COVERALLS_REPO_TOKEN`**: Coveralls repository token
  - Get from: https://coveralls.io/github/rimblehelm/rim-xmg-lib
  - Required: Only for private repositories
  - Used by: `ci.yml` workflow

### Optional Secrets

- **`STATUS_COMMIT_TOKEN`**: GitHub Personal Access Token (PAT)
  - Scope: `repo` (full control of private repositories)
  - Purpose: Allows the status workflow to commit `SECRETS_STATUS.json` changes
  - If not set: The workflow runs read-only checks only
  - Create at: https://github.com/settings/tokens

- **`ADMIN_GITHUB_TOKEN`**: GitHub Personal Access Token (PAT)
  - Scopes: `repo`, `admin:org`
  - Purpose: Enables environment creation workflows to add reviewers
  - Used by: `create-environment.yml` workflow

## Troubleshooting

### NPM_TOKEN Validation Fails

**Symptom**: Badge shows "Invalid token" or workflow fails the NPM check

**Common causes**:
1. Token is not an Automation token (uses 2FA/OTP)
2. Token has expired or been revoked
3. Token lacks publish permissions for the scoped package

**Fix**:
1. Go to https://www.npmjs.com/settings/access-tokens
2. Delete the old token
3. Create a new **Automation** token with Read and Publish permissions
4. Update the `NPM_TOKEN` secret in GitHub

**Verify locally**:
```bash
export NPM_TOKEN=your-token-here
./scripts/test-npm-token.sh
```

### COVERALLS_REPO_TOKEN Missing

**Symptom**: Coverage reports don't appear, Coveralls check fails

**Fix**:
1. Go to https://coveralls.io and enable your repository
2. Copy the repository token
3. Add it as `COVERALLS_REPO_TOKEN` in GitHub Secrets

**Note**: Public repositories don't require this token; only private repos need it.

### EOTP Error When Publishing

**Symptom**: `npm publish` fails with EOTP (one-time password) error

**Cause**: The NPM_TOKEN is a personal token that requires 2FA, not an Automation token

**Fix**: Create an Automation token on npmjs.com (see above)

### 401/Unauthorized Error

**Symptom**: npm commands fail with 401 Unauthorized

**Common causes**:
1. Token is invalid or expired
2. Token doesn't have publish access for `@rimblehelm/rim-xmg-lib`
3. Wrong registry URL configured

**Fix**:
1. Verify token permissions on npmjs.com
2. Ensure the token has publish access for the organization scope
3. Check `publishConfig.registry` in package.json matches the target registry

## Local Validation

You can validate secrets locally before pushing:

### Test NPM Token (Bash/Linux/macOS/Git Bash)
```bash
export NPM_TOKEN=your-token-here
./scripts/test-npm-token.sh
```

### Test NPM Token (PowerShell/Windows)
```powershell
$env:NPM_TOKEN = 'your-token-here'
.\scripts\test-npm-token.ps1
```

### Test Coveralls Token
```bash
export GITHUB_REPOSITORY="rimblehelm/rim-xmg-lib"
export COVERALLS_REPO_TOKEN="your-token-here"
npm run check:coveralls
```

### Check Token Type
```bash
npm token list --json --registry https://registry.npmjs.org/ | node -e "const fs=require('fs'); const s=fs.readFileSync(0,'utf8'); const tokens=(s?JSON.parse(s):[]); console.log(tokens.some(t=>t.type==='automation'))"
```

Should print `true` for Automation tokens.

## Badge Integration

The README includes a badge that displays the current publish readiness status:

```markdown
[![Publish readiness](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/rimblehelm/rim-xmg-lib/main/docs/SECRETS_STATUS.json)](docs/SECRETS_STATUS.md)
```

The badge:
- Fetches data from `docs/SECRETS_STATUS.json` in the repository
- Updates automatically when the status workflow runs (if `STATUS_COMMIT_TOKEN` is set)
- Links to this documentation file for details

## Workflow Permissions

The `secret-status-check.yml` workflow requires:

```yaml
permissions:
  checks: write       # Create check runs
  statuses: write     # Create commit statuses
  contents: read      # Read repository secrets list
```

If `STATUS_COMMIT_TOKEN` is configured, the workflow also needs:
- `contents: write` - To commit `SECRETS_STATUS.json` updates

## Related Documentation

- [SECRETS.md](SECRETS.md) - Guide to setting up repository secrets
- [README.md](../README.md#publishing-details--troubleshooting) - Publishing and troubleshooting
- [publish.yml](../.github/workflows/publish.yml) - Publish workflow
- [release.yml](../.github/workflows/release.yml) - Release workflow

## Quick Reference

| Secret | Purpose | Required For | How to Create |
|--------|---------|--------------|---------------|
| `NPM_TOKEN` | Publish to npmjs.org | Token-based publish | [npm access tokens](https://www.npmjs.com/settings/access-tokens) → Automation |
| `COVERALLS_REPO_TOKEN` | Coverage reports | Private repos | [Coveralls](https://coveralls.io) → Your repo → Settings |
| `STATUS_COMMIT_TOKEN` | Auto-update status badge | Optional enhancement | [GitHub tokens](https://github.com/settings/tokens) → `repo` scope |
| `ADMIN_GITHUB_TOKEN` | Create environments with reviewers | Optional automation | [GitHub tokens](https://github.com/settings/tokens) → `repo`, `admin:org` |

---

**Last updated**: November 16, 2025
**Workflow**: `.github/workflows/secret-status-check.yml`
**Badge endpoint**: `docs/SECRETS_STATUS.json`

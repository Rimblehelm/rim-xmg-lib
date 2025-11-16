# Contributing

Thanks for wanting to contribute!

## Quick checks

Before opening a PR, please run lint and type checks:

```bash
npm run lint
npm run typecheck
```

## Secrets and publishing

This repo uses a few GitHub Actions secrets for publishing and coverage reports. See `docs/SECRETS.md` for a full explanation.

Quick steps you can follow locally to validate secrets required for publishing:

Bash/macOS/WSL:

```bash
export NPM_TOKEN=your-token-or-empty
export COVERALLS_REPO_TOKEN=maybe
./scripts/validate-secrets.sh NPM_TOKEN COVERALLS_REPO_TOKEN
```

PowerShell:

```pwsh
$env:NPM_TOKEN = 'your-token'
.\scripts\validate-secrets.ps1 -Secrets 'NPM_TOKEN,COVERALLS_REPO_TOKEN'
```

If you plan to publish to npmjs.org from CI, either create an npm Automation token and add it to the repository secrets (name it `NPM_TOKEN`) or configure Trust Publishing (OIDC) for this repository and workflow.

Warning-only mode:

The validation scripts support a warning mode so CI can continue when secrets are optional. To run in warn-only mode:

```bash
./scripts/validate-secrets.sh NPM_TOKEN COVERALLS_REPO_TOKEN --warn
```

PowerShell:

```pwsh
.\scripts\validate-secrets.ps1 -Secrets 'NPM_TOKEN,COVERALLS_REPO_TOKEN' -Warn
```

See `docs/SECRETS.md` for more details and instructions.

## Standardized token checks

To keep secret validation consistent across workflows we provide a local action `./.github/actions/check-npm-token`. Use it when any workflow relies on `NPM_TOKEN`.

Warn-only example (recommended for non-critical workflows like docs builds):

```yaml
- name: Check NPM token for docs (warn-only)
	id: npm_check_docs
	uses: ./.github/actions/check-npm-token
	env:
		NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

- name: Show NPM token check result
	run: |
		echo "NPM token check: ${{ steps.npm_check_docs.outputs.result }}"
```

Fail-if-not-automation example (recommended for publishing):

```yaml
- name: Check NPM token type (automation)
	id: npm_check_action
	uses: ./.github/actions/check-npm-token
	env:
		NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

- name: Fail when token is not Automation
	if: ${{ !contains(steps.npm_check_action.outputs.result, 'automation token found') && github.event.inputs.use_npm == 'true' }}
	run: |
		echo "ERROR: NPM_TOKEN is not an Automation token; create an Automation token and add it as NPM_TOKEN in repo secrets.";
		exit 1
```
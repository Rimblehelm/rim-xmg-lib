[!NOTE] You can restrict who can update the `SECRETS_STATUS.json` by adding a `STATUS_COMMIT_TOKEN` repository secret; the status workflow will only commit changes if this secret is present.
# rim-xmg-lib

[![CI](https://github.com/Rimblehelm/rim-xmg-lib/actions/workflows/ci.yml/badge.svg)](https://github.com/Rimblehelm/rim-xmg-lib/actions/workflows/ci.yml)
[![Docs CI](https://github.com/rimblehelm/rim-xmg-lib/actions/workflows/docs.yml/badge.svg)](https://github.com/rimblehelm/rim-xmg-lib/actions/workflows/docs.yml)
[![Release](https://github.com/rimblehelm/rim-xmg-lib/actions/workflows/release.yml/badge.svg)](https://github.com/rimblehelm/rim-xmg-lib/actions/workflows/release.yml)
[![Docs Website](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=online&url=https://rimblehelm.github.io/rim-xmg-lib/)](https://rimblehelm.github.io/rim-xmg-lib/)
[![Docs Deploy](https://github.com/rimblehelm/rim-xmg-lib/actions/workflows/docs.yml/badge.svg)](https://github.com/rimblehelm/rim-xmg-lib/actions/workflows/docs.yml)
[![Coverage](https://coveralls.io/repos/github/rimblehelm/rim-xmg-lib/badge.svg?branch=main)](https://coveralls.io/github/rimblehelm/rim-xmg-lib)
Note: Coveralls will post a comment on pull requests with a link to the coverage report.

[![Secrets](https://img.shields.io/badge/Secrets-NPM_TOKEN%20%7C%20COVERALLS%20REPO%20TOKEN-lightgrey)](docs/SECRETS.md)

[![Publish readiness](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/rimblehelm/rim-xmg-lib/main/docs/SECRETS_STATUS.json)](docs/SECRETS_STATUS.md)

### Coveralls setup

To enable Coveralls reporting on PRs and see the coverage badge in this README, add a repository secret named `COVERALLS_REPO_TOKEN` in GitHub (only required for private repositories). Steps:

1. Go to your repo Settings -> Secrets -> Actions -> New repository secret
2. Name it `COVERALLS_REPO_TOKEN` and paste the token from Coveralls
3. Push a commit or open a PR and the CI will upload coverage and post a link in the PR comments

If you want CI to fail when coverage drops below the configured threshold, we enforce this via `vitest` settings in `vitest.config.ts` which defines 80% thresholds for statements, branches, functions and lines.

See `docs/SECRETS.md` for a short guide to setting repository secrets used in CI and publishing (e.g., `COVERALLS_REPO_TOKEN`, `NPM_TOKEN`).

A small TypeScript utility library for parsing Coin Magi (XMG) blocks and transactions.

## Quick start

Install and build:

```bash
npm install
npm run build
```

Install from GitHub Packages (published as a scoped package):

```bash
npm install @rimblehelm/rim-xmg-lib
```

If you need to publish to npmjs.org instead of GitHub Packages, set an `NPM_TOKEN` secret and update the publish step in `.github/workflows/publish.yml` to use the npm registry URL (`https://registry.npmjs.org/`) and `NODE_AUTH_TOKEN` set to `${{ secrets.NPM_TOKEN }}`.
You can also validate your Coveralls token locally:

```bash
export GITHUB_REPOSITORY="<owner>/<repo>"
export COVERALLS_REPO_TOKEN="<your-token>"
npm run check:coveralls
```
Local token validation scripts
------------------------------

To validate an `NPM_TOKEN` locally (recommended before pushing), use the included scripts (Bash and PowerShell):

- Linux/macOS / Git Bash / WSL:

```bash
export NPM_TOKEN=your-token-here
./scripts/test-npm-token.sh
```

- Windows PowerShell:

```powershell
$env:NPM_TOKEN = 'your-token-here'
.\scripts\test-npm-token.ps1
```

These scripts perform two checks:
- `npm whoami --registry https://registry.npmjs.org/` — ensures the token can authenticate.
- `npm publish --dry-run --registry https://registry.npmjs.org/` — validates that the token can publish (dry-run).

Additionally, you can verify locally that the token is an Automation token by running:

```bash
npm token list --json --registry https://registry.npmjs.org/ | node -e "const fs=require('fs'); const s=fs.readFileSync(0,'utf8'); const tokens=(s?JSON.parse(s):[]); console.log(tokens.some(t=>t.type==='automation'))"
```

This prints `true` if the token is an Automation token (suitable for CI). If it prints `false` or fails, create an Automation token on npmjs.

If the account requires 2FA for publishing, the dry-run will show an `EOTP` error. In that case create a new npm Automation token via the npm website and place the token in the `NPM_TOKEN` secret in GitHub.

To publish from the `Publish` workflow to npmjs.org via manual dispatch, use the `workflow_dispatch` input `use_npm=true` and ensure your `NPM_TOKEN` secret is set. The workflow will fail early if `NPM_TOKEN` is missing. Example (from Actions UI):

- Open the `Publish` workflow in the Actions tab and click **Run workflow**
- Select `use_npm: true` then click **Run workflow**

This will switch the registry to `https://registry.npmjs.org/` and use `NPM_TOKEN` to authenticate.

### Publishing details & troubleshooting

- npm Automation token: If your npm account requires 2FA for publishing, you must create an "Automation" token on npmjs (Profile → Access Tokens → Create New Token → Automation) and add it as `NPM_TOKEN` in your repository secrets. Personal 2FA codes or interactive tokens will not work in CI and will cause an `EOTP` error.
- Quick GH CLI dispatch (npm):

```bash
gh workflow run "Publish" --ref master --repo rimblehelm/rim-xmg-lib --field use_npm=true
```

- How the workflow helps debug:
	- The `Check NPM token (whoami)` step authenticates to the configured registry and prints the npm username — this confirms your token is valid.
	- The new `Debug npm config and whoami` step prints the `npm` global registry and the resolved scoped registry for your package scope so you can confirm the publish target.
	- The `Publish to npm registry (EOTP aware)` step captures `npm` logs and prints a helpful remediation message if `EOTP` (2FA) or `401`/`Unauthorized` errors occur.

	Trusted publishing (OIDC)
	-------------------------

	This repo supports `Trusted publishing` (OIDC) for publishing to npmjs.org so you shouldn't need long-lived tokens in CI.

	Steps to use Trusted Publishing:
	- Create a Trusted Publisher for your package on npmjs.com and point it to your repo and the workflow filename `publish.yml`.
	- Ensure your `Publish` workflow includes the `id-token: write` permission (the workflow in this repo sets it by default).
	- When manually dispatching the `Publish` workflow, select `use_npm: true` and `use_oidc: true` — this will attempt to use OIDC to publish (no `NPM_TOKEN` required).

	How to add Trusted Publisher on npmjs.com (high level):
	1. Sign in to npmjs.com and go to your package page.
	2. Open Settings → Trusted Publisher (section).
	3. Choose `GitHub Actions` as the provider.
	4. Fill in Organization/User and Repository. For the workflow filename enter `publish.yml` (this must match exactly — case-sensitive).
	5. Save and try running the `Publish` job again with `use_oidc: true`.

	Troubleshooting: If the publish step fails with `ENEEDAUTH` or `need auth`, then the repository isn't set up as a trusted publisher or the workflow filename doesn't match. If you prefer not to use Trusted Publishing, set `use_oidc: false` and create an automation token on npm (or a proper granular token) and configure `NPM_TOKEN` in GitHub secrets.

	If OIDC-based trusted publishing isn't configured for your repo, the workflow will fall back to the token-based path if you supply an `NPM_TOKEN`. The workflow contains helpful diagnostics and instructions to create an Automation (or granular) token if necessary.

	Short Publish checklist (quick reference):

	1. Set repository secret `NPM_TOKEN` with an npm Automation token if publishing to npmjs.org using token-based auth.
	2. Alternatively, enable Trusted Publishing (OIDC) on npmjs and run `Publish` with `use_oidc=true` — then you do not need `NPM_TOKEN`.
	3. For private repos, add `COVERALLS_REPO_TOKEN` to enable coverage uploads and PR comments.

	Note: The `Publish` workflow has a pre-check that will fail early if `use_npm=true` and `use_oidc=false` but `NPM_TOKEN` isn't set; this prevents confusing late failures when publishing to npmjs.org.

	New in CI: we also added a step that checks your NPM token's type and fails early if the token is not an "Automation" token. This reduces confusion caused by 2FA (EOTP) tokens which cannot be used in CI.

If you need help creating an npm Automation token I can add a short visual guide or a script to validate the token locally.

Re-run Publish from the CLI
--------------------------

After you set `NPM_TOKEN` to an Automation token, you can trigger the `Publish` workflow from the command line (GH CLI) as follows:

```bash
gh workflow run "Publish" --ref master --repo rimblehelm/rim-xmg-lib --field use_npm=true
```

Note: the repository now triggers package publishes once a GitHub Release is created. The `Publish` workflow is triggered on `release: published` and is protected by the `release` environment (requires reviewers) so the release package step will pause for approval before publishing. If you want to publish by hand instead, the `Publish` workflow remains callable from the Actions UI (`workflow_dispatch`).

You can also validate your token locally with the included `npm` script:

```bash
npm run test:npm-token
```

Automatic release environment creation
-------------------------------------

You can create a `release` environment and add required reviewers using the GitHub CLI. This is helpful to ensure there's a manual approval step for publishing from CI.

Requirements:
- GitHub CLI (`gh`) installed and authenticated (run `gh auth login`).
- You must be a repository admin to manage environments.

Example (Bash):

```bash
./scripts/create-environment.sh release mikee.kelly,orgname/reviewers-team
```

Example (PowerShell):

```powershell
.\\scripts\\create-environment.ps1 -EnvironmentName release -Reviewers "mikee.kelly,orgname/reviewers-team"
```

The script will create the environment and add a protection rule requiring reviews from the specified users or teams. Use this if you want a human to approve the release job before GitHub Actions publishes the package.

Notes & troubleshooting for reviewers:
- Reviewer entries must be valid GitHub usernames or an `org/team-slug` (e.g., `myorg/docs-team`). If a user or team is not found you'll get a 404 from the API.
- The workflow runs with a token: prefer using the `ADMIN_GITHUB_TOKEN` repository secret (a PAT) with `repo` and `admin:org` scopes when creating reviewers for org teams.
- If the script cannot add reviewers automatically it will still create the environment; you will then need to add the reviewer(s) manually via Settings → Environments → <env> → Protection rules.

Create `docs` environment for docs deploy
---------------------------------------

Create a `docs` environment to protect automated Docs deployment (the `deploy-pages` job is now gated by this environment).
Use the same GH CLI script provided earlier to create the docs environment and require reviewers:

```bash
./scripts/create-environment.sh docs docs-team,docs-manager
```

This will create the `docs` environment; when the `deploy-pages` job runs, it will pause and require approval if you set that in the environment's protection rules.

GitHub Actions — create environment workflow
--------------------------------------------

We've added a `Create Release Environment` workflow to let repository admins create an environment and protection rules from the GitHub Actions UI (or via GH CLI). This is particularly helpful for protecting the `release` environment used by the `release.yml` workflow. Quick notes:

- Run the workflow via the Actions UI (search for "Create Release Environment") or from the CLI:

```pwsh
gh workflow run "Create Release Environment" --repo rimblehelm/rim-xmg-lib --ref master --field envName=release --field reviewers="mikee.kelly,orgname/reviewers-team"
```

- Required permissions: the `GITHUB_TOKEN` used by workflow must belong to a user with permissions to manage environments and protection rules, so you must either:
	- Run the workflow manually from an admin account, or
	- Run the `scripts/create-environment.sh` / `scripts/create-environment.ps1` locally under a user with admin rights.

If you'd like the workflow to be run by Automation (e.g., on repository creation), create a repository secret named `ADMIN_GITHUB_TOKEN` containing a personal access token (PAT) with adequate permissions. This PAT must be created by an account that has admin access to the repository.

How to create the PAT and secret:
- Generate a Personal Access Token (classic) with the `repo` scope (and `admin:org` if you plan to add org teams as reviewers) at https://github.com/settings/tokens
- On the repository settings, go to `Settings -> Secrets and variables -> Actions -> New repository secret` and add the token as `ADMIN_GITHUB_TOKEN`.

When `ADMIN_GITHUB_TOKEN` is present the `Create Release Environment` and `Auto-create Release Environment` workflows will use it to create environments and add protection rules automatically; otherwise the workflows fallback to the default `GITHUB_TOKEN` (which often lacks admin rights and can produce a 403 error).

How to check token scopes from your shell (optional):

```bash
# Replace <PAT> with your personal access token
curl -I -H "Authorization: token <PAT>" https://api.github.com/user | grep -i x-oauth-scopes
```

The output will show the scopes attached to the token. You need at least `repo` for repository-level actions; add `admin:org` if you're adding reviewers from organization teams.

- The workflow itself sets up the environment and creates a protection rule that requires at least 1 approving reviewer from the list you provide. After the environment exists, the `release.yml` workflow will pause at the environment approval step and require a reviewer to approve.

If you prefer automated environment creation from CI (not recommended for security reasons), tell me and I can add an extra trigger to automate it on a push to `master`.

Auto-create environment on repo template creation
-------------------------------------------------

The repository contains an `Auto-create Release Environment` workflow that runs when a repository is created from a template. It will automatically create a `release` environment for you. This is convenient if you use a template to create new repos and want the release gating to exist immediately.

- The workflow runs on the `repository.created` event and will only execute when `repository.is_template` is true.
- It creates a `release` environment but does not add reviewers automatically — you can add reviewers via the `Create Release Environment` workflow or by running the script locally.

If you do not want this behavior for new repos created from templates, delete or disable `.github/workflows/auto-create-environment.yml`.

Configuring `release.yml` at run-time (optional inputs)
-----------------------------------------------------

The `release.yml` workflow supports manual runs (and tag pushes). When running manually from the Actions UI or `gh workflow run` you can override two inputs:

- `envName` — which environment to use for gating the publish step. Default: `release`.
- `dryRun` — if set to `true`, the publish step will run `npm publish --dry-run` and will not actually publish a package. Default: `false`.

Examples:

```bash
# Run the workflow manually with a different environment and dry run
gh workflow run "Release" --ref master --repo rimblehelm/rim-xmg-lib --field envName=preprod --field dryRun=true
```

If instead you push a tag like `v0.0.3`, the workflow will trigger automatically and use the default environment name and publish behavior (env `release`, `dryRun=false`) unless you specifically trigger the workflow via the UI or CLI and set inputs.

Generate API docs locally:

```bash
npm run docs
# docs will be generated to ./docs
```

The GitHub Actions workflow will also build and publish docs to GitHub Pages on push to `main` (or `master`) and on pull requests.

### GitHub Pages badge

Add the following badge to the top of your README to point to published docs (replace USERNAME/REPO):

`[![Docs](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=online&url=https://USERNAME.github.io/REPO/)](https://USERNAME.github.io/REPO/)`

## Example usage

Basic example in TypeScript:

```ts
import { XMGTransaction } from 'rim-xmg-lib';
import { XMGWallet } from 'rim-xmg-lib';

const txJson = `{"txid":"abc123","version":1,"time":1600000000,"locktime":0,"vin":[],"vout":[]}`;
const tx = XMGTransaction.fromJSON(txJson);
console.log(tx.ID); // 'abc123'

const wallet = new XMGWallet({ address: 'Xx...', createdAt: new Date(), transactions: [] });
console.log(wallet.balance); // 0 (no transactions)
```

Default-import example (backwards compatible):

```ts
import rim from 'rim-xmg-lib';

const txJson = `{"txid":"def456","version":1,"time":1600000000,"locktime":0,"vin":[],"vout":[]}`;
const tx = rim.XMGTransaction.fromJSON(txJson);
console.log(tx.ID);
```

## Examples

Examples are located under `examples/`. TypeDoc is configured to include the `examples` entry point so they will be rendered in the generated docs. See `examples/transaction-example.ts` for a small demo script.

## Contributing

- Run `npm run lint` and `npm run typecheck` before committing.
- Docs are automatically generated by GitHub Actions and published to the `gh-pages` branch.

### Labels & Release Categories

Pull requests will be auto-labeled by file changes (using `actions/labeler`).
The following labels are recognized and will be used to add items to releases via Release Drafter:

	- `feature`, `enhancement`, `feat` — Features and new functionality
	- `bug`, `fix` — Bug fixes
	- `docs` — Documentation changes
	- `chore` — Maintenance tasks
	- `tests` — Tests or CI-related changes
	- `ci`, `build` — Build system / CI changes
	- `refactor` — Code refactors (no functionality change)
	- `security` — Security fixes
	- `dependencies` — Dependency upgrades (lockfile, package.json)
	- `example` — Example code and demos

If your PR touches `src/` files it will be labeled `feature` by default; if it touches `tests/`, `docs/` or `examples/` it will be labeled accordingly. You can also apply labels manually when opening a PR to be more specific (for example `bug` or `breaking`), and those will take precedence in Release Drafter's release notes.

### Release & Changelog

We use `release-drafter` to create draft releases and `auto-changelog` to maintain `CHANGELOG.md` on releases/tags. When you merge a PR into `main`, `release-drafter` will update the draft; when a release is published (or a tag `v*` is pushed), a workflow will publish the package and auto-generate `CHANGELOG.md` and commit it back.

---

If you'd like me to add a GitHub Pages badge to the README or to generate a docs index with some examples, I can do that next.
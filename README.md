# rim-xmg-lib

[![Docs CI](https://github.com/rimblehelm/rim-xmg-lib/actions/workflows/docs.yml/badge.svg)](https://github.com/rimblehelm/rim-xmg-lib/actions/workflows/docs.yml)
[![Docs Website](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=online&url=https://rimblehelm.github.io/rim-xmg-lib/)](https://rimblehelm.github.io/rim-xmg-lib/)
[![Coverage](https://coveralls.io/repos/github/rimblehelm/rim-xmg-lib/badge.svg?branch=main)](https://coveralls.io/github/rimblehelm/rim-xmg-lib)
Note: Coveralls will post a comment on pull requests with a link to the coverage report.

### Coveralls setup

To enable Coveralls reporting on PRs and see the coverage badge in this README, add a repository secret named `COVERALLS_REPO_TOKEN` in GitHub (only required for private repositories). Steps:

1. Go to your repo Settings -> Secrets -> Actions -> New repository secret
2. Name it `COVERALLS_REPO_TOKEN` and paste the token from Coveralls
3. Push a commit or open a PR and the CI will upload coverage and post a link in the PR comments

If you want CI to fail when coverage drops below the configured threshold, we enforce this via `vitest` settings in `vitest.config.ts` which defines 80% thresholds for statements, branches, functions and lines.

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

If you need help creating an npm Automation token I can add a short visual guide or a script to validate the token locally.

Re-run Publish from the CLI
--------------------------

After you set `NPM_TOKEN` to an Automation token, you can trigger the `Publish` workflow from the command line (GH CLI) as follows:

```bash
gh workflow run "Publish" --ref master --repo rimblehelm/rim-xmg-lib --field use_npm=true
```

You can also validate your token locally with the included `npm` script:

```bash
npm run test:npm-token
```

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
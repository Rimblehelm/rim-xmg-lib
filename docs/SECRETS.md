# GitHub Actions: Required Secrets and tokens

This repository uses GitHub Actions for CI, docs deployments, and publishing. Some workflows rely on secrets that must be configured in GitHub (Repository → Settings → Secrets → Actions). This document lists those secrets and explains how to configure and validate them.

## Secrets used by the workflows

- `GITHUB_TOKEN` (automatically provided)
  - GitHub automatically injects `GITHUB_TOKEN` to workflows. No configuration required.
  - Used for API calls, publishing to GitHub Packages, creating PR comments, etc.

- `COVERALLS_REPO_TOKEN` (optional but recommended for private repos)
  - Purpose: the `CI` workflow uploads test coverage to Coveralls and adds a PR comment with a link.
  - When to add: Add it if you want coverage reports in PRs and to use the coverage badge for private repositories.
  - How to add:
    1. Create a repo token in Coveralls for this repository.
    2. In GitHub go to Settings → Secrets and variables → Actions → New repository secret.
    3. Name the secret `COVERALLS_REPO_TOKEN` and paste the token value.
  - Notes: If the secret does not exist the workflow will skip Coveralls upload, and the PR comment step is gated on the presence of this secret.
  - Validate a token with the provided script:

    ```bash
    # locally (bash)
    export GITHUB_REPOSITORY="<owner>/<repo>"
    export COVERALLS_REPO_TOKEN="<your-token>"
    node ./scripts/check-coveralls-token.js
    ```

    This makes an authenticated request to Coveralls and returns a helpful human-readable message.
    Note: The validation step will return non-zero for an invalid token; in CI it's used in warn-only mode so it will not block builds.

- `NPM_TOKEN` (optional — required for publishing to npmjs.org)
  - Purpose: The `Publish` workflow can publish to npmjs.org when manually dispatched. `NPM_TOKEN` is required if you choose not to use Trusted Publishing (OIDC).
  - When to add: Add it when you want to publish to npmjs.org via the `Publish` workflow using the traditional token-based authentication path.
  - How to create an Automation token on npmjs:
    1. Sign in to npmjs.com and open your account page.
    2. Go to Access Tokens (Profile → Access Tokens).
    3. Click "Create New Token" and choose **Automation** — this token can be used by CI workflows.
    4. Copy the token value (it will only be shown once) and add it as a secret named `NPM_TOKEN` in GitHub.
  - Notes on 2FA: If your npm account requires 2FA, interactive tokens won't work; use an Automation token.
  - Testing locally:
    - Use `scripts/test-npm-token.sh` or `scripts/test-npm-token.ps1` to validate your token locally.
    - Example (PowerShell):
      ```powershell
      $env:NPM_TOKEN = 'your-automation-token'
      .\scripts\test-npm-token.ps1
      ```

  - `STATUS_COMMIT_TOKEN` (optional)
    - Purpose: Controls whether the `secret-status` workflow is allowed to commit the generated `docs/SECRETS_STATUS.json`/`.md` files back to the repository. When not set, the workflow will write local files but skip the commit/push step.
    - How to create: create a GitHub PAT with `repo:public_repo` (if public) or `repo` scope for private repos. Add it to your repository secrets as `STATUS_COMMIT_TOKEN`.
    - Why: Protects write access so only maintainers who create and provide the token can update the status file. This prevents lower-privileged events from changing the status.

  ### GitHub Checks and Statuses

  The repo also publishes a `Secrets Status` check run and commit status for the current commit. This is produced by the `secret-status-check.yml` workflow and will show directly in PRs and the checks table without committing any files.

  This is the recommended way to share status since it avoids making commits and is easy to audit via GitHub's checks UI.

  What the check validates
  - Lists all repository secret names found (for quick audit)
  - Verifies whether `NPM_TOKEN` exists
    - Verifies whether `NPM_TOKEN` exists
    - Attempts a check of `COVERALLS_REPO_TOKEN` by calling Coveralls API (if configured) and reports result in the check-run output
  - If `NPM_TOKEN` exists and is available to the workflow, it runs `npm token list` using the provided token to check if an **Automation** token is present (recommended for CI publishing)

  If the `npm token list` command fails or can't be run (for example, in a repository where `NPM_TOKEN` isn't available for the event), the check will report this in the detailed output and the commit-status message.

  Publish workflow pre-check
  -------------------------

  The `Publish` workflow (`.github/workflows/publish.yml`) now uses the local `check-npm-token` action as a pre-check when running with `use_npm=true`. The action's output is used to fail early when a token is present but not an Automation token — this prevents later, confusing publish failures.

  How to reuse `check-npm-token` in other workflows
  --------------------------------------------------
  You can call the action from any workflow in the repo. The action prints a human-readable `result` to `GITHUB_OUTPUT` which can be read by later steps as `steps.<id>.outputs.result`.

  Example — warn-only in `docs.yml` (recommended for docs builds):

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

How to reuse the Coveralls token check
-------------------------------------

You can use the local action to check `COVERALLS_REPO_TOKEN` optionally in any workflow:

```yaml
- name: Check Coveralls token (warn-only)
  id: coveralls_check
  uses: ./.github/actions/check-coveralls-token
  with:
    coveralls-token: ${{ secrets.COVERALLS_REPO_TOKEN }}

- name: Show Coveralls check
  run: |
    echo "Coveralls check: ${{ steps.coveralls_check.outputs.result }}"
```

This action prints a simple `result` output which you can use to warn or fail on a missing or invalid token.

  The `docs` example prints the result but does not fail; you can also fail when a message indicates a missing or non-automation token.

  Example — failing pre-check in `publish.yml`:

  ```yaml
  - name: Check NPM token type (automation)
    id: npm_check
    uses: ./.github/actions/check-npm-token
    env:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

  - name: Fail if NPM token not Automation
    if: ${{ !contains(steps.npm_check.outputs.result, 'automation token found') && github.event.inputs.use_npm == 'true' }}
    run: |
      echo "ERROR: NPM token is not an Automation token. See docs/SECRETS.md for how to create an Automation token.";
      exit 1
  ```

  This lets you standardize token checks without duplicating the `npm token list` logic and reuse one local action across workflows.

    Validation helper:

    You can also use the simple helper scripts to validate multiple secrets at once. This is useful when preparing a release or validating a CI environment.

    Bash:

    ```bash
    ./scripts/validate-secrets.sh NPM_TOKEN COVERALLS_REPO_TOKEN
    ```

    PowerShell:

    ```powershell
    .\scripts\validate-secrets.ps1 -Secrets 'NPM_TOKEN,COVERALLS_REPO_TOKEN'
    ```

    Warn-only mode in CI
    --------------------

    In some cases a secret is optional (e.g. `COVERALLS_REPO_TOKEN` may be omitted in public repos). To avoid failing the entire workflow but still provide a visible note that a secret is missing, you can call the validation script in warn-only mode. This exit code 0 and prints a helpful message.

    Example (CI):

    ```yaml
    - name: Check optional secrets (warn-only)
      run: |
        chmod +x ./scripts/validate-secrets.sh || true
        ./scripts/validate-secrets.sh COVERALLS_REPO_TOKEN --warn
      env:
        COVERALLS_REPO_TOKEN: ${{ secrets.COVERALLS_REPO_TOKEN }}
    ```

    Note: The `Publish` workflow will perform a pre-check when you request `use_npm=true` and `use_oidc=false`.
    If an `NPM_TOKEN` is not present in repository secrets the workflow will fail early with a clear message to either
    enable Trusted Publishing (OIDC) or add an `NPM_TOKEN` secret.

    The `Publish` workflow now runs a validation script on manual dispatch before the `Build` step; this calls
    `scripts/validate-secrets.sh` to validate that the `NPM_TOKEN` secret is present when `use_npm=true` and
    `use_oidc=false`. This provides a clear failure message and prevents later publish failures.

## Trusted Publishing (OIDC)

This repository supports Trusted Publishing via OpenID Connect (OIDC) for npmjs.org.

- If you prefer OIDC (no secret required), configure Trusted Publisher on npmjs.com for this repository and workflow file (`publish.yml`).
- To publish via OIDC: use the `Publish` workflow's `workflow_dispatch` input `use_npm=true` and set `use_oidc=true`.
- When OIDC is enabled and configured properly no `NPM_TOKEN` secret is required.

## Notes and troubleshooting

- Static linters may warn that a secret like `COVERALLS_REPO_TOKEN` or `NPM_TOKEN` is not defined; this is a static analysis and not a runtime error — you can ignore those warnings if you intentionally leave secrets undefined for public repos.
- If you set `NPM_TOKEN` and it fails with `EOTP` during publish, your token is interactive or requires OTP; create a new Automation token and try again.

## Example — Add secrets to GitHub (summary)

1. Go to: `https://github.com/<OWNER>/<REPO>/settings/secrets/actions`.
2. Click **New repository secret**.
3. Add `COVERALLS_REPO_TOKEN` for Coveralls (optional).
4. Add `NPM_TOKEN` for npm publish (optional; use only for npmjs publishing if you do not use OIDC).

If you need more help documenting or automating secret validation checks or want these instructions included in a repository CONTRIBUTING.md, I can add that as well.

## Secrets quick status

This quick reference shows which secrets must be present for "full functionality" (publishing to npmjs + coverage uploads).

| Secret | Required for | Required? |
|--------|--------------|----------|
| `NPM_TOKEN` | Publish to npmjs.org (token-based) | Yes (only when `use_npm=true` and `use_oidc=false`) |
| `COVERALLS_REPO_TOKEN` | Upload coverage to Coveralls | Optional (required for coverage uploads in private repos) |

For a fail-fast publish experience, the `Publish` workflow will fail early if `NPM_TOKEN` is missing when `use_npm=true` and `use_oidc=false`. For optional secrets we run a warn-only validation in CI.
#!/usr/bin/env bash
set -euo pipefail

# Simple CI-friendly npm token validator (Unix-like)
# - Requires NPM_TOKEN env var to be set (do not commit it!)
# - Uses temporary .npmrc via NPM_CONFIG_USERCONFIG environment variable
# - Runs 'npm whoami' and 'npm publish --dry-run' to validate the token

if [[ -z "${NPM_TOKEN:-}" ]]; then
  echo "ERROR: NPM_TOKEN is not set. Export it and re-run:"
  echo "  export NPM_TOKEN=xxxx"
  exit 1
fi

TMP_NPMRC=$(mktemp)
trap 'rm -f "$TMP_NPMRC"' EXIT

# Write temporary .npmrc to avoid clobbering user's config
printf "//registry.npmjs.org/:_authToken=%s\n" "$NPM_TOKEN" > "$TMP_NPMRC"
export NPM_CONFIG_USERCONFIG="$TMP_NPMRC"

echo "Using temp npm config: $NPM_CONFIG_USERCONFIG"

echo "1/2: Testing token identity with npm whoami..."
if ! npm whoami --registry https://registry.npmjs.org/ 2>/dev/null; then
  echo "ERROR: npm whoami failed — the token may be invalid or lacks read access."
  npm whoami --registry https://registry.npmjs.org/ || true
  exit 1
fi

USER=$(npm whoami --registry https://registry.npmjs.org/)
echo "Authenticated as: $USER"

echo "2/2: Testing publish permission with npm publish --dry-run..."
LOGFILE=$(mktemp)
if npm publish --dry-run --registry https://registry.npmjs.org/ 2>&1 | tee "$LOGFILE"; then
  echo "Dry-run succeeded — token seems valid for publishing.";
  rm -f "$LOGFILE"
  exit 0
else
  echo "Publish dry-run failed — checking for EOTP (2FA) or authorization issues..."
  if grep -qi "EOTP" "$LOGFILE"; then
    echo "ERROR: npm requires a one-time password (2FA) when publishing. Create an npm 'Automation' token for CI.";
    exit 1
  fi
  if grep -qi "401" "$LOGFILE" || grep -qi "unauthorized" "$LOGFILE"; then
    echo "ERROR: 401/Unauthorized during publish. Check that NPM_TOKEN is an Automation token and has publish rights.";
    exit 1
  fi
  echo "Unknown publish error — see $LOGFILE for details.";
  exit 1
fi

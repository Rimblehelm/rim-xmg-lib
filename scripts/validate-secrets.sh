#!/usr/bin/env bash
set -euo pipefail

WARN_MODE=false

if [[ "$#" -eq 0 ]]; then
  echo "Usage: $0 SECRET_NAME [SECRET_NAME ...]"
  echo "Example: $0 NPM_TOKEN COVERALLS_REPO_TOKEN"
  exit 2
fi

if [[ "${!#}" == "--warn" || "${!#}" == "-w" ]]; then
  WARN_MODE=true
  set -- "${@:1:$(($#-1))}"
fi

missing=false
for name in "$@"; do
  # Use bash indirect expansion to get env var by name
  value=${!name:-}
  if [ -z "$value" ]; then
    echo "MISSING: $name"
    missing=true
  else
    echo "OK: $name"
  fi
done

if [ "$missing" = true ]; then
  echo "One or more secrets are missing. See docs/SECRETS.md for details." >&2
  if [ "$WARN_MODE" = true ]; then
    echo "WARN_MODE: continuing despite missing secrets."
    exit 0
  fi
  exit 1
fi

echo "All requested secrets are present."
#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<EOF
Usage: $0 ENVIRONMENT [reviewer1,reviewer2,...]

Create a GitHub Actions environment (via GH CLI) and optionally add required reviewers.

Example:
  $0 release mikee.kelly,organization/team-name

The script requires the GitHub CLI (gh) to be installed and you must be signed in
with a user that has admin or repository permissions to manage environments.

EOF
}

if [ $# -lt 1 ]; then
  usage
  exit 1
fi

ENV_NAME="$1"
REVIEWERS="${2:-}"

REPO_FULL=$(gh repo view --json nameWithOwner -q .nameWithOwner)
OWNER=$(echo "$REPO_FULL" | cut -d/ -f1)
REPO=$(echo "$REPO_FULL" | cut -d/ -f2)

echo "Creating environment '$ENV_NAME' in $REPO_FULL"

# Create or update environment
gh api --method PUT "/repos/${OWNER}/${REPO}/environments/${ENV_NAME}" || true

if [ -n "$REVIEWERS" ]; then
  # reviewers is comma separated; can be users or teams (teams require org/team slug)
  reviewer_jsons=()
  for r in $(echo "$REVIEWERS" | tr ',' ' '); do
    # If team (contains /) treat differently
    if [[ "$r" == *"/"* ]]; then
      echo "Adding team reviewer: $r"
      # For teams we'll use the slug at the organization level; GH API expects id and type
      # We'll use the Teams API to find the team id
      ORG=$(echo "$REPO_FULL" | cut -d/ -f1)
      TEAM_SLUG=$(echo "$r" | cut -d/ -f2)
      TEAM_ID=$(gh api "/orgs/${ORG}/teams/${TEAM_SLUG}" -q .id)
      reviewer_jsons+=("{\"type\":\"Team\",\"id\":${TEAM_ID}}")
    else
      echo "Adding user reviewer: $r"
      USER_ID=$(gh api "/users/${r}" -q .id)
      reviewer_jsons+=("{\"type\":\"User\",\"id\":${USER_ID}}")
    fi
  done

  reviewers_array="$(IFS=, ; echo "${reviewer_jsons[*]}")"
  payload="{\"type\":\"required_reviewers\",\"reviewers\":[${reviewers_array}],\"required_approving_review_count\":1}"

  echo "Creating protection rule with reviewers for environment ${ENV_NAME}"
  echo "$payload" > /tmp/env-protection.json
  gh api --method POST "/repos/${OWNER}/${REPO}/environments/${ENV_NAME}/protection_rules" --input /tmp/env-protection.json
  rm -f /tmp/env-protection.json
fi

echo "Done."

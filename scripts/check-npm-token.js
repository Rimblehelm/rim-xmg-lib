// Utility to determine whether an `npm token list --json` output contains
// at least one 'automation' token.
// Accepts either a JSON string or already-parsed object/array.

function hasAutomationToken(tokens) {
  if (typeof tokens === 'string') {
    try {
      tokens = JSON.parse(tokens);
    } catch (err) {
      return false;
    }
  }

  if (!tokens) return false;

  if (Array.isArray(tokens)) {
    return tokens.some(t => t && t.type === 'automation');
  }

  if (typeof tokens === 'object') {
    return Object.values(tokens).some(t => t && t.type === 'automation');
  }

  return false;
}

module.exports = { hasAutomationToken };

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { hasAutomationToken } = require('./check-npm-token');

function runTokenCheck() {
  if (!process.env.NPM_TOKEN) {
    return 'NPM_TOKEN not present';
  }

  const tmpNpmrc = path.join(process.cwd(), 'tmp-npmrc-secret-status');
  try {
    fs.writeFileSync(tmpNpmrc, `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}`);
    const out = execSync('npm token list --json --registry https://registry.npmjs.org/', {
      env: { ...process.env, npm_config_userconfig: tmpNpmrc },
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    const tokens = JSON.parse(out.toString() || '[]');
    const hasAutomation = hasAutomationToken(tokens);
    return hasAutomation ? 'NPM_TOKEN automation token found' : 'NPM_TOKEN present but no automation token found';
  } catch (err) {
    return `NPM_TOKEN check failed: ${err.message || err}`;
  } finally {
    try { fs.unlinkSync(tmpNpmrc); } catch (e) { /* ignore */ }
  }
}

module.exports = { runTokenCheck };

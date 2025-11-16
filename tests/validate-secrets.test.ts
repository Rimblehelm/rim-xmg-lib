import { describe, it, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = path.resolve(__dirname, '..');

describe('validate-secrets scripts', () => {
  it('bash script fails when secret missing', () => {
    if (process.platform === 'win32') {
      // Skip bash tests on Windows
      return;
    }

    const script = path.join(root, 'scripts', 'validate-secrets.sh');
    const res = spawnSync('bash', [script, 'FOO_BAR_SECRET'], {
      cwd: root,
      encoding: 'utf8',
      env: process.env,
    });

    expect(res.status).toBe(1);
    expect(res.stdout || res.stderr).toMatch(/MISSING: FOO_BAR_SECRET/);
  });

  it('bash script --warn exits 0 when secret missing', () => {
    if (process.platform === 'win32') return;

    const script = path.join(root, 'scripts', 'validate-secrets.sh');
    const res = spawnSync('bash', [script, 'FOO_BAR_SECRET', '--warn'], {
      cwd: root,
      encoding: 'utf8',
      env: process.env,
    });

    expect(res.status).toBe(0);
    expect(res.stdout).toMatch(/MISSING: FOO_BAR_SECRET/);
    expect(res.stdout).toMatch(/WARN_MODE: continuing/);
  });

  it('PowerShell script fails when secret missing (Windows-only)', () => {
    if (process.platform !== 'win32') return;

    const ps = path.join(root, 'scripts', 'validate-secrets.ps1');
    const res = spawnSync('powershell.exe', ['-File', ps, '-Secrets', 'FOO_BAR_SECRET'], {
      cwd: root,
      encoding: 'utf8',
      env: process.env,
    });

    // On PowerShell the exit code will be non-zero; check stdout/stderr for missing
    expect(res.status).not.toBe(0);
    expect(res.stdout || res.stderr).toMatch(/MISSING: FOO_BAR_SECRET/);
  });
});
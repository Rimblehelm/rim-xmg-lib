import { describe, it, expect, vi } from 'vitest';

const runner = require('../scripts/check-npm-token-runner');

describe('check-npm-token-runner', () => {
  it('returns message when NPM_TOKEN not set', () => {
    const old = process.env.NPM_TOKEN;
    delete process.env.NPM_TOKEN;
    const res = runner.runTokenCheck();
    expect(res).toBe('NPM_TOKEN not present');
    if (old) process.env.NPM_TOKEN = old;
  });

  it('detects automation token by mocking npm token list', () => {
    // Mock execSync to return JSON with automation token
    const cp = require('child_process');
    const stub = vi.spyOn(cp, 'execSync').mockImplementation(() => Buffer.from(JSON.stringify([{ id: '1', type: 'automation' }])));
    process.env.NPM_TOKEN = 'fake-token';
    const res = runner.runTokenCheck();
    expect(res).toMatch(/automation token found/);
    stub.mockRestore();
    delete process.env.NPM_TOKEN;
  });
});

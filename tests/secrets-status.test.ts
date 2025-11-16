import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('docs/SECRETS_STATUS.json validation', () => {
  it('SECRETS_STATUS.json is valid JSON and has required keys', () => {
    const jsonPath = path.join(__dirname, '..', 'docs', 'SECRETS_STATUS.json');
    const src = fs.readFileSync(jsonPath, 'utf8');
    const j = JSON.parse(src);
    expect(typeof j).toBe('object');
    expect(j).toHaveProperty('schemaVersion');
    expect(j).toHaveProperty('label');
    expect(j).toHaveProperty('message');
    expect(j).toHaveProperty('color');
    expect([1]).toContain(j.schemaVersion);
    expect(['brightgreen', 'green', 'red', 'yellow']).toContain(j.color);
  });
});
import { describe, it, expect } from 'vitest';

const { hasAutomationToken } = require('../scripts/check-npm-token');

describe('check-npm-token', () => {
  it('returns true for array with an automation token', () => {
    const tokens = [{ id: '1', type: 'automation' }, { id: '2', type: 'automation' }];
    expect(hasAutomationToken(tokens)).toBe(true);
  });

  it('returns false for array without automation token', () => {
    const tokens = [{ id: '1', type: 'publish' }, { id: '2', type: 'read' }];
    expect(hasAutomationToken(tokens)).toBe(false);
  });

  it('accepts JSON string input and returns true', () => {
    const json = JSON.stringify([{ id: '1', type: 'automation' }]);
    expect(hasAutomationToken(json)).toBe(true);
  });

  it('accepts object map response and detects automation', () => {
    const obj = { 'a': { id: 'a', type: 'automation' }, 'b': { id: 'b', type: 'read' } };
    expect(hasAutomationToken(obj)).toBe(true);
  });

  it('returns false for invalid JSON string', () => {
    expect(hasAutomationToken('not-json')).toBe(false);
  });

  it('returns false for null input', () => {
    expect(hasAutomationToken(null)).toBe(false);
  });

  it('returns false for undefined input', () => {
    expect(hasAutomationToken(undefined)).toBe(false);
  });

  it('returns false for empty object', () => {
    expect(hasAutomationToken({})).toBe(false);
  });

  it('returns false for object with tokens but none are automation', () => {
    const obj = { 'a': { id: 'a', type: 'publish' }, 'b': { id: 'b', type: 'read' } };
    expect(hasAutomationToken(obj)).toBe(false);
  });
});

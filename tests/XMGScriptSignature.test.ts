import { describe, it, expect } from 'vitest';
import { XMGScriptSignature } from '../src/XMGScriptSignature';

describe('XMGScriptSignature', () => {
  it('parses and serializes script signatures', () => {
    const raw = { asm: 'OP_DUP OP_HASH160', hex: 'deadbeef' };
    const sig = new XMGScriptSignature(raw);

    expect(sig.Assembly).toBe(raw.asm);
    expect(sig.Hexadecimal).toBe(raw.hex);
    expect(sig.toJSON()).toEqual(raw);
  });
});

import { describe, it, expect } from 'vitest';
import { XMGOutput } from '../src/XMGOutput';

const sample = {
  value: 2.5,
  n: 0,
  scriptPubKey: { asm: 'OP_DUP', hex: 'abc', type: 'pubkeyhash', addresses: ['Xx222'] }
};

describe('XMGOutput', () => {
  it('creates and serializes outputs', () => {
    const out = new XMGOutput(sample as any);
    expect(out.Value).toBe(sample.value);
    expect(out.Index).toBe(sample.n);
    expect(out.ScriptPublicKey.Type).toBe(sample.scriptPubKey.type);

    const json = out.toJSON();
    expect(json.value).toBe(out.Value);
    expect(json.n).toBe(out.Index);
    expect(json.scriptPubKey?.type).toBe(out.ScriptPublicKey.Type);
  });

  it('fromJSON creates XMGOutput from raw object', () => {
    const output = XMGOutput.fromJSON(sample as any);
    expect(output.Value).toBe(sample.value);
    expect(output.Index).toBe(sample.n);
    expect(output.ScriptPublicKey.Type).toBe(sample.scriptPubKey.type);
  });

  it('fromArray handles non-array input', () => {
    const result = XMGOutput.fromArray('not-an-array' as any);
    expect(result).toEqual([]);
  });
});

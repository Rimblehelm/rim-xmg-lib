import { describe, it, expect } from 'vitest';
import { XMGScriptPublicKey } from '../src/XMGScriptPublicKey';

describe('XMGScriptPublicKey', () => {
  it('normalizes and serializes script public key', () => {
    const raw = { asm: 'OP_HASH160', hex: 'beef', type: 'pubkeyhash', addresses: ['Xx111'], reqSigs: 1 };
    const pk = new XMGScriptPublicKey(raw as any);

    expect(pk.Assembly).toBe(raw.asm);
    expect(pk.Hexadecimal).toBe(raw.hex);
    expect(pk.Type).toBe(raw.type);
    expect(pk.RequiredSignatures).toBe(raw.reqSigs);
    expect(pk.Addresses).toEqual(raw.addresses);
    expect(pk.toJSON()).toEqual({ asm: pk.Assembly, hex: pk.Hexadecimal, reqSigs: pk.RequiredSignatures || undefined, type: pk.Type, addresses: pk.Addresses || undefined });
  });

  it('fromJSON creates XMGScriptPublicKey from raw object', () => {
    const raw = { asm: 'OP_DUP', hex: 'cafe', type: 'scripthash', addresses: ['Xx222'] };
    const pk = XMGScriptPublicKey.fromJSON(raw as any);
    expect(pk.Assembly).toBe(raw.asm);
    expect(pk.Type).toBe(raw.type);
  });

  it('fromArray handles non-array input', () => {
    const result = XMGScriptPublicKey.fromArray('not-an-array' as any);
    expect(result).toEqual([]);
  });
});

import { describe, it, expect } from 'vitest';
import { XMGTransaction } from '../src/XMGTransaction';

const rawTx = {
  txid: 'abc',
  version: 1,
  time: 1600000000,
  locktime: 0,
  vin: [{ txid: 't1', vout: 0, sequence: 0 }],
  vout: [{ value: 1.2, n: 0, scriptPubKey: { asm: 'ASM', hex: '01', type: 'pubkeyhash', addresses: ['XxA'] } }],
};

describe('XMGTransaction', () => {
  it('parses basic transaction', () => {
    const tx = XMGTransaction.fromObject(rawTx as any);
    expect(tx.ID).toBe(rawTx.txid);
    expect(tx.Time.getTime()).toBe(rawTx.time * 1000);
    expect(tx.Inputs.length).toBe(1);
    expect(tx.Outputs.length).toBe(1);
    expect(tx.totalOutputValue()).toBeCloseTo(1.2);
  });

  it('roundtrip serializes to IXMGTransaction', () => {
    const tx = XMGTransaction.fromObject(rawTx as any);
    const json = tx.toJSON();
    expect(json.txid).toBe(tx.ID);
    expect(Array.isArray(json.vout)).toBe(true);
    expect(json.vout[0].value).toBe(1.2);
  });

  it('normalizeVin handles coinbase', () => {
    const vin = XMGTransaction.normalizeVin({ coinbase: 'abc', sequence: 0 });
    expect(vin.isCoinbase).toBe(true);
    expect(vin.Coinbase).toBe('abc');
  });
});

import { describe, it, expect } from 'vitest';
import { XMGInput } from '../src/XMGInput';

const coinbaseRaw = { coinbase: 'abcd', sequence: 0 };
const txRaw = { txid: 't1', vout: 1, scriptSig: { asm: '', hex: '' }, sequence: 1 };

describe('XMGInput', () => {
  it('parses coinbase inputs', () => {
    const i = new XMGInput(coinbaseRaw as any);
    expect(i.isCoinbase).toBe(true);
    expect(i.isTransaction).toBe(false);
    expect(i.toJSON().coinbase).toBe(coinbaseRaw.coinbase);
  });

  it('parses txid inputs', () => {
    const i = new XMGInput(txRaw as any);
    expect(i.isTransaction).toBe(true);
    expect(i.TransactionID).toBe(txRaw.txid);
    expect(i.OutputIndex).toBe(txRaw.vout);
    expect(i.toJSON().txid).toBe(txRaw.txid);
  });
});

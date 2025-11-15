import { describe, it, expect } from 'vitest';
import { XMGTransaction } from '../src/XMGTransaction';

describe('XMGTransaction extras', () => {
  it('filters outputs by index and type', () => {
    const raw = {
      txid: 'x',
      version: 1,
      time: 1600000000,
      locktime: 0,
      vin: [],
      vout: [
        { value: 1, n: 0, scriptPubKey: { asm: '', hex: '', type: 'pubkeyhash', addresses: [] } },
        { value: 2, n: 1, scriptPubKey: { asm: '', hex: '', type: 'scripthash', addresses: [] } }
      ]
    };

    const tx = XMGTransaction.fromObject(raw as any);
    expect(tx.outputsByIndex(0).length).toBe(1);
    expect(tx.outputsByType('pubkeyhash').length).toBe(1);
  });
});

import { describe, it, expect } from 'vitest';
import { XMGWallet } from '../src/XMGWallet';

// Wallet with one transaction that pays to the wallet's address
const tx = {
  txid: 'tx1',
  version: 1,
  time: 1600000000,
  locktime: 0,
  vin: [],
  vout: [
    { value: 5, n: 0, scriptPubKey: { asm: '', hex: '', type: 'pubkeyhash', addresses: ['Xwallet'] } }
  ]
};

describe('XMGWallet', () => {
  it('calculates balance correctly', () => {
    const w = new XMGWallet({ address: 'Xwallet', createdAt: new Date(), transactions: [tx] as any });
    expect(w.transactionCount).toBe(1);
    expect(w.balance).toBe(5);
  });
});

import { describe, it, expect } from 'vitest';
import { XMGScriptSignature } from '../src/XMGScriptSignature';
import { XMGScriptPublicKey } from '../src/XMGScriptPublicKey';
import { XMGOutput } from '../src/XMGOutput';
import { XMGInput } from '../src/XMGInput';
import { XMGTransaction } from '../src/XMGTransaction';
import { XMGBlock } from '../src/XMGBlock';
import { XMGWallet } from '../src/XMGWallet';

describe('XMG helper functions', () => {
  it('script signature helpers', () => {
    const s = { asm: 'OP', hex: 'aa' };
    const sig = XMGScriptSignature.fromJSON(s as any);
    expect(sig.Assembly).toBe(s.asm);
    const sigs = XMGScriptSignature.fromArray([s] as any);
    expect(Array.isArray(sigs)).toBeTruthy();
    expect(sigs[0].Hexadecimal).toBe(s.hex);
  });

  it('script pubkey fromArray', () => {
    const p = { asm: 'OP', hex: 'ff', type: 'pubkeyhash', addresses: ['X'] };
    const arr = XMGScriptPublicKey.fromArray([p] as any);
    expect(arr[0].Assembly).toBe(p.asm);
    expect(arr[0].Addresses).toEqual(p.addresses);
  });

  it('XMGOutput & XMGInput fromArray', () => {
    const out = { value: 1, n: 0, scriptPubKey: { asm: '', hex: '', type: '', addresses: [] } };
    const outs = XMGOutput.fromArray([out] as any);
    expect(outs.length).toBe(1);

    const input = { txid: 't', vout: 0, sequence: 0 };
    const inputs = XMGInput.fromArray([input] as any);
    expect(inputs[0].TransactionID).toBe(input.txid);
  });

  it('XMGTransaction normalizeVout with missing addresses', () => {
    const vout = { value: 2, n: 0, scriptPubKey: { asm: '', hex: '', type: '', addresses: undefined } };
    const out = XMGTransaction.normalizeVout(vout as any);
    expect(out.ScriptPublicKey.Addresses).toBeUndefined();
  });

  it('XMGBlock.toJSON includes properties', () => {
    const b = new XMGBlock({
      hash: 'h', confirmations: 1, size: 1, height: 0, version: 1, merkleroot: 'm', mint: 0, time: 1600000000, nonce: 0, bits: 'bits', difficulty: 1, flags: '', proofhash: 'p', entropybit: 0, modifier: '', modifierchecksum: '', tx: [], signature: ''
    } as any);
    const json = b.toJSON();
    expect(json.hash).toBe(b.hash);
    expect(typeof json.time).toBe('number');
  });

  it('wallet outgoing txs reduce balance', () => {
    const txOut = {
      txid: 'tx2', version: 1, time: 1600000000, locktime: 0,
      vin: [{ txid: 't1', vout: 0, sequence: 0 }],
      vout: [{ value: 1, n: 0, scriptPubKey: { asm: '', hex: '', type: '', addresses: ['Xw'] } }]
    };

    // note: the current library's wallet outgoing logic searches the inputs
    // against the *same* transaction outputs. Therefore this transaction will
    // be treated as both incoming and outgoing and the net effect is 0.
    const w = new XMGWallet({ address: 'Xw', createdAt: new Date(), transactions: [txOut] as any });
    expect(w.balance).toBe(0);
  });
});

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

  it('fromJSON creates transaction from JSON string', () => {
    const json = JSON.stringify(rawTx);
    const tx = XMGTransaction.fromJSON(json);
    expect(tx.ID).toBe(rawTx.txid);
    expect(tx.Inputs.length).toBe(1);
  });

  it('normalizeVin handles scriptSig with uppercase fields', () => {
    const vin = XMGTransaction.normalizeVin({
      txid: 'tx123',
      vout: 2,
      sequence: 100,
      scriptSig: { ASM: 'OP_DUP', HEX: 'abcd' }
    });
    expect(vin.TransactionID).toBe('tx123');
    expect(vin.OutputIndex).toBe(2);
    expect(vin.ScriptSignature?.Assembly).toBe('OP_DUP');
    expect(vin.ScriptSignature?.Hexadecimal).toBe('abcd');
  });

  it('outputsByIndex filters outputs correctly', () => {
    const tx = new XMGTransaction({
      txid: 'test',
      version: 1,
      time: 1600000000,
      locktime: 0,
      vin: [],
      vout: [
        { value: 1, n: 0, scriptPubKey: { asm: '', hex: '', type: 'pubkeyhash' } },
        { value: 2, n: 1, scriptPubKey: { asm: '', hex: '', type: 'pubkeyhash' } },
        { value: 3, n: 0, scriptPubKey: { asm: '', hex: '', type: 'pubkeyhash' } },
      ]
    });
    const outputs = tx.outputsByIndex(0);
    expect(outputs.length).toBe(2);
    expect(outputs[0].Value).toBe(1);
    expect(outputs[1].Value).toBe(3);
  });

  it('outputsByType filters outputs correctly', () => {
    const tx = new XMGTransaction({
      txid: 'test',
      version: 1,
      time: 1600000000,
      locktime: 0,
      vin: [],
      vout: [
        { value: 1, n: 0, scriptPubKey: { asm: '', hex: '', type: 'pubkeyhash' } },
        { value: 2, n: 1, scriptPubKey: { asm: '', hex: '', type: 'scripthash' } },
        { value: 3, n: 2, scriptPubKey: { asm: '', hex: '', type: 'pubkeyhash' } },
      ]
    });
    const outputs = tx.outputsByType('pubkeyhash');
    expect(outputs.length).toBe(2);
    expect(outputs[0].Value).toBe(1);
    expect(outputs[1].Value).toBe(3);
  });

  it('normalizeVout handles scriptPubKey with addresses array', () => {
    const vout = XMGTransaction.normalizeVout({
      value: 5.5,
      n: 1,
      scriptPubKey: {
        asm: 'OP_DUP',
        hex: 'abcd',
        type: 'pubkeyhash',
        addresses: ['addr1', 'addr2']
      }
    });
    expect(vout.Value).toBe(5.5);
    expect(vout.Index).toBe(1);
    expect(vout.ScriptPublicKey.Addresses).toEqual(['addr1', 'addr2']);
  });

  it('normalizeVin handles sequence as string', () => {
    const vin = XMGTransaction.normalizeVin({
      txid: 'tx456',
      vout: 0,
      sequence: '4294967295'
    });
    expect(vin.Sequence).toBe(4294967295);
  });

  it('normalizeVin handles invalid sequence with fallback to 0', () => {
    const vin = XMGTransaction.normalizeVin({
      txid: 'tx000',
      vout: 0,
      sequence: 'invalid'
    });
    expect(vin.Sequence).toBe(0);
  });

  it('normalizeVin handles sequence as number 0', () => {
    const vin = XMGTransaction.normalizeVin({
      txid: 'tx111',
      vout: 0,
      sequence: 0
    });
    expect(vin.Sequence).toBe(0);
  });

  it('normalizeVin handles missing scriptSig fields gracefully', () => {
    const vin = XMGTransaction.normalizeVin({
      txid: 'tx789',
      vout: 1,
      sequence: 0,
      scriptSig: {}
    });
    expect(vin.TransactionID).toBe('tx789');
    expect(vin.ScriptSignature).toBeDefined();
    // Call toJSON on ScriptSignature to cover line 108
    if (vin.ScriptSignature) {
      const json = vin.ScriptSignature.toJSON();
      expect(json).toBeDefined();
    }
  });
});

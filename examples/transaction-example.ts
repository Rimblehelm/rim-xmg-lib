import { XMGTransaction } from '../src/XMGTransaction';

// Example: parse a JSON transaction, get total outputs and re-serialize
const raw = JSON.stringify({
  txid: 'abc123',
  version: 1,
  time: 1600000000,
  locktime: 0,
  vin: [],
  vout: [{ value: 1.23, n: 0, scriptPubKey: { asm: 'OP_DUP', hex: '', type: 'pubkeyhash', addresses: ['Xx123'] } }]
});

const tx = XMGTransaction.fromJSON(raw);
console.log('Transaction ID:', tx.ID);
console.log('Total output value:', tx.totalOutputValue());
console.log('Serialized:', JSON.stringify(tx.toJSON(), null, 2));

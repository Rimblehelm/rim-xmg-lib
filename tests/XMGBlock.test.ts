import { describe, it, expect } from 'vitest';
import { XMGBlock } from '../src/XMGBlock';

const raw = {
  hash: 'h1',
  confirmations: 10,
  size: 123,
  height: 1,
  version: 1,
  merkleroot: 'm1',
  mint: '0',
  time: 1600000000,
  nonce: 0,
  bits: '1d00ffff',
  difficulty: 1,
  flags: '',
  proofhash: 'ph',
  entropybit: 0,
  modifier: '',
  modifierchecksum: '',
  tx: ['t1'],
  signature: 'sig'
};

describe('XMGBlock', () => {
  it('parses block fields and helpers', () => {
    const b = new XMGBlock(raw as any);
    expect(b.hash).toBe(raw.hash);
    expect(b.txCount).toBe(1);
    expect(b.isGenesis).toBe(false);
  });
});

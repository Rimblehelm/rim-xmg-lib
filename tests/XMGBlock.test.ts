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

  it('throws when hash missing', () => {
    const clone = { ...raw } as any;
    delete clone.hash;
    expect(() => new XMGBlock(clone)).toThrow(/missing hash/);
  });

  it('recognizes genesis, stake/poa flags and entropy', () => {
    const data = { ...raw, height: 0, flags: 'stake-modifier proof-of-stake', entropybit: 1 } as any;
    const b = new XMGBlock(data);
    expect(b.isGenesis).toBe(true);
    expect(b.hasStakeModifier).toBe(true);
    expect(b.isProofOfStake).toBe(true);
    expect(b.isProofOfWork).toBe(false);
    expect(b.entropyBit).toBe(true);
  });

  it('parses previous and next block hash into fields', () => {
    const data = { ...raw, previousblockhash: 'prev', nextblockhash: 'next' } as any;
    const b = new XMGBlock(data);
    expect(b.previousBlockHash).toBe('prev');
    expect(b.nextBlockHash).toBe('next');
  });

  it('fromArray returns empty array for non-array', () => {
    expect(XMGBlock.fromArray(null as any)).toEqual([]);
    expect(XMGBlock.fromArray(undefined as any)).toEqual([]);
  });

  it('toJSON includes entropy bit as 1 or 0 and includes tx array', () => {
    const b = new XMGBlock({ ...raw, entropybit: 1 } as any);
    const j = b.toJSON();
    expect(j.entropybit).toBe(1);
    expect(Array.isArray(j.tx)).toBe(true);
  });
});

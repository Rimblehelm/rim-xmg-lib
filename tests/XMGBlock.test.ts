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

  it('handles proof-of-work flags and missing transactions', () => {
    const data = { ...raw, flags: 'proof-of-work', tx: undefined } as any;
    const b = new XMGBlock(data);
    expect(b.isProofOfWork).toBe(true);
    expect(b.isProofOfStake).toBe(false);
    expect(b.hasStakeModifier).toBe(false);
    expect(b.txCount).toBe(0);
  });

  it('normalizes mint and formats toJSON values', () => {
    const data = { ...raw, mint: '5', entropybit: 0 } as any;
    const b = new XMGBlock(data);
    expect(b.mint).toBe(5);
    const json = b.toJSON();
    // entropybit false -> 0
    expect(json.entropybit).toBe(0);
    // time round trip: toJSON uses time.getDate() / 1000
    expect(json.time).toBe(Math.floor(b.time.getTime() / 1000));
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

  it('supports fromJSON and fromArray helper methods', () => {
    const b = XMGBlock.fromJSON(raw as any);
    expect(b).toBeInstanceOf(XMGBlock);
    const arr = XMGBlock.fromArray([raw as any, raw as any]);
    expect(arr.length).toBe(2);
  });

  it('handles mint as number and toJSON tx is a copy', () => {
    const data = { ...raw, mint: 7, tx: ['a', 'b'] } as any;
    const b = new XMGBlock(data);
    expect(b.mint).toBe(7);
    const json = b.toJSON();
    // Ensure tx array is copied
    json.tx.push('c');
    expect(b.txCount).toBe(2);
    expect(json.tx.length).toBe(3);
  });

  it('handles time epoch -> toJSON time small non-zero value', () => {
    const data = { ...raw, time: 0 } as any;
    const b = new XMGBlock(data);
    expect(b.time.getTime()).toBe(0);
    expect(b.toJSON().time).toBe(Math.floor(b.time.getTime() / 1000));
  });
});

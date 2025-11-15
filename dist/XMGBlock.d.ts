/**
 * Interface representing the raw JSON structure of a Coin Magi (XMG) block.
 */
export interface IXMGBlock {
    hash: string;
    confirmations: number;
    size: number;
    height: number;
    version: number;
    merkleroot: string;
    mint: number | string;
    time: number;
    nonce: number;
    bits: string;
    difficulty: number;
    previousblockhash?: string;
    nextblockhash?: string;
    flags: string;
    proofhash: string;
    entropybit: number;
    modifier: string;
    modifierchecksum: string;
    tx: string[];
    signature: string;
}
/**
 * Represents a Coin Magi (XMG) block.
 * Construct with raw JSON (e.g. an element from blocks.json) or use fromJSON/fromArray helpers.
 */
/**
 * Lightweight model for a Magi (XMG) block as returned by XMG RPCs.
 *
 * The model normalizes certain fields (e.g. `mint` which can be a string)
 * and exposes convenience getters for commonly useful checks.
 */
export declare class XMGBlock {
    readonly hash: string;
    readonly confirmations: number;
    readonly size: number;
    readonly height: number;
    readonly version: number;
    readonly merkleRoot: string;
    readonly mint: number;
    readonly time: Date;
    readonly nonce: number;
    readonly bits: string;
    readonly difficulty: number;
    readonly previousBlockHash?: string;
    readonly nextBlockHash?: string;
    readonly flags: string;
    readonly proofHash: string;
    readonly entropyBit: boolean;
    readonly modifier: string;
    readonly modifierChecksum: string;
    readonly transactions: string[];
    readonly signature: string;
    /**
     * Create a new XMGBlock instance from raw block JSON.
     * @param data - Raw `IXMGBlock` object returned by node or explorer.
     * @example
     * const block = new XMGBlock({ hash: 'abc', confirmations: 100, size: 1234, height: 10, version: 1, merkleroot: '...', mint: 0, time: 1600000000, nonce: 0, bits: '1d00ffff', difficulty: 1, flags: '', proofhash: '...', entropybit: 0, modifier: '', modifierchecksum: '', tx: [], signature: '' });
     */
    constructor(data: IXMGBlock);
    /**
     * Create a XMGBlock from raw JSON data.
     * @param raw - Raw block JSON
     * @returns New `XMGBlock` instance.
     */
    static fromJSON(raw: IXMGBlock): XMGBlock;
    /**
     * Convert an array of raw block objects into `XMGBlock` instances.
     * @param rawArray - Raw blocks array
     * @returns Array of `XMGBlock` objects.
     */
    static fromArray(rawArray: IXMGBlock[] | any[]): XMGBlock[];
    /**
     * Serialize this block back to RPC-like JSON.
     * @returns `IXMGBlock` object.
     */
    toJSON(): IXMGBlock;
    /**
     * True when the block flags contain a stake-modifier marker.
     * @returns true when the stake modifier flag appears in flags string.
     */
    get hasStakeModifier(): boolean;
    /**
     * True if this block is the genesis block (height === 0).
     * @returns true when this block's height equals zero.
     */
    get isGenesis(): boolean;
    /**
     * True when the block flags indicate Proof-of-Stake.
     * @returns true when flags indicate 'proof-of-stake'.
     */
    get isProofOfStake(): boolean;
    /**
     * True when the block flags indicate Proof-of-Work.
     * @returns true when flags indicate 'proof-of-work'.
     */
    get isProofOfWork(): boolean;
    /**
     * Number of transactions in the block.
     * @returns Count of transactions in the block.
     */
    get txCount(): number;
}

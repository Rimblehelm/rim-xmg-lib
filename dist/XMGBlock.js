"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMGBlock = void 0;
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
class XMGBlock {
    /**
     * Create a new XMGBlock instance from raw block JSON.
     * @param data - Raw `IXMGBlock` object returned by node or explorer.
     * @example
     * const block = new XMGBlock({ hash: 'abc', confirmations: 100, size: 1234, height: 10, version: 1, merkleroot: '...', mint: 0, time: 1600000000, nonce: 0, bits: '1d00ffff', difficulty: 1, flags: '', proofhash: '...', entropybit: 0, modifier: '', modifierchecksum: '', tx: [], signature: '' });
     */
    constructor(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!data || !data.hash)
            throw new Error('XMGBlock: missing hash');
        this.hash = String(data.hash);
        this.confirmations = Number((_a = data.confirmations) !== null && _a !== void 0 ? _a : 0);
        this.size = Number((_b = data.size) !== null && _b !== void 0 ? _b : 0);
        this.height = Number((_c = data.height) !== null && _c !== void 0 ? _c : 0);
        this.version = Number((_d = data.version) !== null && _d !== void 0 ? _d : 0);
        this.merkleRoot = String((_e = data.merkleroot) !== null && _e !== void 0 ? _e : '');
        // mint sometimes provided as string in JSON; normalize to number (NaN -> 0)
        this.mint = typeof data.mint === 'string' ? Number(data.mint) : Number((_f = data.mint) !== null && _f !== void 0 ? _f : 0);
        this.time = new Date(((_g = data.time) !== null && _g !== void 0 ? _g : 0) * 1000);
        this.nonce = Number((_h = data.nonce) !== null && _h !== void 0 ? _h : 0);
        this.bits = String(data.bits);
        this.difficulty = Number(data.difficulty);
        this.previousBlockHash = data.previousblockhash ? String(data.previousblockhash) : undefined;
        this.nextBlockHash = data.nextblockhash ? String(data.nextblockhash) : undefined;
        this.flags = String(data.flags);
        this.proofHash = String(data.proofhash);
        this.entropyBit = data.entropybit !== 0;
        this.modifier = String(data.modifier);
        this.modifierChecksum = String(data.modifierchecksum);
        this.transactions = Array.isArray(data.tx) ? data.tx.map(String) : [];
        this.signature = String(data.signature);
    }
    /**
     * Create a XMGBlock from raw JSON data.
     * @param raw - Raw block JSON
     * @returns New `XMGBlock` instance.
     */
    static fromJSON(raw) {
        return new XMGBlock(raw);
    }
    /**
     * Convert an array of raw block objects into `XMGBlock` instances.
     * @param rawArray - Raw blocks array
     * @returns Array of `XMGBlock` objects.
     */
    static fromArray(rawArray) {
        if (!Array.isArray(rawArray))
            return [];
        return rawArray.map((r) => new XMGBlock(r));
    }
    /**
     * Serialize this block back to RPC-like JSON.
     * @returns `IXMGBlock` object.
     */
    toJSON() {
        return {
            hash: this.hash,
            confirmations: this.confirmations,
            size: this.size,
            height: this.height,
            version: this.version,
            merkleroot: this.merkleRoot,
            mint: this.mint,
            // Use Unix epoch seconds for time (Date.getTime() returns ms)
            time: Math.floor(this.time.getTime() / 1000),
            nonce: this.nonce,
            bits: this.bits,
            difficulty: this.difficulty,
            previousblockhash: this.previousBlockHash,
            nextblockhash: this.nextBlockHash,
            flags: this.flags,
            proofhash: this.proofHash,
            entropybit: this.entropyBit ? 1 : 0,
            modifier: this.modifier,
            modifierchecksum: this.modifierChecksum,
            tx: [...this.transactions],
            signature: this.signature,
        };
    }
    // Convenience helpers
    /**
     * True when the block flags contain a stake-modifier marker.
     * @returns true when the stake modifier flag appears in flags string.
     */
    get hasStakeModifier() {
        return !!this.flags && this.flags.toLowerCase().includes('stake-modifier');
    }
    /**
     * True if this block is the genesis block (height === 0).
     * @returns true when this block's height equals zero.
     */
    get isGenesis() {
        return this.height === 0;
    }
    /**
     * True when the block flags indicate Proof-of-Stake.
     * @returns true when flags indicate 'proof-of-stake'.
     */
    get isProofOfStake() {
        return !!this.flags && this.flags.toLowerCase().includes('proof-of-stake');
    }
    /**
     * True when the block flags indicate Proof-of-Work.
     * @returns true when flags indicate 'proof-of-work'.
     */
    get isProofOfWork() {
        return !!this.flags && this.flags.toLowerCase().includes('proof-of-work');
    }
    /**
     * Number of transactions in the block.
     * @returns Count of transactions in the block.
     */
    get txCount() {
        return this.transactions.length;
    }
}
exports.XMGBlock = XMGBlock;
//# sourceMappingURL=XMGBlock.js.map
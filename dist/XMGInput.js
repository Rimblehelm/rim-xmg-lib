import { XMGScriptSignature } from './XMGScriptSignature';
/**
 * Represents a Coin Magi (XMG) transaction input.
 * Construct with raw JSON (e.g. an element from vin array) or use fromJSON/fromArray helpers.
 */
/**
 * Represents a Coin Magi (XMG) transaction input.
 *
 * Provides helpers for parsing raw vin JSON and for serializing back to the
 * RPC-compatible structure.
 */
export class XMGInput {
    /**
     * Constructs a new XMGInput from a raw `IVin` object.
     * @param input - Raw input JSON matching `IVin`.
        * @example
        * const input = new XMGInput({ txid: 'abc', vout: 1, sequence: 0 });
     */
    constructor(input) {
        this.Coinbase = input.coinbase || undefined;
        this.TransactionID = input.txid || undefined;
        this.OutputIndex = input.vout !== undefined ? input.vout : undefined;
        this.Sequence = input.sequence;
        if (input.scriptSig) {
            this.ScriptSignature = new XMGScriptSignature(input.scriptSig);
        }
    }
    /**
     * Construct an XMGInput from raw JSON.
     * @param raw - Raw IVin object.
     * @returns A normalized XMGInput instance.
     */
    static fromJSON(raw) {
        return new XMGInput(raw);
    }
    /**
     * Map an array of raw `IVin` objects into an array of `XMGInput`.
     * Safely returns an empty array if provided value is not an array.
     * @param rawArray - Array-like input to convert.
    * @returns An array of XMGInput instances.
     */
    static fromArray(rawArray) {
        if (!Array.isArray(rawArray))
            return [];
        return rawArray.map((r) => new XMGInput(r));
    }
    /**
     * True when this input is a coinbase (mined reward) input.
        * @returns `true` when this input is coinbase.
     */
    get isCoinbase() {
        return this.Coinbase !== undefined;
    }
    /**
     * True when this input references a previous transaction output.
        * @returns `true` when input references previous tx + output.
     */
    get isTransaction() {
        return this.TransactionID !== undefined && this.OutputIndex !== undefined;
    }
    /**
     * Serialize an XMGInput back to JSON compatible with `IVin`.
     * @returns IVin structure.
     */
    toJSON() {
        return {
            coinbase: this.Coinbase,
            txid: this.TransactionID,
            vout: this.OutputIndex,
            scriptSig: this.ScriptSignature ? this.ScriptSignature.toJSON() : undefined,
            sequence: this.Sequence
        };
    }
}
//# sourceMappingURL=XMGInput.js.map
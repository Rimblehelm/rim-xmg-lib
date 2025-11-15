import { XMGScriptSignature, IScriptSig } from './XMGScriptSignature';

/**
 * Interface representing the raw JSON structure of a Coin Magi (XMG) transaction input.
 */
export interface IVin {
    coinbase?: string;
    txid?: string;
    vout?: number;
    scriptSig?: IScriptSig;
    sequence: number;
}

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
    Coinbase?: string;
    TransactionID?: string;
    OutputIndex?: number;
    ScriptSignature?: XMGScriptSignature;
    Sequence: number;

    /**
     * Constructs a new XMGInput from a raw `IVin` object.
     * @param input - Raw input JSON matching `IVin`.
        * @example
        * const input = new XMGInput({ txid: 'abc', vout: 1, sequence: 0 });
     */
    constructor(input: IVin) {
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
    static fromJSON(raw: IVin): XMGInput {
        return new XMGInput(raw);
    }
    /**
     * Map an array of raw `IVin` objects into an array of `XMGInput`.
     * Safely returns an empty array if provided value is not an array.
     * @param rawArray - Array-like input to convert.
    * @returns An array of XMGInput instances.
     */
    static fromArray(rawArray: IVin[] | any[]): XMGInput[] {
        if (!Array.isArray(rawArray)) return [];

        return rawArray.map((r) => new XMGInput(r));
    }

    /**
     * True when this input is a coinbase (mined reward) input.
        * @returns `true` when this input is coinbase.
     */
    get isCoinbase(): boolean {
        return this.Coinbase !== undefined;
    }
    /**
     * True when this input references a previous transaction output.
        * @returns `true` when input references previous tx + output.
     */
    get isTransaction(): boolean {
        return this.TransactionID !== undefined && this.OutputIndex !== undefined;
    }

    /**
     * Serialize an XMGInput back to JSON compatible with `IVin`.
     * @returns IVin structure.
     */
    toJSON(): IVin {
        return {
            coinbase: this.Coinbase,
            txid: this.TransactionID,
            vout: this.OutputIndex,
            scriptSig: this.ScriptSignature ? this.ScriptSignature.toJSON() : undefined,
            sequence: this.Sequence
        };
    }
}
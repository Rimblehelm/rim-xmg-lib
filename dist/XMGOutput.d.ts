import { XMGScriptPublicKey, IXMGScriptPubKey } from './XMGScriptPublicKey';
/**
 * Interface representing the raw JSON structure of a Coin Magi (XMG) transaction output.
 */
export interface IVout {
    value: number;
    n: number;
    scriptPubKey: IXMGScriptPubKey;
}
/**
 * Represents a Coin Magi (XMG) transaction output.
 *
 * Construct with raw JSON (e.g. an element from vout array) or use
 * `fromJSON` / `fromArray` helpers.
 */
export declare class XMGOutput {
    Value: number;
    Index: number;
    ScriptPublicKey: XMGScriptPublicKey;
    /**
     * Create a new XMGOutput from raw IVout JSON.
     * @param output - Raw output object returned by a node or explorer.
     * @example
     * const out = XMGOutput.fromJSON({ value: 2.5, n: 0, scriptPubKey: { asm: '...', hex: '...', type: 'pubkeyhash', addresses: ['Xx...'] } });
     */
    constructor(output: IVout);
    /**
     * Create an XMGOutput from raw JSON.
     * @param raw - Raw object matching `IVout`.
     * @returns The created XMGOutput instance.
     */
    static fromJSON(raw: IVout): XMGOutput;
    /**
     * Convert an array of `IVout` into an array of `XMGOutput` instances.
     * @param rawArray - Source array.
     * @returns An array of `XMGOutput` instances, or empty array.
     */
    static fromArray(rawArray: IVout[] | any[]): XMGOutput[];
    /**
     * Serialize the instance back to JSON that matches `IVout`.
     * @returns JSON-compatible `IVout` object.
     */
    toJSON(): IVout;
}

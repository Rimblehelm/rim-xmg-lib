/**
 * Interface representing the raw JSON structure of a Coin Magi (XMG) script signature.
 */
export interface IScriptSig {
    asm: string;
    hex: string;
}
/**
 * Represents a Coin Magi (XMG) script signature.
 * Construct with raw JSON (e.g. scriptSig element) or use fromJSON/fromArray helpers.
 */
/**
 * Model for a script signature.
 *
 * Contains the script assembly and hexadecimal representation used inside a
 * transaction's input `scriptSig`.
 */
export declare class XMGScriptSignature {
    Assembly: string;
    Hexadecimal: string;
    /**
     * Construct a new XMGScriptSignature from raw scriptSig JSON.
     * @param obj - Raw `IScriptSig` value.
     * @example
     * const s = XMGScriptSignature.fromJSON({ asm: '...', hex: '...' });
     */
    constructor(obj: IScriptSig);
    /**
     * Create an `XMGScriptSignature` instance from raw JSON.
     * @param raw - Raw scriptSig object
     * @returns The constructed XMGScriptSignature instance.
     */
    static fromJSON(raw: IScriptSig): XMGScriptSignature;
    /**
     * Convert an array of raw scriptSig objects into model instances.
     * @param rawArray - Source array to convert
     * @returns Array of `XMGScriptSignature`.
     */
    static fromArray(rawArray: IScriptSig[] | any[]): XMGScriptSignature[];
    /**
     * Serialize this signature back to the RPC-compatible JSON form.
     * @returns `IScriptSig` with `asm` and `hex` fields.
     */
    toJSON(): IScriptSig;
}

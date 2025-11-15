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
export class XMGScriptSignature {
    /**
     * Construct a new XMGScriptSignature from raw scriptSig JSON.
     * @param obj - Raw `IScriptSig` value.
     * @example
     * const s = XMGScriptSignature.fromJSON({ asm: '...', hex: '...' });
     */
    constructor(obj) {
        this.Assembly = String(obj.asm);
        this.Hexadecimal = String(obj.hex);
    }
    /**
     * Create an `XMGScriptSignature` instance from raw JSON.
     * @param raw - Raw scriptSig object
     * @returns The constructed XMGScriptSignature instance.
     */
    static fromJSON(raw) {
        return new XMGScriptSignature(raw);
    }
    /**
     * Convert an array of raw scriptSig objects into model instances.
     * @param rawArray - Source array to convert
     * @returns Array of `XMGScriptSignature`.
     */
    static fromArray(rawArray) {
        if (!Array.isArray(rawArray))
            return [];
        return rawArray.map((r) => new XMGScriptSignature(r));
    }
    /**
     * Serialize this signature back to the RPC-compatible JSON form.
     * @returns `IScriptSig` with `asm` and `hex` fields.
     */
    toJSON() {
        return {
            asm: this.Assembly,
            hex: this.Hexadecimal
        };
    }
}
//# sourceMappingURL=XMGScriptSignature.js.map
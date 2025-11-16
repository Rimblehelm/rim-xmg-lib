"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMGOutput = void 0;
const XMGScriptPublicKey_1 = require("./XMGScriptPublicKey");
/**
 * Represents a Coin Magi (XMG) transaction output.
 *
 * Construct with raw JSON (e.g. an element from vout array) or use
 * `fromJSON` / `fromArray` helpers.
 */
class XMGOutput {
    /**
     * Create a new XMGOutput from raw IVout JSON.
     * @param output - Raw output object returned by a node or explorer.
     * @example
     * const out = XMGOutput.fromJSON({ value: 2.5, n: 0, scriptPubKey: { asm: '...', hex: '...', type: 'pubkeyhash', addresses: ['Xx...'] } });
     */
    constructor(output) {
        this.Value = output.value;
        this.Index = output.n;
        this.ScriptPublicKey = new XMGScriptPublicKey_1.XMGScriptPublicKey(output.scriptPubKey);
    }
    /**
     * Create an XMGOutput from raw JSON.
     * @param raw - Raw object matching `IVout`.
     * @returns The created XMGOutput instance.
     */
    static fromJSON(raw) {
        return new XMGOutput(raw);
    }
    /**
     * Convert an array of `IVout` into an array of `XMGOutput` instances.
     * @param rawArray - Source array.
     * @returns An array of `XMGOutput` instances, or empty array.
     */
    static fromArray(rawArray) {
        if (!Array.isArray(rawArray))
            return [];
        return rawArray.map((r) => new XMGOutput(r));
    }
    /**
     * Serialize the instance back to JSON that matches `IVout`.
     * @returns JSON-compatible `IVout` object.
     */
    toJSON() {
        return {
            value: this.Value,
            n: this.Index,
            scriptPubKey: this.ScriptPublicKey.toJSON()
        };
    }
}
exports.XMGOutput = XMGOutput;
//# sourceMappingURL=XMGOutput.js.map
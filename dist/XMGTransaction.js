"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMGTransaction = void 0;
const XMGOutput_1 = require("./XMGOutput");
/**
 * XMGTransaction - lightweight TypeScript model for Magi (XMG) transactions.
 * Parsers are defensive and will coerce/normalize common shapes found in examples.
 */
/**
 * Lightweight model for a Magi (XMG) transaction.
 *
 * This class normalizes the common transaction JSON shapes returned by XMG
 * RPC/node explorers and exposes convenience helpers for serialization and
 * basic analysis.
 */
class XMGTransaction {
    /**
    * Create a new XMGTransaction.
     * @param obj - Raw transaction object matching `IXMGTransaction`.
    * @example
    * const tx = XMGTransaction.fromJSON('{"txid":"...","version":1,"time":1600000000,"locktime":0,"vin":[],"vout":[]}');
     */
    constructor(obj) {
        this.ID = String(obj.txid);
        this.Version = Number(obj.version) || 0;
        this.Time = typeof obj.time === 'number' ? new Date(obj.time * 1000) : new Date();
        this.LockTime = Number(obj.locktime) || 0;
        this.Inputs = Array.isArray(obj.vin) ? obj.vin.map(XMGTransaction.normalizeVin) : [];
        this.Outputs = Array.isArray(obj.vout) ? obj.vout.map(XMGTransaction.normalizeVout) : [];
        this.BlockHash = obj.blockhash;
        this.Confirmations = typeof obj.confirmations === 'number' ? obj.confirmations : undefined;
        this.TransactionTime = typeof obj.txntime === 'number' ? new Date(obj.txntime * 1000) : undefined;
    }
    /**
     * Parse a JSON string to create a new `XMGTransaction` instance.
     * @param json - JSON string that represents a transaction.
    * @returns A new `XMGTransaction` instance.
     */
    static fromJSON(json) {
        const obj = JSON.parse(json);
        return new XMGTransaction(obj);
    }
    /**
     * Create a transaction from a plain object already validated or
     * normalized to `IXMGTransaction`.
     * @param obj - Transaction-like object with properties matching `IXMGTransaction`.
    * @returns A new `XMGTransaction` instance.
     */
    static fromObject(obj) {
        // Example:
        // const tx = XMGTransaction.fromObject({ txid: '1', version: 1, time: 1600000000, locktime: 0, vin: [], vout: [] });
        return new XMGTransaction(obj);
    }
    /**
     * Convert various possible "vin" shapes into a normalized `XMGInput`.
     * This method is defensive: it accepts heterogeneous shapes from different
     * explorers and either maps them to an `XMGInput` or produces defaults.
     * @param v - Any raw vin object from RPC or explorer responses.
     * @returns A normalized `XMGInput` instance.
    * @example
    * // Normalizes coinbase and txid-style inputs from different explorers
    * XMGTransaction.normalizeVin({ txid: '1', vout: 0, sequence: 4294967295 });
     */
    static normalizeVin(v) {
        var _a, _b;
        const vin = {
            isCoinbase: v.coinbase !== undefined,
            isTransaction: v.txid !== undefined,
            Sequence: typeof v.sequence === 'number' ? v.sequence : Number(v.sequence) || 0,
            toJSON: () => ({}),
        };
        if (v.coinbase !== undefined)
            vin.Coinbase = String(v.coinbase);
        if (v.txid !== undefined)
            vin.TransactionID = String(v.txid);
        if (v.vout !== undefined)
            vin.OutputIndex = Number(v.vout);
        if (v.scriptSig && typeof v.scriptSig === 'object') {
            vin.ScriptSignature = {
                Assembly: (_a = v.scriptSig.asm) !== null && _a !== void 0 ? _a : v.scriptSig.ASM,
                Hexadecimal: (_b = v.scriptSig.hex) !== null && _b !== void 0 ? _b : v.scriptSig.HEX,
                toJSON: () => ({}),
            };
        }
        return vin;
    }
    /**
     * Normalize a `vout` JSON object into an `XMGOutput`.
     * @param v - Raw vout object from RPC or explorer output.
     * @returns An `XMGOutput` instance with normalized fields.
    * @example
    * XMGTransaction.normalizeVout({ value: 1.23, n: 0, scriptPubKey: { asm: 'OP_DUP OP_HASH160', hex: '...', type: 'pubkeyhash', addresses: ['Xx...'] } });
     */
    static normalizeVout(v) {
        var _a, _b, _c, _d, _e, _f, _g;
        const script = {
            asm: (_b = (_a = v.scriptPubKey) === null || _a === void 0 ? void 0 : _a.asm) !== null && _b !== void 0 ? _b : '',
            hex: (_d = (_c = v.scriptPubKey) === null || _c === void 0 ? void 0 : _c.hex) !== null && _d !== void 0 ? _d : '',
            reqSigs: typeof ((_e = v.scriptPubKey) === null || _e === void 0 ? void 0 : _e.reqSigs) === 'number' ? v.scriptPubKey.reqSigs : undefined,
            type: (_f = v.scriptPubKey) === null || _f === void 0 ? void 0 : _f.type,
            addresses: Array.isArray((_g = v.scriptPubKey) === null || _g === void 0 ? void 0 : _g.addresses) ? v.scriptPubKey.addresses.slice() : undefined,
        };
        return new XMGOutput_1.XMGOutput({
            value: typeof v.value === 'number' ? v.value : Number(v.value) || 0,
            n: Number(v.n) || 0,
            scriptPubKey: script,
        });
    }
    /**
     * Get outputs that match the provided index (n).
     * @param index - Output index to match.
     * @returns Array of `XMGOutput` entries with a matching `Index`.
     */
    outputsByIndex(index) {
        return this.Outputs.filter(o => o.Index === index);
    }
    /**
     * Get outputs filtered by script public key type (e.g. 'pubkeyhash').
     * @param type - Case-sensitive script type to match.
     * @returns Array of `XMGOutput` where `ScriptPublicKey.Type === type`.
     */
    outputsByType(type) {
        return this.Outputs.filter(o => { var _a; return ((_a = o.ScriptPublicKey) === null || _a === void 0 ? void 0 : _a.Type) === type; });
    }
    /**
     * Convert this transaction into a JSON-safe object following the
     * `IXMGTransaction` interface. This method is primarily intended to
     * produce the same shape returned by XMG nodes and RPCs.
     * @returns A JSON-serializable `IXMGTransaction` object.
     */
    toJSON() {
        var _a;
        return {
            txid: this.ID,
            version: this.Version,
            time: this.Time.getTime() / 1000,
            locktime: this.LockTime,
            vin: this.Inputs.map(v => ({ coinbase: v.Coinbase, txid: v.TransactionID, vout: v.OutputIndex, scriptSig: v.ScriptSignature ? {
                    asm: v.ScriptSignature.Assembly,
                    hex: v.ScriptSignature.Hexadecimal,
                } : undefined, sequence: v.Sequence || 0 })),
            vout: this.Outputs.map(v => ({ value: v.Value, n: v.Index, scriptPubKey: v.ScriptPublicKey ? {
                    asm: v.ScriptPublicKey.Assembly,
                    hex: v.ScriptPublicKey.Hexadecimal,
                    reqSigs: v.ScriptPublicKey.RequiredSignatures || undefined,
                    type: v.ScriptPublicKey.Type,
                    addresses: v.ScriptPublicKey.Addresses ? v.ScriptPublicKey.Addresses.slice() : undefined
                } : { asm: '', hex: '', reqSigs: undefined, type: '', addresses: undefined } })),
            blockhash: this.BlockHash || undefined,
            confirmations: this.Confirmations || 0,
            txntime: (((_a = this.TransactionTime) === null || _a === void 0 ? void 0 : _a.getTime()) || 0) / 1000,
        };
    }
    /**
     * Sum of all output values for this transaction.
     * @returns Total value of outputs as a number (float).
     */
    totalOutputValue() {
        return this.Outputs.reduce((s, o) => s + Number(o.Value || 0), 0);
    }
}
exports.XMGTransaction = XMGTransaction;
//# sourceMappingURL=XMGTransaction.js.map
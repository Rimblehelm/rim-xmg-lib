import { XMGInput, IVin } from './XMGInput';
import { XMGOutput, IVout } from './XMGOutput';
import { IXMGScriptPubKey } from './XMGScriptPublicKey';
import { IScriptSig } from './XMGScriptSignature';

/**
 * Interface representing the raw JSON structure of a Coin Magi (XMG) transaction.
 */
export interface IXMGTransaction {
    txid: string;
    version: number;
    time: number;
    locktime: number;
    vin: IVin[];
    vout: IVout[];
    blockhash?: string;
    confirmations?: number;
    txntime?: number;
}

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
export class XMGTransaction {
    ID: string;
    Version: number;
    Time: Date;
    LockTime: number;
    Inputs: XMGInput[];
    Outputs: XMGOutput[];
    BlockHash?: string;
    Confirmations?: number;
    TransactionTime?: Date;

    /**
    * Create a new XMGTransaction.
     * @param obj - Raw transaction object matching `IXMGTransaction`.
    * @example
    * const tx = XMGTransaction.fromJSON('{"txid":"...","version":1,"time":1600000000,"locktime":0,"vin":[],"vout":[]}');
     */
    constructor(obj: IXMGTransaction) {
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
    static fromJSON(json: string): XMGTransaction {
        const obj = JSON.parse(json);
        return new XMGTransaction(obj);
    }
    /**
     * Create a transaction from a plain object already validated or
     * normalized to `IXMGTransaction`.
     * @param obj - Transaction-like object with properties matching `IXMGTransaction`.
    * @returns A new `XMGTransaction` instance.
     */
    static fromObject(obj: IXMGTransaction): XMGTransaction {
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
    static normalizeVin(v: any): XMGInput {
        const vin: XMGInput = {
            isCoinbase: v.coinbase !== undefined,
            isTransaction: v.txid !== undefined,
            Sequence: typeof v.sequence === 'number' ? v.sequence : Number(v.sequence) || 0,
            toJSON: () => ({} as IVin),
        };

        if (v.coinbase !== undefined) vin.Coinbase = String(v.coinbase);
        if (v.txid !== undefined) vin.TransactionID = String(v.txid);
        if (v.vout !== undefined) vin.OutputIndex = Number(v.vout);
        if (v.scriptSig && typeof v.scriptSig === 'object') {
            vin.ScriptSignature = {
                Assembly: v.scriptSig.asm ?? v.scriptSig.ASM,
                Hexadecimal: v.scriptSig.hex ?? v.scriptSig.HEX,

                toJSON: () => ({} as IScriptSig),
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
    static normalizeVout(v: any): XMGOutput {
        const script: IXMGScriptPubKey = {
            asm: v.scriptPubKey?.asm ?? '',
            hex: v.scriptPubKey?.hex ?? '',
            reqSigs: typeof v.scriptPubKey?.reqSigs === 'number' ? v.scriptPubKey.reqSigs : undefined,
            type: v.scriptPubKey?.type,
            addresses: Array.isArray(v.scriptPubKey?.addresses) ? v.scriptPubKey.addresses.slice() : undefined,
        };

        return new XMGOutput({
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
    outputsByIndex(index: number): XMGOutput[] {
        return this.Outputs.filter(o => o.Index === index);
    }
    /**
     * Get outputs filtered by script public key type (e.g. 'pubkeyhash').
     * @param type - Case-sensitive script type to match.
     * @returns Array of `XMGOutput` where `ScriptPublicKey.Type === type`.
     */
    outputsByType(type: string): XMGOutput[] {
        return this.Outputs.filter(o => o.ScriptPublicKey?.Type === type);
    }
    /**
     * Convert this transaction into a JSON-safe object following the
     * `IXMGTransaction` interface. This method is primarily intended to
     * produce the same shape returned by XMG nodes and RPCs.
     * @returns A JSON-serializable `IXMGTransaction` object.
     */
    toJSON(): IXMGTransaction {
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
            txntime: (this.TransactionTime?.getTime() || 0) / 1000,
        };
    }
    /**
     * Sum of all output values for this transaction.
     * @returns Total value of outputs as a number (float).
     */
    totalOutputValue(): number {
        return this.Outputs.reduce((s, o) => s + Number(o.Value || 0), 0);
    }
}
/**
 * Interface representing the raw JSON structure of a Coin Magi (XMG) script public key.
 */
export interface IXMGScriptPubKey {
    asm: string;
    hex: string;
    reqSigs?: number;
    type: string;
    addresses?: string[];
}

/**
 * Represents a Coin Magi (XMG) script public key.
 * Construct with raw JSON (e.g. scriptPubKey element) or use fromJSON/fromArray helpers.
 */
/**
 * Model for the script public key portion of an XMG transaction output.
 *
 * The class is a thin wrapper over the raw JSON produced by a node. It
 * normalizes the common fields and exposes a `toJSON` helper.
 */
export class XMGScriptPublicKey {
    Assembly: string;
    Hexadecimal: string;
    RequiredSignatures?: number;
    Type: string;
    Addresses?: string[];

    /**
     * Initialize a new `XMGScriptPublicKey` from raw JSON
     * @param scriptPubKey - Raw scriptPubKey object
     * @example
     * const pk = new XMGScriptPublicKey({ asm: 'OP_DUP', hex: '...', type: 'pubkeyhash', addresses: ['Xx...'] });
     */
    constructor(scriptPubKey: IXMGScriptPubKey) {
        this.Assembly = scriptPubKey.asm;
        this.Hexadecimal = scriptPubKey.hex;
        this.RequiredSignatures = scriptPubKey.reqSigs;
        this.Type = scriptPubKey.type;
        this.Addresses = scriptPubKey.addresses;
    }

    /**
     * Create an `XMGScriptPublicKey` from raw JSON.
     * @param raw - Raw scriptPubKey
     * @returns A normalized `XMGScriptPublicKey` instance.
     */
    static fromJSON(raw: IXMGScriptPubKey): XMGScriptPublicKey {
        return new XMGScriptPublicKey(raw);
    }
    /**
     * Convert an array of raw scriptPubKey objects into model instances.
     * @param rawArray - Array to convert
     * @returns Array of `XMGScriptPublicKey`.
     */
    static fromArray(rawArray: IXMGScriptPubKey[] | any[]): XMGScriptPublicKey[] {
        if (!Array.isArray(rawArray)) return [];

        return rawArray.map((r) => new XMGScriptPublicKey(r));
    }

    /**
     * Serialize the instance into the raw JSON shape used by RPCs.
     * @returns IXMGScriptPubKey object
     */
    toJSON(): IXMGScriptPubKey {
        return {
            asm: this.Assembly,
            hex: this.Hexadecimal,
            reqSigs: this.RequiredSignatures || undefined,
            type: this.Type,
            addresses: this.Addresses || undefined
        };
    }
}
import { XMGTransaction, IXMGTransaction } from "./XMGTransaction";
export interface IXMGWallet {
    address: string;
    label?: string;
    createdAt: Date;
    transactions: IXMGTransaction[];
}
/**
 * Represents a simple wallet object containing transactions and an address.
 *
 * This is a convenience wrapper for showing balances and transaction counts
 * for a single address; transactions are returned as `XMGTransaction` instances.
 */
export declare class XMGWallet {
    address: string;
    label?: string;
    createdAt: Date;
    transactions: XMGTransaction[];
    /**
     * Create a wallet from raw data.
     * @param data - Wallet data matching `IXMGWallet`.
     * @example
     * const w = new XMGWallet({ address: 'Xx...', createdAt: new Date(), transactions: [] });
     */
    constructor(data: IXMGWallet);
    /**
     * Returns the number of transactions associated with the wallet.
    * @returns Number of transactions attached to the wallet.
     */
    get transactionCount(): number;
    /**
     * Computes a simple balance for the wallet by summing incoming and
     * subtracting outgoing amounts based on transaction outputs and inputs.
     *
     * Note: this is a naive balance calculator and relies on `ScriptPublicKey`
     * addresses being populated.
        * @returns Calculated balance for the wallet address (number).
        */
    get balance(): number;
}

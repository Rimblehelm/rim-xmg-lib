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
export class XMGWallet {
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
    constructor(data: IXMGWallet) {
        this.address = data.address;
        this.label = data.label;
        this.createdAt = data.createdAt;
        this.transactions = data.transactions.map(tx => new XMGTransaction(tx));
    }

    /**
     * Returns the number of transactions associated with the wallet.
    * @returns Number of transactions attached to the wallet.
     */
    public get transactionCount(): number {
        return this.transactions.length || 0;
    }
    /**
     * Computes a simple balance for the wallet by summing incoming and
     * subtracting outgoing amounts based on transaction outputs and inputs.
     *
     * Note: this is a naive balance calculator and relies on `ScriptPublicKey`
     * addresses being populated.
        * @returns Calculated balance for the wallet address (number).
        */
    public get balance(): number {
        return this.transactions.reduce((runningBalance, tx) => {
            const incoming = (tx.Outputs ?? []).reduce((sum, output) => {
                const addresses = output.ScriptPublicKey?.Addresses ?? [];
                return sum + (addresses.includes(this.address) ? output.Value : 0);
            }, 0);

            const outgoing = (tx.Inputs ?? []).reduce((sum, input) => {
                const outputIndex = input.OutputIndex;
                const output = tx.Outputs?.find((output, index) => { return outputIndex === index }) ?? null;
                const addresses = output?.ScriptPublicKey?.Addresses ?? [];

                return sum + (addresses.includes(this.address) ? output?.Value || 0 : 0);
            }, 0);

            return runningBalance + incoming - outgoing;
        }, 0);
    }
}
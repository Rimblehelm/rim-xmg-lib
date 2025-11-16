"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMGWallet = void 0;
const XMGTransaction_1 = require("./XMGTransaction");
/**
 * Represents a simple wallet object containing transactions and an address.
 *
 * This is a convenience wrapper for showing balances and transaction counts
 * for a single address; transactions are returned as `XMGTransaction` instances.
 */
class XMGWallet {
    /**
     * Create a wallet from raw data.
     * @param data - Wallet data matching `IXMGWallet`.
     * @example
     * const w = new XMGWallet({ address: 'Xx...', createdAt: new Date(), transactions: [] });
     */
    constructor(data) {
        this.address = data.address;
        this.label = data.label;
        this.createdAt = data.createdAt;
        this.transactions = data.transactions.map(tx => new XMGTransaction_1.XMGTransaction(tx));
    }
    /**
     * Returns the number of transactions associated with the wallet.
    * @returns Number of transactions attached to the wallet.
     */
    get transactionCount() {
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
    get balance() {
        return this.transactions.reduce((runningBalance, tx) => {
            var _a, _b;
            const incoming = ((_a = tx.Outputs) !== null && _a !== void 0 ? _a : []).reduce((sum, output) => {
                var _a, _b;
                const addresses = (_b = (_a = output.ScriptPublicKey) === null || _a === void 0 ? void 0 : _a.Addresses) !== null && _b !== void 0 ? _b : [];
                return sum + (addresses.includes(this.address) ? output.Value : 0);
            }, 0);
            const outgoing = ((_b = tx.Inputs) !== null && _b !== void 0 ? _b : []).reduce((sum, input) => {
                var _a, _b, _c, _d;
                const outputIndex = input.OutputIndex;
                const output = (_b = (_a = tx.Outputs) === null || _a === void 0 ? void 0 : _a.find((output, index) => { return outputIndex === index; })) !== null && _b !== void 0 ? _b : null;
                const addresses = (_d = (_c = output === null || output === void 0 ? void 0 : output.ScriptPublicKey) === null || _c === void 0 ? void 0 : _c.Addresses) !== null && _d !== void 0 ? _d : [];
                return sum + (addresses.includes(this.address) ? (output === null || output === void 0 ? void 0 : output.Value) || 0 : 0);
            }, 0);
            return runningBalance + incoming - outgoing;
        }, 0);
    }
}
exports.XMGWallet = XMGWallet;
//# sourceMappingURL=XMGWallet.js.map
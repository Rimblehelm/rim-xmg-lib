[**@rimblehelm/rim-xmg-lib**](../../README.md)

***

[@rimblehelm/rim-xmg-lib](../../modules.md) / [src](../README.md) / XMGWallet

# Class: XMGWallet

Defined in: [src/XMGWallet.ts:16](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGWallet.ts#L16)

Represents a simple wallet object containing transactions and an address.

This is a convenience wrapper for showing balances and transaction counts
for a single address; transactions are returned as `XMGTransaction` instances.

## Constructors

### Constructor

> **new XMGWallet**(`data`): `XMGWallet`

Defined in: [src/XMGWallet.ts:28](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGWallet.ts#L28)

Create a wallet from raw data.

#### Parameters

##### data

[`IXMGWallet`](../interfaces/IXMGWallet.md)

Wallet data matching `IXMGWallet`.

#### Returns

`XMGWallet`

#### Example

```ts
const w = new XMGWallet({ address: 'Xx...', createdAt: new Date(), transactions: [] });
```

## Properties

### address

> **address**: `string`

Defined in: [src/XMGWallet.ts:17](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGWallet.ts#L17)

***

### createdAt

> **createdAt**: `Date`

Defined in: [src/XMGWallet.ts:19](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGWallet.ts#L19)

***

### label?

> `optional` **label**: `string`

Defined in: [src/XMGWallet.ts:18](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGWallet.ts#L18)

***

### transactions

> **transactions**: [`XMGTransaction`](XMGTransaction.md)[]

Defined in: [src/XMGWallet.ts:20](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGWallet.ts#L20)

## Accessors

### balance

#### Get Signature

> **get** **balance**(): `number`

Defined in: [src/XMGWallet.ts:50](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGWallet.ts#L50)

Computes a simple balance for the wallet by summing incoming and
subtracting outgoing amounts based on transaction outputs and inputs.

Note: this is a naive balance calculator and relies on `ScriptPublicKey`
addresses being populated.
   *

##### Returns

`number`

Calculated balance for the wallet address (number).

***

### transactionCount

#### Get Signature

> **get** **transactionCount**(): `number`

Defined in: [src/XMGWallet.ts:39](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGWallet.ts#L39)

Returns the number of transactions associated with the wallet.

##### Returns

`number`

Number of transactions attached to the wallet.

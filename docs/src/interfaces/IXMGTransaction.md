[**@rimblehelm/rim-xmg-lib**](../../README.md)

***

[@rimblehelm/rim-xmg-lib](../../modules.md) / [src](../README.md) / IXMGTransaction

# Interface: IXMGTransaction

Defined in: [src/XMGTransaction.ts:9](https://github.com/Rimblehelm/rim-xmg-lib/blob/3949369596ca20bc1373e7ee83cbbd2b042b0704/src/XMGTransaction.ts#L9)

Interface representing the raw JSON structure of a Coin Magi (XMG) transaction.

## Properties

### blockhash?

> `optional` **blockhash**: `string`

Defined in: [src/XMGTransaction.ts:16](https://github.com/Rimblehelm/rim-xmg-lib/blob/3949369596ca20bc1373e7ee83cbbd2b042b0704/src/XMGTransaction.ts#L16)

***

### confirmations?

> `optional` **confirmations**: `number`

Defined in: [src/XMGTransaction.ts:17](https://github.com/Rimblehelm/rim-xmg-lib/blob/3949369596ca20bc1373e7ee83cbbd2b042b0704/src/XMGTransaction.ts#L17)

***

### locktime

> **locktime**: `number`

Defined in: [src/XMGTransaction.ts:13](https://github.com/Rimblehelm/rim-xmg-lib/blob/3949369596ca20bc1373e7ee83cbbd2b042b0704/src/XMGTransaction.ts#L13)

***

### time

> **time**: `number`

Defined in: [src/XMGTransaction.ts:12](https://github.com/Rimblehelm/rim-xmg-lib/blob/3949369596ca20bc1373e7ee83cbbd2b042b0704/src/XMGTransaction.ts#L12)

***

### txid

> **txid**: `string`

Defined in: [src/XMGTransaction.ts:10](https://github.com/Rimblehelm/rim-xmg-lib/blob/3949369596ca20bc1373e7ee83cbbd2b042b0704/src/XMGTransaction.ts#L10)

***

### txntime?

> `optional` **txntime**: `number`

Defined in: [src/XMGTransaction.ts:18](https://github.com/Rimblehelm/rim-xmg-lib/blob/3949369596ca20bc1373e7ee83cbbd2b042b0704/src/XMGTransaction.ts#L18)

***

### version

> **version**: `number`

Defined in: [src/XMGTransaction.ts:11](https://github.com/Rimblehelm/rim-xmg-lib/blob/3949369596ca20bc1373e7ee83cbbd2b042b0704/src/XMGTransaction.ts#L11)

***

### vin

> **vin**: [`IVin`](IVin.md)[]

Defined in: [src/XMGTransaction.ts:14](https://github.com/Rimblehelm/rim-xmg-lib/blob/3949369596ca20bc1373e7ee83cbbd2b042b0704/src/XMGTransaction.ts#L14)

***

### vout

> **vout**: [`IVout`](IVout.md)[]

Defined in: [src/XMGTransaction.ts:15](https://github.com/Rimblehelm/rim-xmg-lib/blob/3949369596ca20bc1373e7ee83cbbd2b042b0704/src/XMGTransaction.ts#L15)

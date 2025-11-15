[**rim-xmg-lib**](../../README.md)

***

[rim-xmg-lib](../../modules.md) / [src](../README.md) / IXMGTransaction

# Interface: IXMGTransaction

Defined in: src/XMGTransaction.ts:9

Interface representing the raw JSON structure of a Coin Magi (XMG) transaction.

## Properties

### blockhash?

> `optional` **blockhash**: `string`

Defined in: src/XMGTransaction.ts:16

***

### confirmations?

> `optional` **confirmations**: `number`

Defined in: src/XMGTransaction.ts:17

***

### locktime

> **locktime**: `number`

Defined in: src/XMGTransaction.ts:13

***

### time

> **time**: `number`

Defined in: src/XMGTransaction.ts:12

***

### txid

> **txid**: `string`

Defined in: src/XMGTransaction.ts:10

***

### txntime?

> `optional` **txntime**: `number`

Defined in: src/XMGTransaction.ts:18

***

### version

> **version**: `number`

Defined in: src/XMGTransaction.ts:11

***

### vin

> **vin**: [`IVin`](IVin.md)[]

Defined in: src/XMGTransaction.ts:14

***

### vout

> **vout**: [`IVout`](IVout.md)[]

Defined in: src/XMGTransaction.ts:15

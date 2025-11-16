[**@rimblehelm/rim-xmg-lib**](../../README.md)

***

[@rimblehelm/rim-xmg-lib](../../modules.md) / [src](../README.md) / XMGTransaction

# Class: XMGTransaction

Defined in: [src/XMGTransaction.ts:32](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L32)

Lightweight model for a Magi (XMG) transaction.

This class normalizes the common transaction JSON shapes returned by XMG
RPC/node explorers and exposes convenience helpers for serialization and
basic analysis.

## Constructors

### Constructor

> **new XMGTransaction**(`obj`): `XMGTransaction`

Defined in: [src/XMGTransaction.ts:49](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L49)

Create a new XMGTransaction.
 *

#### Parameters

##### obj

[`IXMGTransaction`](../interfaces/IXMGTransaction.md)

Raw transaction object matching `IXMGTransaction`.

#### Returns

`XMGTransaction`

#### Example

```ts
const tx = XMGTransaction.fromJSON('{"txid":"...","version":1,"time":1600000000,"locktime":0,"vin":[],"vout":[]}');
```

## Properties

### BlockHash?

> `optional` **BlockHash**: `string`

Defined in: [src/XMGTransaction.ts:39](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L39)

***

### Confirmations?

> `optional` **Confirmations**: `number`

Defined in: [src/XMGTransaction.ts:40](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L40)

***

### ID

> **ID**: `string`

Defined in: [src/XMGTransaction.ts:33](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L33)

***

### Inputs

> **Inputs**: [`XMGInput`](XMGInput.md)[]

Defined in: [src/XMGTransaction.ts:37](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L37)

***

### LockTime

> **LockTime**: `number`

Defined in: [src/XMGTransaction.ts:36](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L36)

***

### Outputs

> **Outputs**: [`XMGOutput`](XMGOutput.md)[]

Defined in: [src/XMGTransaction.ts:38](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L38)

***

### Time

> **Time**: `Date`

Defined in: [src/XMGTransaction.ts:35](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L35)

***

### TransactionTime?

> `optional` **TransactionTime**: `Date`

Defined in: [src/XMGTransaction.ts:41](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L41)

***

### Version

> **Version**: `number`

Defined in: [src/XMGTransaction.ts:34](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L34)

## Methods

### outputsByIndex()

> **outputsByIndex**(`index`): [`XMGOutput`](XMGOutput.md)[]

Defined in: [src/XMGTransaction.ts:142](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L142)

Get outputs that match the provided index (n).

#### Parameters

##### index

`number`

Output index to match.

#### Returns

[`XMGOutput`](XMGOutput.md)[]

Array of `XMGOutput` entries with a matching `Index`.

***

### outputsByType()

> **outputsByType**(`type`): [`XMGOutput`](XMGOutput.md)[]

Defined in: [src/XMGTransaction.ts:150](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L150)

Get outputs filtered by script public key type (e.g. 'pubkeyhash').

#### Parameters

##### type

`string`

Case-sensitive script type to match.

#### Returns

[`XMGOutput`](XMGOutput.md)[]

Array of `XMGOutput` where `ScriptPublicKey.Type === type`.

***

### toJSON()

> **toJSON**(): [`IXMGTransaction`](../interfaces/IXMGTransaction.md)

Defined in: [src/XMGTransaction.ts:159](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L159)

Convert this transaction into a JSON-safe object following the
`IXMGTransaction` interface. This method is primarily intended to
produce the same shape returned by XMG nodes and RPCs.

#### Returns

[`IXMGTransaction`](../interfaces/IXMGTransaction.md)

A JSON-serializable `IXMGTransaction` object.

***

### totalOutputValue()

> **totalOutputValue**(): `number`

Defined in: [src/XMGTransaction.ts:185](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L185)

Sum of all output values for this transaction.

#### Returns

`number`

Total value of outputs as a number (float).

***

### fromJSON()

> `static` **fromJSON**(`json`): `XMGTransaction`

Defined in: [src/XMGTransaction.ts:67](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L67)

Parse a JSON string to create a new `XMGTransaction` instance.

#### Parameters

##### json

`string`

JSON string that represents a transaction.

#### Returns

`XMGTransaction`

A new `XMGTransaction` instance.

***

### fromObject()

> `static` **fromObject**(`obj`): `XMGTransaction`

Defined in: [src/XMGTransaction.ts:77](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L77)

Create a transaction from a plain object already validated or
normalized to `IXMGTransaction`.

#### Parameters

##### obj

[`IXMGTransaction`](../interfaces/IXMGTransaction.md)

Transaction-like object with properties matching `IXMGTransaction`.

#### Returns

`XMGTransaction`

A new `XMGTransaction` instance.

***

### normalizeVin()

> `static` **normalizeVin**(`v`): [`XMGInput`](XMGInput.md)

Defined in: [src/XMGTransaction.ts:92](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L92)

Convert various possible "vin" shapes into a normalized `XMGInput`.
This method is defensive: it accepts heterogeneous shapes from different
explorers and either maps them to an `XMGInput` or produces defaults.

#### Parameters

##### v

`any`

Any raw vin object from RPC or explorer responses.

#### Returns

[`XMGInput`](XMGInput.md)

A normalized `XMGInput` instance.

#### Example

```ts
// Normalizes coinbase and txid-style inputs from different explorers
XMGTransaction.normalizeVin({ txid: '1', vout: 0, sequence: 4294967295 });
```

***

### normalizeVout()

> `static` **normalizeVout**(`v`): [`XMGOutput`](XMGOutput.md)

Defined in: [src/XMGTransaction.ts:121](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGTransaction.ts#L121)

Normalize a `vout` JSON object into an `XMGOutput`.

#### Parameters

##### v

`any`

Raw vout object from RPC or explorer output.

#### Returns

[`XMGOutput`](XMGOutput.md)

An `XMGOutput` instance with normalized fields.

#### Example

```ts
XMGTransaction.normalizeVout({ value: 1.23, n: 0, scriptPubKey: { asm: 'OP_DUP OP_HASH160', hex: '...', type: 'pubkeyhash', addresses: ['Xx...'] } });
```

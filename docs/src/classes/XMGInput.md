[**@rimblehelm/rim-xmg-lib**](../../README.md)

***

[@rimblehelm/rim-xmg-lib](../../modules.md) / [src](../README.md) / XMGInput

# Class: XMGInput

Defined in: [src/XMGInput.ts:24](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGInput.ts#L24)

Represents a Coin Magi (XMG) transaction input.

Provides helpers for parsing raw vin JSON and for serializing back to the
RPC-compatible structure.

## Constructors

### Constructor

> **new XMGInput**(`input`): `XMGInput`

Defined in: [src/XMGInput.ts:37](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGInput.ts#L37)

Constructs a new XMGInput from a raw `IVin` object.

#### Parameters

##### input

[`IVin`](../interfaces/IVin.md)

Raw input JSON matching `IVin`.
   *

#### Returns

`XMGInput`

#### Example

```ts
* const input = new XMGInput({ txid: 'abc', vout: 1, sequence: 0 });
```

## Properties

### Coinbase?

> `optional` **Coinbase**: `string`

Defined in: [src/XMGInput.ts:25](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGInput.ts#L25)

***

### OutputIndex?

> `optional` **OutputIndex**: `number`

Defined in: [src/XMGInput.ts:27](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGInput.ts#L27)

***

### ScriptSignature?

> `optional` **ScriptSignature**: [`XMGScriptSignature`](XMGScriptSignature.md)

Defined in: [src/XMGInput.ts:28](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGInput.ts#L28)

***

### Sequence

> **Sequence**: `number`

Defined in: [src/XMGInput.ts:29](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGInput.ts#L29)

***

### TransactionID?

> `optional` **TransactionID**: `string`

Defined in: [src/XMGInput.ts:26](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGInput.ts#L26)

## Accessors

### isCoinbase

#### Get Signature

> **get** **isCoinbase**(): `boolean`

Defined in: [src/XMGInput.ts:72](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGInput.ts#L72)

True when this input is a coinbase (mined reward) input.
   *

##### Returns

`boolean`

`true` when this input is coinbase.

***

### isTransaction

#### Get Signature

> **get** **isTransaction**(): `boolean`

Defined in: [src/XMGInput.ts:79](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGInput.ts#L79)

True when this input references a previous transaction output.
   *

##### Returns

`boolean`

`true` when input references previous tx + output.

## Methods

### toJSON()

> **toJSON**(): [`IVin`](../interfaces/IVin.md)

Defined in: [src/XMGInput.ts:87](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGInput.ts#L87)

Serialize an XMGInput back to JSON compatible with `IVin`.

#### Returns

[`IVin`](../interfaces/IVin.md)

IVin structure.

***

### fromArray()

> `static` **fromArray**(`rawArray`): `XMGInput`[]

Defined in: [src/XMGInput.ts:62](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGInput.ts#L62)

Map an array of raw `IVin` objects into an array of `XMGInput`.
Safely returns an empty array if provided value is not an array.

#### Parameters

##### rawArray

Array-like input to convert.

`any`[] | [`IVin`](../interfaces/IVin.md)[]

#### Returns

`XMGInput`[]

An array of XMGInput instances.

***

### fromJSON()

> `static` **fromJSON**(`raw`): `XMGInput`

Defined in: [src/XMGInput.ts:53](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGInput.ts#L53)

Construct an XMGInput from raw JSON.

#### Parameters

##### raw

[`IVin`](../interfaces/IVin.md)

Raw IVin object.

#### Returns

`XMGInput`

A normalized XMGInput instance.

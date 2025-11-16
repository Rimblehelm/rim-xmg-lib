[**@rimblehelm/rim-xmg-lib**](../../README.md)

***

[@rimblehelm/rim-xmg-lib](../../modules.md) / [src](../README.md) / XMGOutput

# Class: XMGOutput

Defined in: [src/XMGOutput.ts:18](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGOutput.ts#L18)

Represents a Coin Magi (XMG) transaction output.

Construct with raw JSON (e.g. an element from vout array) or use
`fromJSON` / `fromArray` helpers.

## Constructors

### Constructor

> **new XMGOutput**(`output`): `XMGOutput`

Defined in: [src/XMGOutput.ts:29](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGOutput.ts#L29)

Create a new XMGOutput from raw IVout JSON.

#### Parameters

##### output

[`IVout`](../interfaces/IVout.md)

Raw output object returned by a node or explorer.

#### Returns

`XMGOutput`

#### Example

```ts
const out = XMGOutput.fromJSON({ value: 2.5, n: 0, scriptPubKey: { asm: '...', hex: '...', type: 'pubkeyhash', addresses: ['Xx...'] } });
```

## Properties

### Index

> **Index**: `number`

Defined in: [src/XMGOutput.ts:20](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGOutput.ts#L20)

***

### ScriptPublicKey

> **ScriptPublicKey**: [`XMGScriptPublicKey`](XMGScriptPublicKey.md)

Defined in: [src/XMGOutput.ts:21](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGOutput.ts#L21)

***

### Value

> **Value**: `number`

Defined in: [src/XMGOutput.ts:19](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGOutput.ts#L19)

## Methods

### toJSON()

> **toJSON**(): [`IVout`](../interfaces/IVout.md)

Defined in: [src/XMGOutput.ts:58](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGOutput.ts#L58)

Serialize the instance back to JSON that matches `IVout`.

#### Returns

[`IVout`](../interfaces/IVout.md)

JSON-compatible `IVout` object.

***

### fromArray()

> `static` **fromArray**(`rawArray`): `XMGOutput`[]

Defined in: [src/XMGOutput.ts:48](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGOutput.ts#L48)

Convert an array of `IVout` into an array of `XMGOutput` instances.

#### Parameters

##### rawArray

Source array.

`any`[] | [`IVout`](../interfaces/IVout.md)[]

#### Returns

`XMGOutput`[]

An array of `XMGOutput` instances, or empty array.

***

### fromJSON()

> `static` **fromJSON**(`raw`): `XMGOutput`

Defined in: [src/XMGOutput.ts:40](https://github.com/Rimblehelm/rim-xmg-lib/blob/7d9cfa40923e323fcfc92e4b3b88d18123f2fac8/src/XMGOutput.ts#L40)

Create an XMGOutput from raw JSON.

#### Parameters

##### raw

[`IVout`](../interfaces/IVout.md)

Raw object matching `IVout`.

#### Returns

`XMGOutput`

The created XMGOutput instance.

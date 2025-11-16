[**@rimblehelm/rim-xmg-lib**](../../README.md)

***

[@rimblehelm/rim-xmg-lib](../../modules.md) / [src](../README.md) / XMGScriptPublicKey

# Class: XMGScriptPublicKey

Defined in: [src/XMGScriptPublicKey.ts:22](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGScriptPublicKey.ts#L22)

Model for the script public key portion of an XMG transaction output.

The class is a thin wrapper over the raw JSON produced by a node. It
normalizes the common fields and exposes a `toJSON` helper.

## Constructors

### Constructor

> **new XMGScriptPublicKey**(`scriptPubKey`): `XMGScriptPublicKey`

Defined in: [src/XMGScriptPublicKey.ts:35](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGScriptPublicKey.ts#L35)

Initialize a new `XMGScriptPublicKey` from raw JSON

#### Parameters

##### scriptPubKey

[`IXMGScriptPubKey`](../interfaces/IXMGScriptPubKey.md)

Raw scriptPubKey object

#### Returns

`XMGScriptPublicKey`

#### Example

```ts
const pk = new XMGScriptPublicKey({ asm: 'OP_DUP', hex: '...', type: 'pubkeyhash', addresses: ['Xx...'] });
```

## Properties

### Addresses?

> `optional` **Addresses**: `string`[]

Defined in: [src/XMGScriptPublicKey.ts:27](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGScriptPublicKey.ts#L27)

***

### Assembly

> **Assembly**: `string`

Defined in: [src/XMGScriptPublicKey.ts:23](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGScriptPublicKey.ts#L23)

***

### Hexadecimal

> **Hexadecimal**: `string`

Defined in: [src/XMGScriptPublicKey.ts:24](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGScriptPublicKey.ts#L24)

***

### RequiredSignatures?

> `optional` **RequiredSignatures**: `number`

Defined in: [src/XMGScriptPublicKey.ts:25](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGScriptPublicKey.ts#L25)

***

### Type

> **Type**: `string`

Defined in: [src/XMGScriptPublicKey.ts:26](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGScriptPublicKey.ts#L26)

## Methods

### toJSON()

> **toJSON**(): [`IXMGScriptPubKey`](../interfaces/IXMGScriptPubKey.md)

Defined in: [src/XMGScriptPublicKey.ts:66](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGScriptPublicKey.ts#L66)

Serialize the instance into the raw JSON shape used by RPCs.

#### Returns

[`IXMGScriptPubKey`](../interfaces/IXMGScriptPubKey.md)

IXMGScriptPubKey object

***

### fromArray()

> `static` **fromArray**(`rawArray`): `XMGScriptPublicKey`[]

Defined in: [src/XMGScriptPublicKey.ts:56](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGScriptPublicKey.ts#L56)

Convert an array of raw scriptPubKey objects into model instances.

#### Parameters

##### rawArray

Array to convert

`any`[] | [`IXMGScriptPubKey`](../interfaces/IXMGScriptPubKey.md)[]

#### Returns

`XMGScriptPublicKey`[]

Array of `XMGScriptPublicKey`.

***

### fromJSON()

> `static` **fromJSON**(`raw`): `XMGScriptPublicKey`

Defined in: [src/XMGScriptPublicKey.ts:48](https://github.com/Rimblehelm/rim-xmg-lib/blob/92afc3440416710ad3959fb47254f7f1137bdeac/src/XMGScriptPublicKey.ts#L48)

Create an `XMGScriptPublicKey` from raw JSON.

#### Parameters

##### raw

[`IXMGScriptPubKey`](../interfaces/IXMGScriptPubKey.md)

Raw scriptPubKey

#### Returns

`XMGScriptPublicKey`

A normalized `XMGScriptPublicKey` instance.

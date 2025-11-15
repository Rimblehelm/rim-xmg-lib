[**rim-xmg-lib**](../../README.md)

***

[rim-xmg-lib](../../modules.md) / [src](../README.md) / XMGScriptSignature

# Class: XMGScriptSignature

Defined in: src/XMGScriptSignature.ts:19

Model for a script signature.

Contains the script assembly and hexadecimal representation used inside a
transaction's input `scriptSig`.

## Constructors

### Constructor

> **new XMGScriptSignature**(`obj`): `XMGScriptSignature`

Defined in: src/XMGScriptSignature.ts:29

Construct a new XMGScriptSignature from raw scriptSig JSON.

#### Parameters

##### obj

[`IScriptSig`](../interfaces/IScriptSig.md)

Raw `IScriptSig` value.

#### Returns

`XMGScriptSignature`

#### Example

```ts
const s = XMGScriptSignature.fromJSON({ asm: '...', hex: '...' });
```

## Properties

### Assembly

> **Assembly**: `string`

Defined in: src/XMGScriptSignature.ts:20

***

### Hexadecimal

> **Hexadecimal**: `string`

Defined in: src/XMGScriptSignature.ts:21

## Methods

### toJSON()

> **toJSON**(): [`IScriptSig`](../interfaces/IScriptSig.md)

Defined in: src/XMGScriptSignature.ts:57

Serialize this signature back to the RPC-compatible JSON form.

#### Returns

[`IScriptSig`](../interfaces/IScriptSig.md)

`IScriptSig` with `asm` and `hex` fields.

***

### fromArray()

> `static` **fromArray**(`rawArray`): `XMGScriptSignature`[]

Defined in: src/XMGScriptSignature.ts:47

Convert an array of raw scriptSig objects into model instances.

#### Parameters

##### rawArray

Source array to convert

`any`[] | [`IScriptSig`](../interfaces/IScriptSig.md)[]

#### Returns

`XMGScriptSignature`[]

Array of `XMGScriptSignature`.

***

### fromJSON()

> `static` **fromJSON**(`raw`): `XMGScriptSignature`

Defined in: src/XMGScriptSignature.ts:39

Create an `XMGScriptSignature` instance from raw JSON.

#### Parameters

##### raw

[`IScriptSig`](../interfaces/IScriptSig.md)

Raw scriptSig object

#### Returns

`XMGScriptSignature`

The constructed XMGScriptSignature instance.

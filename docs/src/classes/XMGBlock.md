[**rim-xmg-lib**](../../README.md)

***

[rim-xmg-lib](../../modules.md) / [src](../README.md) / XMGBlock

# Class: XMGBlock

Defined in: src/XMGBlock.ts:37

Lightweight model for a Magi (XMG) block as returned by XMG RPCs.

The model normalizes certain fields (e.g. `mint` which can be a string)
and exposes convenience getters for commonly useful checks.

## Constructors

### Constructor

> **new XMGBlock**(`data`): `XMGBlock`

Defined in: src/XMGBlock.ts:65

Create a new XMGBlock instance from raw block JSON.

#### Parameters

##### data

[`IXMGBlock`](../interfaces/IXMGBlock.md)

Raw `IXMGBlock` object returned by node or explorer.

#### Returns

`XMGBlock`

#### Example

```ts
const block = new XMGBlock({ hash: 'abc', confirmations: 100, size: 1234, height: 10, version: 1, merkleroot: '...', mint: 0, time: 1600000000, nonce: 0, bits: '1d00ffff', difficulty: 1, flags: '', proofhash: '...', entropybit: 0, modifier: '', modifierchecksum: '', tx: [], signature: '' });
```

## Properties

### bits

> `readonly` **bits**: `string`

Defined in: src/XMGBlock.ts:47

***

### confirmations

> `readonly` **confirmations**: `number`

Defined in: src/XMGBlock.ts:39

***

### difficulty

> `readonly` **difficulty**: `number`

Defined in: src/XMGBlock.ts:48

***

### entropyBit

> `readonly` **entropyBit**: `boolean`

Defined in: src/XMGBlock.ts:53

***

### flags

> `readonly` **flags**: `string`

Defined in: src/XMGBlock.ts:51

***

### hash

> `readonly` **hash**: `string`

Defined in: src/XMGBlock.ts:38

***

### height

> `readonly` **height**: `number`

Defined in: src/XMGBlock.ts:41

***

### merkleRoot

> `readonly` **merkleRoot**: `string`

Defined in: src/XMGBlock.ts:43

***

### mint

> `readonly` **mint**: `number`

Defined in: src/XMGBlock.ts:44

***

### modifier

> `readonly` **modifier**: `string`

Defined in: src/XMGBlock.ts:54

***

### modifierChecksum

> `readonly` **modifierChecksum**: `string`

Defined in: src/XMGBlock.ts:55

***

### nextBlockHash?

> `readonly` `optional` **nextBlockHash**: `string`

Defined in: src/XMGBlock.ts:50

***

### nonce

> `readonly` **nonce**: `number`

Defined in: src/XMGBlock.ts:46

***

### previousBlockHash?

> `readonly` `optional` **previousBlockHash**: `string`

Defined in: src/XMGBlock.ts:49

***

### proofHash

> `readonly` **proofHash**: `string`

Defined in: src/XMGBlock.ts:52

***

### signature

> `readonly` **signature**: `string`

Defined in: src/XMGBlock.ts:57

***

### size

> `readonly` **size**: `number`

Defined in: src/XMGBlock.ts:40

***

### time

> `readonly` **time**: `Date`

Defined in: src/XMGBlock.ts:45

***

### transactions

> `readonly` **transactions**: `string`[]

Defined in: src/XMGBlock.ts:56

***

### version

> `readonly` **version**: `number`

Defined in: src/XMGBlock.ts:42

## Accessors

### hasStakeModifier

#### Get Signature

> **get** **hasStakeModifier**(): `boolean`

Defined in: src/XMGBlock.ts:143

True when the block flags contain a stake-modifier marker.

##### Returns

`boolean`

true when the stake modifier flag appears in flags string.

***

### isGenesis

#### Get Signature

> **get** **isGenesis**(): `boolean`

Defined in: src/XMGBlock.ts:150

True if this block is the genesis block (height === 0).

##### Returns

`boolean`

true when this block's height equals zero.

***

### isProofOfStake

#### Get Signature

> **get** **isProofOfStake**(): `boolean`

Defined in: src/XMGBlock.ts:157

True when the block flags indicate Proof-of-Stake.

##### Returns

`boolean`

true when flags indicate 'proof-of-stake'.

***

### isProofOfWork

#### Get Signature

> **get** **isProofOfWork**(): `boolean`

Defined in: src/XMGBlock.ts:164

True when the block flags indicate Proof-of-Work.

##### Returns

`boolean`

true when flags indicate 'proof-of-work'.

***

### txCount

#### Get Signature

> **get** **txCount**(): `number`

Defined in: src/XMGBlock.ts:171

Number of transactions in the block.

##### Returns

`number`

Count of transactions in the block.

## Methods

### toJSON()

> **toJSON**(): [`IXMGBlock`](../interfaces/IXMGBlock.md)

Defined in: src/XMGBlock.ts:113

Serialize this block back to RPC-like JSON.

#### Returns

[`IXMGBlock`](../interfaces/IXMGBlock.md)

`IXMGBlock` object.

***

### fromArray()

> `static` **fromArray**(`rawArray`): `XMGBlock`[]

Defined in: src/XMGBlock.ts:104

Convert an array of raw block objects into `XMGBlock` instances.

#### Parameters

##### rawArray

Raw blocks array

`any`[] | [`IXMGBlock`](../interfaces/IXMGBlock.md)[]

#### Returns

`XMGBlock`[]

Array of `XMGBlock` objects.

***

### fromJSON()

> `static` **fromJSON**(`raw`): `XMGBlock`

Defined in: src/XMGBlock.ts:96

Create a XMGBlock from raw JSON data.

#### Parameters

##### raw

[`IXMGBlock`](../interfaces/IXMGBlock.md)

Raw block JSON

#### Returns

`XMGBlock`

New `XMGBlock` instance.

/**
 * rim-xmg-lib - A minimal TypeScript library for parsing and working with
 * Magi (XMG) raw JSON structures returned by nodes and explorers.
 */
export * from './XMGBlock';
export * from './XMGInput';
export * from './XMGOutput';
export * from './XMGScriptPublicKey';
export * from './XMGScriptSignature';
export * from './XMGTransaction';
export * from './XMGWallet';

// Provide a default (compat) export for consumers that import the module default
// NOTE: named exports are used above for improved TypeDoc compatibility.
// If you depend on the default export object (e.g. `import lib from 'rim-xmg-lib'`),
// you can re-create a default object with `import * as rim from 'rim-xmg-lib'`.

// For backward compatibility with code that expects a default object
// `import rim from 'rim-xmg-lib'`, we provide a default export that mirrors
// the top-level named exports. This keeps TypeDoc-friendly named exports
// while preserving previous default-import users.
import { XMGBlock } from './XMGBlock';
import { XMGInput } from './XMGInput';
import { XMGOutput } from './XMGOutput';
import { XMGScriptPublicKey } from './XMGScriptPublicKey';
import { XMGScriptSignature } from './XMGScriptSignature';
import { XMGTransaction } from './XMGTransaction';
import { XMGWallet } from './XMGWallet';

export default {
	XMGBlock,
	XMGInput,
	XMGOutput,
	XMGScriptPublicKey,
	XMGScriptSignature,
	XMGTransaction,
	XMGWallet,
};
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
import { XMGBlock } from './XMGBlock';
import { XMGInput } from './XMGInput';
import { XMGOutput } from './XMGOutput';
import { XMGScriptPublicKey } from './XMGScriptPublicKey';
import { XMGScriptSignature } from './XMGScriptSignature';
import { XMGTransaction } from './XMGTransaction';
import { XMGWallet } from './XMGWallet';
declare const _default: {
    XMGBlock: typeof XMGBlock;
    XMGInput: typeof XMGInput;
    XMGOutput: typeof XMGOutput;
    XMGScriptPublicKey: typeof XMGScriptPublicKey;
    XMGScriptSignature: typeof XMGScriptSignature;
    XMGTransaction: typeof XMGTransaction;
    XMGWallet: typeof XMGWallet;
};
export default _default;

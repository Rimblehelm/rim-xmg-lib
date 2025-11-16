"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * rim-xmg-lib - A minimal TypeScript library for parsing and working with
 * Magi (XMG) raw JSON structures returned by nodes and explorers.
 */
__exportStar(require("./XMGBlock"), exports);
__exportStar(require("./XMGInput"), exports);
__exportStar(require("./XMGOutput"), exports);
__exportStar(require("./XMGScriptPublicKey"), exports);
__exportStar(require("./XMGScriptSignature"), exports);
__exportStar(require("./XMGTransaction"), exports);
__exportStar(require("./XMGWallet"), exports);
// Provide a default (compat) export for consumers that import the module default
// NOTE: named exports are used above for improved TypeDoc compatibility.
// If you depend on the default export object (e.g. `import lib from 'rim-xmg-lib'`),
// you can re-create a default object with `import * as rim from 'rim-xmg-lib'`.
// For backward compatibility with code that expects a default object
// `import rim from 'rim-xmg-lib'`, we provide a default export that mirrors
// the top-level named exports. This keeps TypeDoc-friendly named exports
// while preserving previous default-import users.
const XMGBlock_1 = require("./XMGBlock");
const XMGInput_1 = require("./XMGInput");
const XMGOutput_1 = require("./XMGOutput");
const XMGScriptPublicKey_1 = require("./XMGScriptPublicKey");
const XMGScriptSignature_1 = require("./XMGScriptSignature");
const XMGTransaction_1 = require("./XMGTransaction");
const XMGWallet_1 = require("./XMGWallet");
exports.default = {
    XMGBlock: XMGBlock_1.XMGBlock,
    XMGInput: XMGInput_1.XMGInput,
    XMGOutput: XMGOutput_1.XMGOutput,
    XMGScriptPublicKey: XMGScriptPublicKey_1.XMGScriptPublicKey,
    XMGScriptSignature: XMGScriptSignature_1.XMGScriptSignature,
    XMGTransaction: XMGTransaction_1.XMGTransaction,
    XMGWallet: XMGWallet_1.XMGWallet,
};
//# sourceMappingURL=index.js.map
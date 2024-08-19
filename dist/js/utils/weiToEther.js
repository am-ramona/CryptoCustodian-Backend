"use strict";
/**
 * Converts an amount from Wei to Ether.
 * @param {string} wei a string representing the amount in Wei to be converted.
 * @returns {number} the amount in Ether, converted from Wei. The value is returned as a floating-point number.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.weiToEther = void 0;
const weiToEther = (wei) => parseFloat(wei) / 1e18;
exports.weiToEther = weiToEther;

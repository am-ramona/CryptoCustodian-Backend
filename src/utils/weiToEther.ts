/**
 * Converts an amount from Wei to Ether.
 * @param {string} wei a string representing the amount in Wei to be converted.
 * @returns {number} the amount in Ether, converted from Wei. The value is returned as a floating-point number.
 */

export const weiToEther = (wei: string): number => parseFloat(wei) / 1e18;
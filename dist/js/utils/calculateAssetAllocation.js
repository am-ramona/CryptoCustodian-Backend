"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAssetAllocation = calculateAssetAllocation;
/**
 * Calculates the asset allocation based on a list of transactions.
 * @param transactions An array of transaction objects
 * @returns An object representing the asset allocation
 */
function calculateAssetAllocation(transactions) {
    const allocation = transactions.reduce((acc, tx) => {
        if (!acc[tx.tokenSymbol]) {
            acc[tx.tokenSymbol] = 0;
        }
        acc[tx.tokenSymbol] +=
            parseFloat(tx.value) / Math.pow(10, parseInt(tx.tokenDecimal));
        return acc;
    }, {});
    // Convert the allocation object to an array of objects
    const allocationArray = Object.keys(allocation).map((tokenSymbol) => ({
        tokenSymbol,
        allocation: allocation[tokenSymbol],
    }));
    return allocationArray;
}

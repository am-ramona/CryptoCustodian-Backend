import { EtherscanTransaction } from "../types";

/**
 * Calculates the asset allocation based on a list of transactions.
 * @param transactions An array of transaction objects
 * @returns An object representing the asset allocation
 */

export function calculateAssetAllocation(
    transactions: EtherscanTransaction[]
): Array<{ tokenSymbol: string; allocation: number }> {
    const allocation = transactions.reduce((acc: any, tx) => {
        if (!acc[tx.tokenSymbol]) {
            acc[tx.tokenSymbol] = 0;
        }
        acc[tx.tokenSymbol] +=
            parseFloat(tx.value) / 10 ** parseInt(tx.tokenDecimal);
        return acc;
    }, {});

    // Convert the allocation object to an array of objects
    const allocationArray = Object.keys(allocation).map((tokenSymbol) => ({
        tokenSymbol,
        allocation: allocation[tokenSymbol],
    }));

    return allocationArray;
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePerformanceMetrics = void 0;
const weiToEther_1 = require("./weiToEther");
/**
 * Determines whether a given Etherscan transaction has failed based on its input data.
 * @param {EtherscanTransaction} tx an object representing a transaction from Etherscan.
 * @returns {boolean} true if the transaction has failed (i.e., its input is "deprecated").
 * false otherwise.
 */
const isFailedTransaction = (tx) => {
    return tx.input === "deprecated";
};
/**
 * Calculates the performance metrics based on a list of transactions.
 * @param {EtherscanTransaction[]} transactions an array of transaction objects.
 * @returns {SmartContractMetrics} an object representing the performance metrics containing the following
 *   - `transactionCount` (number): The total number of transactions.
 *   - `totalGasUsed` (number): The total gas used across all transactions.
 *   - `totalEtherTransferred` (number): The total amount of Ether transferred, converted from its smallest unit.
 *   - `tokenTransfers` (number): The number of transactions involving token transfers.
 *   - `averageGasPrice` (number): The average gas price of all transactions.
 *   - `averageTransactionValue` (number): The average value of all transactions.
 *   - `maxGasUsed` (number): The maximum gas used in a single transaction.
 *   - `minGasUsed` (number): The minimum gas used in a single transaction.
 *   - `errorRate` (number): The percentage of transactions that failed.
 */
const calculatePerformanceMetrics = (transactions) => {
    let transactionCount = 0;
    let totalGasUsed = 0;
    let averageGasPrice = 0;
    let maxGasUsed = 0;
    let minGasUsed = 0;
    let totalEtherTransferred = 0;
    let tokenTransfers = 0;
    let averageTransactionValue = 0;
    // let transactionFrequency: Record<string, number> = {};
    let errorRate = 0;
    transactions.forEach((tx) => {
        transactionCount++;
        totalGasUsed += parseInt(tx.gasUsed, 10);
        totalEtherTransferred += (0, weiToEther_1.weiToEther)(tx.value);
        // const date = new Date(parseInt(tx.timeStamp, 10) * 1000)
        //     .toISOString()
        //     .split("T")[0];
        // transactionFrequency[date] = (transactionFrequency[date] || 0) + 1;
        if (tx.tokenName) {
            tokenTransfers++;
        }
    });
    averageGasPrice =
        transactions.reduce((sum, tx) => sum + parseInt(tx.gasPrice, 10), 0) /
            transactions.length;
    averageTransactionValue =
        transactions.reduce((sum, tx) => sum + parseInt(tx.value, 10), 0) /
            transactions.length;
    const gasUsedValues = transactions.map((tx) => parseInt(tx.gasUsed, 10));
    maxGasUsed = Math.max(...gasUsedValues);
    minGasUsed = Math.min(...gasUsedValues);
    const totalTransactions = transactions.length;
    const failedTransactions = transactions.filter(isFailedTransaction).length;
    errorRate = (failedTransactions / totalTransactions) * 100;
    return {
        transactionCount,
        totalGasUsed,
        totalEtherTransferred,
        tokenTransfers,
        averageGasPrice,
        averageTransactionValue,
        maxGasUsed,
        minGasUsed,
        // transactionFrequency,
        errorRate,
    };
};
exports.calculatePerformanceMetrics = calculatePerformanceMetrics;

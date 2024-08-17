"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePerformanceMetrics = void 0;
const weiToEther_1 = require("./weiToEther");
const isFailedTransaction = (tx) => {
    return tx.input === "deprecated";
};
const calculatePerformanceMetrics = (transactions) => {
    let transactionCount = 0;
    let totalGasUsed = 0;
    let averageGasPrice = 0;
    let maxGasUsed = 0;
    let minGasUsed = 0;
    let totalEtherTransferred = 0;
    let tokenTransfers = 0;
    let averageTransactionValue = 0;
    let transactionFrequency = {};
    let errorRate = 0;
    transactions.forEach((tx) => {
        transactionCount++;
        totalGasUsed += parseInt(tx.gasUsed, 10);
        totalEtherTransferred += (0, weiToEther_1.weiToEther)(tx.value);
        const date = new Date(parseInt(tx.timeStamp, 10) * 1000)
            .toISOString()
            .split("T")[0];
        transactionFrequency[date] = (transactionFrequency[date] || 0) + 1;
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
        transactionFrequency,
        errorRate,
    };
};
exports.calculatePerformanceMetrics = calculatePerformanceMetrics;

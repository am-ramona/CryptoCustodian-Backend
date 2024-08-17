"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePortfolio = calculatePortfolio;
function calculatePortfolio(transactions) {
    const portfolio = transactions.reduce((acc, tx) => {
        const tokenName = tx.tokenName;
        const token = tx.tokenSymbol;
        const amount = parseFloat(tx.value) / Math.pow(10, parseInt(tx.tokenDecimal)); // Convert from smallest unit
        if (!acc[token]) {
            acc[token] = { amount: 0, symbol: token, name: tokenName };
        }
        acc[token].amount += amount;
        return acc;
    }, {});
    const portfolioArray = Object.values(portfolio);
    return portfolioArray;
}

import {
    EtherscanTransaction,
    SmartContractMetrics,
} from "../types"

export function calculatePortfolio(transactions: EtherscanTransaction[]) {
    const portfolio = transactions.reduce(
        (
            acc: Record<string, { amount: number; symbol: string; name?: string }>,
            tx
        ) => {
            const tokenName = tx.tokenName;
            const token = tx.tokenSymbol;
            const amount = parseFloat(tx.value) / 10 ** parseInt(tx.tokenDecimal); // Convert from smallest unit

            if (!acc[token]) {
                acc[token] = { amount: 0, symbol: token, name: tokenName };
            }
            acc[token].amount += amount;

            return acc;
        },
        {}
    );

    const portfolioArray = Object.values(portfolio);
    return portfolioArray;
}
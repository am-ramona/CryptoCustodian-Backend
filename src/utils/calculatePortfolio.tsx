import {
    EtherscanTransaction,
    TokenPortfolioItem
} from "../types";

/**
 * Calculates the total portfolio value from an array of Etherscan transactions.
 * @param {EtherscanTransaction[]} transactions - An array of transaction objects from Etherscan. Each transaction
 * should include the token's name, symbol, value (in smallest unit), and decimal precision.
 * @returns An array of objects, each representing a token in the portfolio. Each object
 * contains:
 *   - `amount` (number): The total amount of the token, converted to its standard unit.
 *   - `symbol` (string): The symbol of the token (e.g., 'ETH', 'USDT').
 *   - `name` (string, optional): The name of the token (e.g., 'Ethereum', 'Tether').
 */

export function calculatePortfolio(transactions: EtherscanTransaction[]): TokenPortfolioItem[] {
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
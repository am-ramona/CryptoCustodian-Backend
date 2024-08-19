import { Response, Request } from "express";
import dotenv from "dotenv";
import {
  calculatePortfolio,
  calculateAssetAllocation,
  calculatePerformanceMetrics,
} from "../../utils";
import Transaction from "../../models/walletTransactions";

dotenv.config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

/**
 * Fetches transaction data from the Etherscan API using the provided contract address and API key.
 *
 * @param {NextRequest} request - The request object containing information about the incoming request.
 * @returns {NextResponse} - The response object containing portfolio, asset allocation, and performance metrics.
 */

const getWalletTransactions = async (req: Request, res: Response) => {
  try {
    const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error fetching data: ${data.message || response.statusText}`
      );
    }

    const transactions = data.result;

    // Save transactions to the database
    const savedTransactions = await Transaction.bulkCreate(
      transactions.map((tx: any) => ({
        from: tx.from,
        to: tx.to,
        value: tx.value,
        tokenName: tx.tokenName,
        tokenSymbol: tx.tokenSymbol,
        tokenDecimal: tx.tokenDecimal,
        gasUsed: tx.gasUsed,
        gasPrice: tx.gasPrice,
        timeStamp: tx.timeStamp,
        input: tx.input,
      }))
    );

    // Calculate portfolio, asset allocation, and performance metrics
    const portfolio = calculatePortfolio(transactions);
    const allocation = calculateAssetAllocation(transactions);
    const performance = calculatePerformanceMetrics(transactions);

    return res.status(200).json({ portfolio, allocation, performance });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { getWalletTransactions };

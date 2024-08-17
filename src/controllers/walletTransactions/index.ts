import { Response, Request } from "express"
import dotenv from 'dotenv'
import { calculatePortfolio, calculateAssetAllocation, calculatePerformanceMetrics } from "../../utils"
import Transaction from '../../models/walletTransactions'

dotenv.config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

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
        // console.log('transactions', transactions);
        // console.log('type of transactions', typeof transactions);


        // Example with async/await
        // function example() {
        //     try {
        //         for (const key in transactions) {


        //             if (transactions.hasOwnProperty(key)) {
        //                 console.log(`Key: ${key}`);
        //                 console.log(`Key: ${key}, Type: ${typeof transactions[key]}`);
        //             }
        //         }
        //         console.log('transactions loaded operation successful');
        //     } catch (error) {
        //         console.error('Error:', error);
        //     }
        // }

        // example();

        // Save transactions to the database
        const savedTransactions = await Transaction.bulkCreate(transactions.map((tx: any) => ({
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
        })));

        console.log('Saved transactions:', savedTransactions);

        // Calculate portfolio, asset allocation, and performance metrics
        const portfolio = calculatePortfolio(transactions);
        const allocation = calculateAssetAllocation(transactions);
        const performance = calculatePerformanceMetrics(transactions);

        return res.status(200).json({ portfolio, allocation, performance });
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export { getWalletTransactions }
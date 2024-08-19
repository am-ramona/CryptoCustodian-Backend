"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletTransactions = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../../utils");
const walletTransactions_1 = __importDefault(require("../../models/walletTransactions"));
dotenv_1.default.config();
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
/**
 * Fetches transaction data from the Etherscan API using the provided contract address and API key.
 *
 * @param {NextRequest} request - The request object containing information about the incoming request.
 * @returns {NextResponse} - The response object containing portfolio, asset allocation, and performance metrics.
 */
const getWalletTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`;
        const response = yield fetch(url);
        const data = yield response.json();
        if (!response.ok) {
            throw new Error(`Error fetching data: ${data.message || response.statusText}`);
        }
        const transactions = data.result;
        // Save transactions to the database
        const savedTransactions = yield walletTransactions_1.default.bulkCreate(transactions.map((tx) => ({
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
        // Calculate portfolio, asset allocation, and performance metrics
        const portfolio = (0, utils_1.calculatePortfolio)(transactions);
        const allocation = (0, utils_1.calculateAssetAllocation)(transactions);
        const performance = (0, utils_1.calculatePerformanceMetrics)(transactions);
        return res.status(200).json({ portfolio, allocation, performance });
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
});
exports.getWalletTransactions = getWalletTransactions;

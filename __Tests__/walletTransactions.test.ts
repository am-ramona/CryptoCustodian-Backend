// @ts-nocheck

import { expect, jest, test } from '@jest/globals';
import { Request, Response } from 'express';
import { getWalletTransactions } from '../src/controllers/walletTransactions'; // Adjust the path as needed
import Transaction from '../src/models/walletTransactions';
import * as utils from '../src/utils';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            result: [
                {
                    from: '0xabc',
                    to: '0xdef',
                    value: '1000000000000000000',
                    tokenName: 'TokenName',
                    tokenSymbol: 'TOKEN',
                    tokenDecimal: '18',
                    gasUsed: '21000',
                    gasPrice: '20000000000',
                    timeStamp: '1614077696',
                    input: '0x',
                },
            ],
        }),
    })
) as jest.Mock;

// Mock the Transaction model's bulkCreate method
jest.mock('../src/models/walletTransactions', () => ({
    bulkCreate: jest.fn(),
}));

// Mock utility functions
jest.mock('../src/utils', () => ({
    calculatePortfolio: jest.fn(),
    calculateAssetAllocation: jest.fn(),
    calculatePerformanceMetrics: jest.fn(),
}));

describe('getWalletTransactions', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    it('should fetch transactions, save them, and calculate metrics', async () => {
        const mockRequest = {} as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        const mockTransactions = [
            {
                from: '0xabc',
                to: '0xdef',
                value: '1000000000000000000',
                tokenName: 'TokenName',
                tokenSymbol: 'TOKEN',
                tokenDecimal: '18',
                gasUsed: '21000',
                gasPrice: '20000000000',
                timeStamp: '1614077696',
                input: '0x',
            },
        ];

        const mockFetchResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({ result: mockTransactions }),
        };

        global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);
        (Transaction.bulkCreate as jest.Mock).mockResolvedValue(mockTransactions);

        (utils.calculatePortfolio as jest.Mock).mockReturnValue({ portfolio: 'mockPortfolio' });
        (utils.calculateAssetAllocation as jest.Mock).mockReturnValue({ allocation: 'mockAllocation' });
        (utils.calculatePerformanceMetrics as jest.Mock).mockReturnValue({ performance: 'mockPerformance' });

        await getWalletTransactions(mockRequest, mockResponse);

        // Assert that fetch was called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            `https://api.etherscan.io/api?module=account&action=tokentx&address=${process.env.CONTRACT_ADDRESS}&apikey=${process.env.ETHERSCAN_API_KEY}`
        );

        // Assert that transactions were saved
        expect(Transaction.bulkCreate).toHaveBeenCalledWith(mockTransactions.map((tx) => ({
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

        // Assert that utility functions were called
        expect(utils.calculatePortfolio).toHaveBeenCalledWith(mockTransactions);
        expect(utils.calculateAssetAllocation).toHaveBeenCalledWith(mockTransactions);
        expect(utils.calculatePerformanceMetrics).toHaveBeenCalledWith(mockTransactions);

        // Assert that response status and json methods were called
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            portfolio: { portfolio: 'mockPortfolio' },
            allocation: { allocation: 'mockAllocation' },
            performance: { performance: 'mockPerformance' }
        });
    });
    it('should handle fetch errors', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

        const mockRequest = {} as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        await expect(getWalletTransactions(mockRequest, mockResponse)).rejects.toThrow('Fetch failed');
    });
});

// // Import node-fetch with an alias to avoid naming conflict
// const nodeFetch = require('node-fetch');
// const { Response: FetchResponse } = nodeFetch;
// // @ts-ignore
// import { getWalletTransactions } from '../src/controllers/walletTransactions'; // Adjust path as needed

// import { calculatePortfolio, calculateAssetAllocation, calculatePerformanceMetrics } from '../src/utils' 
// console.log('getWalletTransactions', getWalletTransactions)
// console.log('calculatePortfolio', calculatePortfolio)
// console.log('calculateAssetAllocation', calculateAssetAllocation)

// describe('Wallet Transactions Functions', () => {
//     it('should have all functions defined', () => {
//         expect(getWalletTransactions).toBeDefined();
//         expect(calculatePortfolio).toBeDefined();
//         expect(calculateAssetAllocation).toBeDefined();
//         expect(calculatePerformanceMetrics).toBeDefined();
//     });

//     // Add additional tests for each function here
// });

//   jest.mock('fetch', () => jest.fn());
//   jest.mock('../src/controllers/walletTransactions', () => ({
//     calculatePortfolio: jest.fn(),
//     calculateAssetAllocation: jest.fn(),
//     calculatePerformanceMetrics: jest.fn(),
//   }));
  
// //   const { Response: FetchResponse } = require('node-fetch');
  
//   describe('getWalletTransactions', () => {
//     const CONTRACT_ADDRESS = '0x58e6c7ab55aa9012eacca16d1ed4c15795669e1c';
//     const ETHERSCAN_API_KEY = 'IERRNNKHCYX2E9SDMGANHCCQG9AZYJ9D48'; 

//     let mockRequest: Partial<Request>;
//     let mockResponse: Partial<Response>;
  
//     beforeEach(() => {
//       jest.clearAllMocks();
//       process.env.CONTRACT_ADDRESS = CONTRACT_ADDRESS;
//       process.env.ETHERSCAN_API_KEY = ETHERSCAN_API_KEY;

//       // Create mock `Request` and `Response` objects
//     mockRequest = {
//         body: {}, // Mock request body if needed
//         params: {}, // Mock request params if needed
//         query: {}, // Mock request query if needed
//       } as unknown as Request;
  
//       mockResponse = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//         send: jest.fn(), // Mock `send` if used
//       } as unknown as Response;
//     });
  
//     it('should return portfolio, allocation, and performance metrics on success', async () => {
//         const mockTransactions = [{ /* some mock transaction data */ }];
//         (fetch as jest.Mock).mockResolvedValue(
//           new FetchResponse(JSON.stringify({ result: mockTransactions }), { status: 200 })
//         );
    
//         (calculatePortfolio as jest.Mock).mockReturnValue('mockPortfolio');
//         (calculateAssetAllocation as jest.Mock).mockReturnValue('mockAllocation');
//         (calculatePerformanceMetrics as jest.Mock).mockReturnValue('mockPerformance');
    
//         await getWalletTransactions(mockRequest as Request<any, any, any, ParsedQs, Record<string, any>>, mockResponse as Response);
    
//         expect(fetch).toHaveBeenCalledWith(
//           `https://api.etherscan.io/api?module=account&action=tokentx&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`
//         );
//         expect(calculatePortfolio).toHaveBeenCalledWith(mockTransactions);
//         expect(calculateAssetAllocation).toHaveBeenCalledWith(mockTransactions);
//         expect(calculatePerformanceMetrics).toHaveBeenCalledWith(mockTransactions);
//         expect(mockResponse.status).toHaveBeenCalledWith(200);
//         expect(mockResponse.json).toHaveBeenCalledWith({
//           portfolio: 'mockPortfolio',
//           allocation: 'mockAllocation',
//           performance: 'mockPerformance',
//         });
//       });
    
//       it('should handle errors from the API', async () => {
//         (fetch as jest.Mock).mockResolvedValue(
//           new FetchResponse(JSON.stringify({ message: 'API error' }), { status: 500 })
//         );
    
//         await expect(getWalletTransactions(mockRequest as Request, mockResponse as Response)).rejects.toThrow('Error fetching data: API error');
//         expect(mockResponse.status).not.toHaveBeenCalled();
//         expect(mockResponse.json).not.toHaveBeenCalled();
//       });
    
//       it('should handle fetch failures', async () => {
//         (fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'));
    
//         await expect(getWalletTransactions(mockRequest as Request, mockResponse as Response)).rejects.toThrow('Fetch failed');
//         expect(mockResponse.status).not.toHaveBeenCalled();
//         expect(mockResponse.json).not.toHaveBeenCalled();
//       });
//     });

import { Request, Response } from 'express';
import { getWalletTransactions } from '../src/controllers/walletTransactions'; // Adjust the path as needed
import Transaction from '../src/models/walletTransactions';
import * as utils from '../src/utils';
import request from 'supertest';  

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
    // Clear all instances and calls to constructor and all methods:
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

  // Mock global fetch
  global.fetch = jest.fn().mockResolvedValue(mockFetchResponse as any);

  // Mock the return value of Transaction.bulkCreate
  (Transaction.bulkCreate as jest.Mock).mockResolvedValue(mockTransactions);

  // Mock utility function results
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

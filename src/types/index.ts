export interface EtherscanTransaction {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    from: string;
    contractAddress: string;
    to: string;
    value: string; // In Wei
    tokenName: string;
    tokenSymbol: string;
    tokenDecimal: string;
    transactionIndex: string;
    gas: string;
    gasPrice: string;
    gasUsed: string;
    cumulativeGasUsed: string;
    input: string;
    confirmations: string;
  }
  
  export interface SmartContractMetrics {
    transactionCount: number;
    totalGasUsed: number;
    totalEtherTransferred: number;
    tokenTransfers: number;
    minGasUsed: number;
    maxGasUsed: number;
    averageGasPrice: number;
    averageTransactionValue: number;
    transactionFrequency: Record<string, number>;
    errorRate: number;
  }
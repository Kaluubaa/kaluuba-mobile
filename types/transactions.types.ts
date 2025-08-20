export interface SendData {
    recipientIdentifier: string;
    tokenSymbol: string;
    amount: number;
}


export interface Counterparty {
  id: number;
  username: string;
  name: string | null;
}

export interface ITransaction {
  transactionId: string;
  status: string;
  type: string;
  amount: string;
  tokenSymbol: string;
  counterparty: Counterparty;
  description: string | null;
  transactionType: string;
  blockchainTxHash: string;
  amountUSD: string;
  createdAt: string;
  confirmedAt: string;
  explorerUrl: string;
}
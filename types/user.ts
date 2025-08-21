export interface Wallet {
  id: number;
  user_id: number;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  isverified: boolean;
  createdAt: string;
  updatedAt: string;
  emailVerifiedAt: string | null;
  lastLoginAt: string | null;
  firstname: string | null;
  lastname: string | null;
  country: string | null;
  password: string;
  pin: string | null;
  privateKey: string;
  smartAccountAddress: string;
  smartAccountBalance: string | null;
  verificationToken: string | null;
  walletAddress: string;
}

export interface ProfileResponse {
  user: User;
} 

export interface Balance {
  decimals: number;
  formatted: string;
  network: string;
  raw: string;
  symbol: string;
  tokenAddress: string;
  usdValue: string;
}
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
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  wallet: Wallet;
}

export interface ProfileResponse {
  user: User;
} 
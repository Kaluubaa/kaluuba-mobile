export const API_BASE_URL = 'http://localhost:8080/api';

const endpoints = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    verifyEmail: '/auth/verify/email',
    resendOTP: '/auth/verify/resend',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  user: {
    profile: '/user/profile/me',
    updateWalletChain: '/user/wallet/chain',
  },
  invoices: {
    create: '/invoices',
    list: '/invoices',
    get: (id: string | number) => `/invoices/${id}`,
    update: (id: string | number) => `/invoices/${id}`,
    publish: (id: string | number) => `/invoices/${id}/publish`,
    delete: (id: string | number) => `/invoices/${id}`,
  },
  blockchain: {
    balance: (address: string) => `/blockchain/balance/${address}`,
    listChains: '/blockchain/chains',
    getChain: (chainId: string | number) => `/blockchain/chains/${chainId}`,
    addChain: '/blockchain/chains',
    updateChain: (chainId: string | number) => `/blockchain/chains/${chainId}`,
    deleteChain: (chainId: string | number) => `/blockchain/chains/${chainId}`,
  },
};

export default endpoints;

const endpoints = {
    auth: {
        login: '/auth/login',
        logout: '/auth/logout',
        register: '/auth/register',
        refresh: '/auth/refresh',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',
    },

    transactions: {
        getBalance: '/transactions/balances',
        getTransactionHistory: '/transactions/history',
        validateRecipient: '/transactions/validate-recipient'
    }
};

export default endpoints;
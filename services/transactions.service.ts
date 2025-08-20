import { SendData } from '~/types/transactions.types';
import { apiGet, apiPost } from './api';
import endpoints from './endpoints';

export const getUserBalance = async () => {
  return apiGet<any>(endpoints.transactions.getBalance);
};

export const validateTransactionRecipient = async (recipientIdentifier: string) => {
  return apiPost<any>(`${endpoints.transactions.validateRecipient}`, { recipientIdentifier });
};

export const sendToken = async (data: SendData) => {
  return apiPost<any>(endpoints.transactions.send, data);
};

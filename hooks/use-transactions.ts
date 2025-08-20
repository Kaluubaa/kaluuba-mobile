import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getTransactionHistory,
  getUserBalance,
  sendToken,
  validateTransactionRecipient,
} from '~/services/transactions.service';
import { SendData } from '~/types/transactions.types';

export const useGetUserBalance = () => {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: getUserBalance,
  });
};

export const useValidateRecipient = () => {
  return useMutation({
    mutationKey: ['validateRecipient'],
    mutationFn: (recipientIdentifier: string) => validateTransactionRecipient(recipientIdentifier),
  });
};

export const useSendToken = () => {
  return useMutation({
    mutationKey: ['sendToken'],
    mutationFn: (data: SendData) => sendToken(data),
  });
};

export const useGetTransactionHistory = () => {
  return useQuery({
    queryKey: ['transactionHistory'],
    queryFn: getTransactionHistory,
  });
};
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
    queryKey: ['userBalance'],
    queryFn: getUserBalance,
    staleTime: 30000, // Consider data stale after 30 seconds
    refetchOnWindowFocus: true, // Refetch when app comes to foreground
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
    staleTime: 30000, // Consider data stale after 30 seconds
    refetchOnWindowFocus: true, // Refetch when app comes to foreground
  });
};
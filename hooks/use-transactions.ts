import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserBalance, validateTransactionRecipient } from '~/services/transactions.service';

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

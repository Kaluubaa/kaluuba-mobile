import { useQuery } from '@tanstack/react-query';
import { getUserBalance } from '~/services/transactions.service';

export const useGetUserBalance = () => {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: getUserBalance,
  });
};

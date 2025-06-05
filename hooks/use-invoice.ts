import { useMutation, useQuery } from '@tanstack/react-query';
import { 
  createInvoice, 
  getUserInvoices, 
  deleteInvoice, 
  publishInvoice, 
  updateInvoice 
} from '~/services/invoice.service';
import { Invoice } from '~/types/invoice.t';

export function useCreateInvoice() {
  return useMutation({
    mutationFn: (data: Invoice) => createInvoice(data),
  });
}

export function useGetUserInvoices() {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: getUserInvoices,
  });
}

export function useDeleteInvoice() {
  return useMutation({
    mutationFn: (id: string) => deleteInvoice(id),
  });
}

export function usePublishInvoice() {
  return useMutation({
    mutationFn: (id: string) => publishInvoice(id),
  });
}

export function useUpdateInvoice() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Invoice> }) => 
      updateInvoice(id, data),
  });
} 
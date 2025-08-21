import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient, getAllClients } from '~/services/client.service';
import {
  createInvoice,
  getUserInvoices,
  deleteInvoice,
  publishInvoice,
  updateInvoice,
} from '~/services/invoice.service';
import { Invoice } from '~/types/invoice.t';
import { CreateClientDto } from '~/types/Invoicing.types';

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
    mutationFn: ({ id, data }: { id: string; data: Partial<Invoice> }) => updateInvoice(id, data),
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateClientDto) => createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client'] });
    },
  });
}

export const useGetClient = () => {
  return useQuery({
    queryKey: ['client'],
    queryFn: getAllClients,
  });
};

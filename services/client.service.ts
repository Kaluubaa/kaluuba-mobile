import { CreateClientDto } from '~/types/Invoicing.types';
import { apiGet, apiPost } from './api';
import endpoints from './endpoints';

export const createClient = async (data: CreateClientDto) => {
  return await apiPost<any>(endpoints.invoicing.createClient, data);
};
export const getAllClients = async () => {
  return await apiGet<any>(endpoints.invoicing.getAllClients);
};
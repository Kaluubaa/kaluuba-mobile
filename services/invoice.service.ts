import { Invoice } from "~/types/invoice.t";
import { apiPost, apiGet, apiDelete, apiPatch } from "./api";

export const createInvoice = async (data: Invoice) => {
  return apiPost("/invoices", data);
};

export const getUserInvoices = async () => {
  return apiGet("/invoices");
};

export const deleteInvoice = async (id: string) => {
  return apiDelete(`/invoices/${id}`);
};

export const publishInvoice = async (id: string) => {
  return apiPatch(`/invoices/${id}/publish`);
};

export const updateInvoice = async (id: string, data: Partial<Invoice>) => {
  return apiPatch(`/invoices/${id}`, data);
};

export interface InvoiceItem {
  description: string;
  amount: number;
  quantity: number;
}

export interface Invoice {
  id?: string;
  title: string;
  currency: string;
  status?: 'draft' | 'pending' | 'paid';
  created_at?: Date;
  items: InvoiceItem[];
}

interface InvoiceStats {
  totalInvoices: number;
  paidInvoices: number;
  overdueInvoices: number;
  totalBilled: number;
  totalPaid: number;
  outstandingAmount: number;
  paymentRate: number;
}

export interface IClient {
  id: number;
  userId: string;
  clientUserId: string | null;
  clientIdentifier: string;
  businesName: string | null;
  contactName: string | null;
  email: string | null;
  address: string | null;
  isActive: boolean;
  metadata: any | null;
  createdAt: string;
  updatedAt: string;
  registeredUser: any | null;
  invoiceStats: InvoiceStats;
}

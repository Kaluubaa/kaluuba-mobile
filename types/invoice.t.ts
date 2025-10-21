export interface InvoiceItem {
  name: string;
  description: string;
  amount: number;
  quantity: number;
}

type DiscountType = "percentage" | "fixed";
type InvoiceType = "one-time" | "recurring";
type RecurrenceInterval = "daily" | "weekly" | "monthly" | "yearly";

export interface Invoice {
  id: number;
  clientId: number;
  title: string;
  description: string;
  items: InvoiceItem[];
  currency: string;
  discountType: DiscountType;
  discountValue: number;
  dueDate: string; 
  invoiceType: InvoiceType;
  recurrenceInterval?: RecurrenceInterval; 
  recurrenceCount?: number; 
  acceptsFiatPayment: boolean;
  notes?: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  createdAt: string;
  updatedAt: string;
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

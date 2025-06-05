export interface InvoiceItem {
  description: string;
  amount: number;
  quantity: number;
}

export interface Invoice {
  id: string;
  title: string;
  currency: string;
  status: 'draft' | 'pending' | 'paid';
  createdAt: Date;
  items: InvoiceItem[];
}
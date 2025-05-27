
export interface AbandonedCart {
  id: string;
  date: string;
  price: number;
  email: string;
  name: string;
  items: CartItem[];
  lastActive: string;
  status: 'abandoned' | 'reminder-sent' | 'recovered';
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type SortField = 'date' | 'price' | 'email' | 'name' | 'lastActive';
export type SortDirection = 'asc' | 'desc';

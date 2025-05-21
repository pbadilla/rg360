export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
}

export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

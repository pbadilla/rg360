export interface Product {
  reference: string;
  ean: string;
  price: number;
  stock: number;
  image: string;
  brand: string;
  parentReference?: string;
  colors: string[];
  sizes: string[];
  createdAt: Date;
  description?: string;
}

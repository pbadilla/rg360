interface LocalizedString {
  en: string;
  es: string;
}

interface Variation {
  color: LocalizedString;
  size: string;
  stock: number;
  reference: string;
}

interface Price {
  pvp: number;
  pv: number;
  benefit_percentage: number;
}

export interface Stock {
  own_stock: boolean;
  id: string;
  name: LocalizedString;
  brand: string;
  ean13: string;
  parentReference: string;
  reference: string;
  price: Price;
  variations: Variation[];
  colors: LocalizedString[];
  sizes: string[];
  images: string[];
  status: 'active' | 'inactive';
  stock: number;
  createdAt: string; // ISO date string
  updateData: string; // ISO date string
  updatedAt: string; // ISO date string
  tags: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
}

export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export interface Role {
  id: string;
  name: string;
  description: string;
  image: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  address: Address;
  phone?: string;
  language?: string;
  isActive?: boolean;
  tags?: string[];
  image?: string;
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
};

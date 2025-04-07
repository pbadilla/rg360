export type User = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
};

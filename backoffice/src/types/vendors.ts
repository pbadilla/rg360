export type VendorAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type Vendor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: VendorAddress;
  createdAt: Date;
  updatedAt: Date;
};

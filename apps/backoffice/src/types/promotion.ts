export interface Promotion {
  id: string;
  title: string;
  description: string;
  backgroundColor: string;
  textColor: string;
  cta: {
    text: string;
    link: string;
  };
  schedule: {
    start: string; // ISO string or Date, depending on how you use it
    end: string;
  };
  bannerImage: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}


import { Order } from '@/components/OrderTable';
import axios from 'axios';

const isLocal = import.meta.env.MODE === 'development';

const apiClient = axios.create({
  baseURL: isLocal
    ? import.meta.env.VITE_API_LOCAL
    : import.meta.env.VITE_API_PROD,
  responseType: 'blob',
});

const headers = {
  'Content-Type': 'application/json',
};

const getHeaders = () => {
  return {
    ...headers,
    // Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
}; 
export const getDropshippingOrders = async (): Promise<Order[]> => {
  try {
    const response = await apiClient.get('/importerRollerblade', {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dropshipping orders:', error);
    throw error;
  }
};
// Mock data for orders
export const getMockDropshipping = (): Order[] => {
  return [
    {
      id: '1',
      name: 'John Smith',
      date: new Date('2023-10-15'),
      product: 'iPhone 15 Pro',
      pvp: 1299.99,
      costPercentage: 65.20,
      gainPercentage: 34.80
    },
    {
      id: '2',
      name: 'Emma Johnson',
      date: new Date('2023-10-18'),
      product: 'MacBook Air M2',
      pvp: 1199.00,
      costPercentage: 68.50,
      gainPercentage: 31.50
    },
    {
      id: '3',
      name: 'Michael Brown',
      date: new Date('2023-10-20'),
      product: 'iPad Pro 12.9"',
      pvp: 1099.00,
      costPercentage: 62.30,
      gainPercentage: 37.70
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      date: new Date('2023-10-21'),
      product: 'AirPods Pro 2',
      pvp: 249.99,
      costPercentage: 55.40,
      gainPercentage: 44.60
    },
    {
      id: '5',
      name: 'David Martinez',
      date: new Date('2023-10-22'),
      product: 'Apple Watch Series 9',
      pvp: 399.00,
      costPercentage: 60.80,
      gainPercentage: 39.20
    },
    {
      id: '6',
      name: 'Jessica Lee',
      date: new Date('2023-10-25'),
      product: 'HomePod Mini',
      pvp: 99.00,
      costPercentage: 58.90,
      gainPercentage: 41.10
    },
    {
      id: '7',
      name: 'James Taylor',
      date: new Date('2023-10-28'),
      product: 'Mac Mini M2',
      pvp: 599.00,
      costPercentage: 64.70,
      gainPercentage: 35.30
    },
    {
      id: '8',
      name: 'Olivia Garcia',
      date: new Date('2023-11-01'),
      product: 'iMac 24"',
      pvp: 1499.00,
      costPercentage: 67.20,
      gainPercentage: 32.80
    },
    {
      id: '9',
      name: 'William Davis',
      date: new Date('2023-11-03'),
      product: 'Studio Display',
      pvp: 1599.00,
      costPercentage: 70.10,
      gainPercentage: 29.90
    },
    {
      id: '10',
      name: 'Sophia Rodriguez',
      date: new Date('2023-11-05'),
      product: 'Mac Studio M2 Max',
      pvp: 1999.00,
      costPercentage: 72.40,
      gainPercentage: 27.60
    }
  ];
};

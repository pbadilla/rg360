
import React from 'react';
import OrderTable from '@/components/OrderTable';
import { getMockLogistics } from '@/services/logisticsService';
import InsideLayout from '@/components/layout/InsideLayout';

const Logistics: React.FC = () => {
  const orders = getMockLogistics();
  
  return (
    <InsideLayout title="Logistics" subTitle='View and manage all your orders with sortable columns.'>
      <OrderTable orders={orders} />
    </InsideLayout>

  );
};

export default Logistics;

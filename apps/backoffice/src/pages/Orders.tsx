
import React from 'react';
import OrderTable from '@/components/OrderTable';
import { getMockOrders } from '@/services/orderService';
import InsideLayout from '@/components/layout/InsideLayout';

const Orders: React.FC = () => {
  const orders = getMockOrders();
  
  return (
    <InsideLayout title="Orders" subTitle='View and manage all your users with sortable columns.'>
      <OrderTable orders={orders} />
    </InsideLayout>
  );
};

export default Orders;


import React from 'react';
import OrderTable from '@/components/OrderTable';
import { getMockInventory } from '@/services/inventoryService';
import InsideLayout from '@/components/layout/InsideLayout';

const Inventory: React.FC = () => {
  const orders = getMockInventory();
  
  return (
    <InsideLayout title="Inventory" subTitle='View and manage all your orders with sortable columns.'>
      <OrderTable orders={orders} />
    </InsideLayout>

  );
};

export default Inventory;

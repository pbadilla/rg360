import type React from "react";

import InsideLayout from "@/components/layout/InsideLayout";
import OrderTable from "@/components/Order/OrderTable";

import { getMockInventory } from "@/services/inventoryService";

const Inventory: React.FC = () => {
  const orders = getMockInventory();

  return (
    <InsideLayout
      title="Inventory"
      subTitle="View and manage all your orders with sortable columns."
    >
      <OrderTable orders={orders} />
    </InsideLayout>
  );
};

export default Inventory;

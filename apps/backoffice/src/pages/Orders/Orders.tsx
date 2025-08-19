import type React from "react";

import InsideLayout from "@/components/layout/InsideLayout";
import OrderTable from "@/components/Order/OrderTable";

const Orders: React.FC = () => {
  return (
    <InsideLayout
      title="Orders"
      subTitle="View and manage all your users with sortable columns."
    >
      <OrderTable />
    </InsideLayout>
  );
};

export default Orders;

import React from "react";
import OrderTable from "@/components/OrderTable";
import InsideLayout from "@/components/layout/InsideLayout";

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

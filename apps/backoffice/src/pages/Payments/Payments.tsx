import React from "react";
import OrderTable from "@/components/Order/OrderTable";
import { getMockPayments } from "@/services/paymentsService";
import InsideLayout from "@/components/layout/InsideLayout";

const Payments: React.FC = () => {
  const orders = getMockPayments();

  return (
    <InsideLayout
      title="Payments"
      subTitle="Create and manage your promotional campaigns with a simple and intuitive interface."
    >
      <OrderTable orders={orders} />
    </InsideLayout>
  );
};

export default Payments;

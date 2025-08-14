import React from "react";
import OrderTable from "@/components/Order/OrderTable";
import { getMockDropshipping } from "@/services/dropshippingService";
import InsideLayout from "@/components/layout/InsideLayout";

const Dropshipping: React.FC = () => {
  const orders = getMockDropshipping();

  return (
    <InsideLayout
      title="Dropshiping"
      subTitle="Create and manage your promotional campaigns with a simple and intuitive interface."
    >
      <OrderTable orders={orders} />
    </InsideLayout>
  );
};

export default Dropshipping;

import type React from "react";

import InsideLayout from "@/components/layout/InsideLayout";
import OrderTable from "@/components/Order/OrderTable";

import { getMockDropshipping } from "@/services/dropshippingService";

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

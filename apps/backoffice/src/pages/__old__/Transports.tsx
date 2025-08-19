import type React from "react";

import InsideLayout from "@/components/layout/InsideLayout";
import OrderTable from "@/components/Order/OrderTable";

import { getMockTransports } from "@/services/transportsService";

const Transports: React.FC = () => {
  const orders = getMockTransports();

  return (
    <InsideLayout
      title="Transports"
      subTitle="Create and manage your promotional campaigns with a simple and intuitive interface."
    >
      <OrderTable orders={orders} />
    </InsideLayout>
  );
};

export default Transports;

import React from "react";

import InsideLayout from "@/components/layout/InsideLayout";
import { PromotionTable } from "@/components/Promotions/PromotionTable";

const Promotions = () => {
  return (
    <InsideLayout
      title="Promotion Management"
      subTitle="Create and manage your promotional campaigns with a simple and intuitive interface."
    >
      <PromotionTable />
    </InsideLayout>
  );
};

export default Promotions;

import React from "react";

import InsideLayout from "@/components/layout/InsideLayout";
import { StockTable } from "@/components/Stock/Stock";

const Stock = () => {
  return (
    <InsideLayout title="Stock" subTitle="Create and manage Stock of products.">
      <StockTable />
    </InsideLayout>
  );
};

export default Stock;

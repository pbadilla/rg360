import { Link } from "react-router-dom";

import InsideLayout from "@/components/layout/InsideLayout";
import { StockTable } from "@/components/Tables/Stock";
import { Button } from "@/components/ui/button";

const Stocks = () => {
  return (
    <InsideLayout
      title="Stock Manager"
      subTitle="Efficiently manage your inventory with our powerful stock management
          system. Track products, monitor stock levels, and streamline your
          inventory operations."
    >
      <StockTable />
    </InsideLayout>
  );
};

export default Stocks;

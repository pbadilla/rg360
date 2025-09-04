import InsideLayout from "@/components/layout/InsideLayout";
import { StockTable } from "@/components/Stock/Stock";

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

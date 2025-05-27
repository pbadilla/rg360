import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import InsideLayout from "@/components/layout/InsideLayout";

const Stocks = () => {
  return (
    <InsideLayout
      title="Stock Manager"
      subTitle="Efficiently manage your inventory with our powerful stock management
          system. Track products, monitor stock levels, and streamline your
          inventory operations."
    >
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-12 px-4 text-center">
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/stocks/products">
            <Button size="lg" className="px-8">
              View Products
            </Button>
          </Link>
          <Link to="/stocks/dashboard">
            <Button size="lg" variant="outline" className="px-8">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </InsideLayout>
  );
};

export default Stocks;

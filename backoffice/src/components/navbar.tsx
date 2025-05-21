
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="flex h-16 items-center px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">StockManager</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Link to="/products">
            <Button variant="ghost">Products</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

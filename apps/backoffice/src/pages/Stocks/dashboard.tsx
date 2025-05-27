import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";
import { Box, PackageOpen, AlertCircle, DollarSign } from "lucide-react";
import { Product } from "@/types/stocks";
import { supabase } from "@/integrations/supabase/client";
import { CSVImport } from "@/components/csv-import";
import InsideLayout from "@/components/layout/InsideLayout";

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("products").select("*");

        if (error) throw error;

        // Convert Supabase data format to match our Product type
        const formattedData = data.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description || "",
          price: parseFloat(product.price),
          stock: product.stock,
          category: product.category,
          createdAt: new Date(product.created_at),
        }));

        setProducts(formattedData);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate stats from products
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStockItems = products.filter((product) => product.stock < 10).length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  return (
    <InsideLayout
      title="Dashboard"
      subTitle="Overview of your inventory and product statistics"
    >
      <div className="space-y-6">
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 text-red-800 rounded-md">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Error loading data</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Products"
              value={totalProducts}
              icon={<Box className="h-4 w-4" />}
            />
            <StatCard
              title="Total Stock"
              value={totalStock}
              icon={<PackageOpen className="h-4 w-4" />}
            />
            <StatCard
              title="Low Stock Items"
              value={lowStockItems}
              icon={<AlertCircle className="h-4 w-4" />}
              variant={lowStockItems > 0 ? "destructive" : "default"}
            />
            <StatCard
              title="Inventory Value"
              value={`$${totalValue.toFixed(2)}`}
              icon={<DollarSign className="h-4 w-4" />}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CSVImport />
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-80">
              {loading ? (
                <div className="h-full w-full bg-gray-100 rounded-md animate-pulse flex items-center justify-center text-gray-400">
                  Loading chart...
                </div>
              ) : products.length > 0 ? (
                <div className="text-center text-gray-500">
                  Category chart will be displayed here
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  No product data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </InsideLayout>
  );
};

export default Dashboard;

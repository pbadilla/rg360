import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
}

const mockProducts: Product[] = [
  { id: "1", name: "Margherita Pizza", price: 12.99, category: "food", stock: 15, description: "Classic pizza with tomato sauce and mozzarella" },
  { id: "2", name: "Pepperoni Pizza", price: 14.99, category: "food", stock: 12, description: "Pizza with pepperoni and cheese" },
  { id: "3", name: "Caesar Salad", price: 8.99, category: "food", stock: 20, description: "Fresh lettuce with caesar dressing" },
  { id: "4", name: "Coca Cola", price: 2.99, category: "beverage", stock: 50, description: "Classic cola drink" },
  { id: "5", name: "Smartphone", price: 699.99, category: "electronics", stock: 5, description: "Latest model smartphone" },
  { id: "6", name: "Wireless Headphones", price: 129.99, category: "electronics", stock: 8, description: "High-quality wireless headphones" },
  { id: "7", name: "Coffee", price: 3.99, category: "beverage", stock: 30, description: "Premium roasted coffee" },
  { id: "8", name: "Burger", price: 11.99, category: "food", stock: 18, description: "Beef burger with all the fixings" },
];

const Products = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "food": return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "beverage": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "electronics": return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (stock < 10) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { label: "In Stock", color: "bg-green-100 text-green-800" };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Product Management</h1>
        </div>
        <Button variant="default">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <Card className="p-6 bg-gradient-card border-0 shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-gradient-primary text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <Package className="h-8 w-8 opacity-80" />
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-success text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">In Stock</p>
                <p className="text-2xl font-bold">{products.filter(p => p.stock > 0).length}</p>
              </div>
              <Package className="h-8 w-8 opacity-80" />
            </div>
          </Card>
          
          <Card className="p-4 bg-yellow-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Low Stock</p>
                <p className="text-2xl font-bold">{products.filter(p => p.stock < 10 && p.stock > 0).length}</p>
              </div>
              <Package className="h-8 w-8 opacity-80" />
            </div>
          </Card>
          
          <Card className="p-4 bg-red-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Out of Stock</p>
                <p className="text-2xl font-bold">{products.filter(p => p.stock === 0).length}</p>
              </div>
              <Package className="h-8 w-8 opacity-80" />
            </div>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(product.category)}>
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge className={stockStatus.color}>
                      {stockStatus.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Products;
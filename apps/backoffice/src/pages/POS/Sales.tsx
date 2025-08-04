import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/pos/ProductCard";
import Cart from "@/components/pos/Cart";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const mockProducts: Product[] = [
  { id: "1", name: "Margherita Pizza", price: 12.99, category: "food", stock: 15 },
  { id: "2", name: "Pepperoni Pizza", price: 14.99, category: "food", stock: 12 },
  { id: "3", name: "Caesar Salad", price: 8.99, category: "food", stock: 20 },
  { id: "4", name: "Coca Cola", price: 2.99, category: "beverage", stock: 50 },
  { id: "5", name: "Smartphone", price: 699.99, category: "electronics", stock: 5 },
  { id: "6", name: "Wireless Headphones", price: 129.99, category: "electronics", stock: 8 },
  { id: "7", name: "Coffee", price: 3.99, category: "beverage", stock: 30 },
  { id: "8", name: "Burger", price: 11.99, category: "food", stock: 18 },
];

const sellers = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"];

const Sales = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSeller, setSelectedSeller] = useState<string>("");
  const { toast } = useToast();

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1 
      }]);
    }
    
    toast({
      title: "Item added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from cart.",
    });
  };

  const handleCheckout = () => {
    if (!selectedSeller) {
      toast({
        title: "Please select a seller",
        description: "You must select a seller before processing the payment.",
        variant: "destructive",
      });
      return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.08;
    
    toast({
      title: "Payment Processed!",
      description: `Sale completed for $${total.toFixed(2)} by ${selectedSeller}`,
    });
    
    setCart([]);
  };

  const categories = ["all", "food", "beverage", "electronics"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSeller} onValueChange={setSelectedSeller}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select Seller" />
            </SelectTrigger>
            <SelectContent>
              {sellers.map(seller => (
                <SelectItem key={seller} value={seller}>
                  {seller}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <Cart
          items={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onCheckout={handleCheckout}
          selectedSeller={selectedSeller}
        />
      </div>
    </div>
  );
};

export default Sales;
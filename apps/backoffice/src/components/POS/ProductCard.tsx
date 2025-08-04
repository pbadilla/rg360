import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-card border-0">
      <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-4xl">{product.category === "food" ? "🍕" : "📱"}</div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">{product.name}</h3>
        <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
        
        <Button 
          onClick={() => onAddToCart(product)}
          className="w-full"
          variant="success"
          size="sm"
          disabled={product.stock === 0}
        >
          <Plus className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
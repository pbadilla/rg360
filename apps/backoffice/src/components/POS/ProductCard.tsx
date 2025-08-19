import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-card border-0">
      <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center overflow-hidden">
        {product.images?.length ? (
          <img
            src={product.images[0].url || ""}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-4xl">IMAGE</div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">{product?.name}</h3>
        <p className="text-lg font-bold text-primary">
          ${product.price?.pvp ?? "N/A"}
        </p>
        <p className="text-xs text-muted-foreground">Stock: {product?.stock}</p>

        <Button
          onClick={() => onAddToCart(product)}
          className="w-full"
          variant="success"
          size="sm"
          disabled={product?.stock === 0}
        >
          <Plus className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;

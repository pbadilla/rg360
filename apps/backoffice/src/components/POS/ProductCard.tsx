import { Plus, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductImageCarousel from "@/components/Products/ProductImageCarousel";

import type { Product } from "@/types/product";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  disabled?: boolean;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  console.log("product", product);

  const firstImage =
    Array.isArray(product.images) && product.images.length > 0
      ? typeof product.images[0] === "string"
        ? product.images[0]
        : product.images[0]?.url
      : null;

  const isOutOfStock = product?.stock === 0;

  return (
    <Card
      className={cn(
        "p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-card border-0 relative",
        isOutOfStock && "opacity-50 pointer-events-none"
      )}
    >
      {/* Out of Stock Badge */}
      {isOutOfStock && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
          Out of Stock
        </div>
      )}

      <div className="aspect-square bg-muted rounded-lg mb-3 flex items-start justify-center overflow-hidden max-h-[255px] w-full">
          <ProductImageCarousel product={product} />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm h-13 overflow-hidden line-clamp-2 min-h-[40px]">
          {product?.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-primary">
            ${product.price?.pvp ?? "N/A"}
          </p>
          <p className="text-xs text-muted-foreground">
            Stock: {product?.stock}
          </p>
        </div>

        <Button
          onClick={() => onAddToCart(product)}
          className="w-full"
          variant={isOutOfStock ? "disabled" : "active"}
          size="sm"
          disabled={isOutOfStock}
        >
          <Plus className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;

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
  hasAddButton?: boolean;
}

const ProductCard = ({ product, onAddToCart, hasAddButton }: ProductCardProps) => {
  const isOutOfStock = product?.stock === 0;

  console.log("product", product);

  return (
    <Card
      className={cn(
        "hover:shadow-lg transition-all cursor-pointer bg-gradient-card border-0 relative",
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

        {hasAddButton && <Button
          onClick={() => onAddToCart(product)}
          className="w-full"
          variant={isOutOfStock ? "disabled" : "active"}
          size="sm"
          disabled={isOutOfStock}
        >
          <Plus className="h-4 w-4" />
          Add to Cart
        </Button>}
      </div>
    </Card>
  );
};

export default ProductCard;

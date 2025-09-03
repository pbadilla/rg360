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
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const firstImage =
    Array.isArray(product.images) && product.images.length > 0
      ? typeof product.images[0] === "string"
        ? product.images[0]
        : product.images[0]?.url
      : null;

  return (
    <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-card border-0">
      <div className="aspect-square bg-muted rounded-lg mb-3 flex items-start justify-center overflow-hidden max-h-[255px]">
        {product.images?.length ? (
          <ProductImageCarousel product={product} />
        ) : (
          <div className="text-4xl">IMAGE</div>
        )}
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
          variant={product?.stock === 0 ? "disabled" : "active"}
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

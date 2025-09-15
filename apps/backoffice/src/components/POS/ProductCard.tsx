import { useState } from "react";

import { QRCodeSVG } from "qrcode.react";

import { Plus, PlusCircle } from "lucide-react";

import ProductImageCarousel from "@/components/Products/ProductImageCarousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { Product } from "@/types/product";

import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onReserve?: (product: Product) => void;
  disabled?: boolean;
  hasAddButton?: boolean;
  allowReservation?: boolean;
}

const ProductCard = ({ product, onAddToCart, onReserve, hasAddButton, allowReservation }: ProductCardProps) => {
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

      <div className="aspect-square bg-muted rounded-lg mb-3 flex items-start justify-center overflow-hidden max-h-[255px] w-full relative">
          <ProductImageCarousel product={product} />
          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded">
            <QRCodeSVG
              value={product.id}
              size={70}
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
              includeMargin={false}
            />
          </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm h-13 overflow-hidden line-clamp-2 min-h-[40px]">
          {product?.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="bg-primary text-white font-semibold text-lg px-3 py-1 rounded-lg shadow-sm">
            {product.price?.pvp ?? "N/A"} €
          </span>
          <Badge variant="outline">Stock: {product?.stock} </Badge>
        </div>

        {hasAddButton && (
          <Button
            onClick={() =>
              isOutOfStock
                ? allowReservation && onReserve?.(product) // 👈 use parent callback
                : onAddToCart(product)
            }
            className="w-full"
            variant={
              isOutOfStock
                ? allowReservation
                  ? "reserve" // 👈 make a new variant
                  : "disabled"
                : "active"
            }
            size="sm"
            disabled={isOutOfStock && !allowReservation}
          >
            {isOutOfStock && allowReservation ? (
              <>
                <PlusCircle className="h-4 w-4" />
                Reserve / Notify Me
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;

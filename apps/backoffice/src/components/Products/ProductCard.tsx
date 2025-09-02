import type React from "react";
import { useState } from "react";

import { QRCodeSVG } from "qrcode.react";

import { Pen, Trash2 } from "lucide-react";

import { ProductVariations } from "@/components/Products/ProductVariations";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ColorBadge } from "@/components/ui/color-badge";
import { OfferBadge } from "@/components/ui/offer-badge";

import type { Product } from "@/types/product";

import ProductDeleteDialog from "./ProductDeleteDialog";
import ProductEditDialog from "./ProductEditDialog";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/productUtils";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
  isEditing?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleEdit = () => setIsEditDialogOpen(true);
  const handleDelete = () => setIsDeleteDialogOpen(true);
  const handleSave = (updatedProduct: Product) => {
    onEdit(updatedProduct);
    setIsEditDialogOpen(false);
  };
  const handleConfirmDelete = () => onDelete(product.id);

  const availableColors = product.colors ?? [];

  function ProductColors() {
    const [selectedColor, setSelectedColor] = useState(
      availableColors[0] ?? "",
    );

    if (availableColors.length === 0) return null;

    return (
      <div className="flex gap-2 flex-wrap">
        {availableColors.map((color) => (
          <ColorBadge
            key={color}
            color={color}
            selected={color === selectedColor}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
    );
  }

  const firstImage =
  Array.isArray(product.images) && product.images.length > 0
    ? typeof product.images[0] === "string"
      ? product.images[0]
      : product.images[0]?.url
    : null;

  function getStockLabel(stock: number) {
    if (stock === 0) return "Out of stock";
    if (stock <= 3) return `Only ${stock} left!`;
    return `${stock} left!`;
  }

  return (
    <>
      <Card
        className={cn(
          "overflow-hidden border card-transition cursor-pointer",
          isHovered ? "shadow-md translate-y-[-2px]" : "shadow-sm",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleEdit}
      >
        {/* IMAGE + QR + CATEGORY */}
        <div className="relative">
          <AspectRatio ratio={4 / 3} className="bg-muted">
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-muted/20 to-muted/5 transition-opacity duration-300",
                imageLoaded ? "opacity-0" : "opacity-100",
              )}
            />
            <img
              src={firstImage ?? "/placeholder.jpg"}
              alt={product.name ?? "Product"}
              onLoad={() => setImageLoaded(true)}
              className={cn(
                "object-cover w-full h-full transition-opacity duration-500",
                imageLoaded ? "opacity-100" : "opacity-0",
              )}
            />
          </AspectRatio>

          <Badge className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm text-foreground">
            {product.category?.name}
          </Badge>

          <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm p-1 rounded">
            <QRCodeSVG
              value={product.id}
              size={48}
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
              includeMargin={false}
            />
          </div>
        </div>

        {/* HEADER */}
        <CardHeader className="pb-3 space-y-1">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="text-sm space-y-1">
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Reference:</strong> {product.reference}
            </p>
            <p>
              <strong>EAN13:</strong> {product.ean13}
            </p>
          </CardDescription>

          <div className="flex flex-wrap justify-between items-center gap-2 pt-2">
            <span className="font-medium text-lg text-foreground">
              {typeof product?.price?.pvp === "number"
                ? formatPrice(product.price.pvp, "es-ES", "EUR")
                : "No price"}
            </span>
            <Badge variant="outline">
              Sizes: {product.sizes?.join(", ") || "N/A"}
            </Badge>
            <Badge variant="outline">Stock: {product.stock}</Badge>
          </div>
        </CardHeader>

        {/* COLORS + VARIATIONS */}
        <CardContent className="pb-4 space-y-2">
        <div className="flex items-center justify-between min-h-[20px]">
          <div className="flex gap-2 flex-wrap">
            {availableColors.length > 0 && <ProductColors />}
          </div>
          <OfferBadge type="limited">{getStockLabel(product.stock)}</OfferBadge>
        </div>

          {product.description && (
            <p className="text-muted-foreground text-sm line-clamp-2">
              {product.description}
            </p>
          )}

          {product.variations?.length > 0 && (
            <ProductVariations variations={product.variations} />
          )}
        </CardContent>

        {/* ACTIONS */}
        <CardFooter className="flex justify-between border-t pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
            className="w-full mr-2 transition-colors"
          >
            <Pen className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="w-full ml-2 text-destructive hover:text-destructive-foreground hover:bg-destructive transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </CardFooter>
      </Card>

      <ProductEditDialog
        product={product}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSave}
      />

      <ProductDeleteDialog
        productName={product.category?.name ?? product.name}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ProductCard;

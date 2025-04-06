
import React, { useState } from 'react';
import { Product } from '@/types/product';
import { formatPrice } from '@/utils/productUtils';
import { Pen, Trash2 } from 'lucide-react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ColorBadge } from '@/components/ui/color-badge';
import { OfferBadge } from '@/components/ui/offer-badge';

import ProductEditDialog from './ProductEditDialog';
import ProductDeleteDialog from './ProductDeleteDialog';

import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleSave = (updatedProduct: Product) => {
    onEdit(updatedProduct);
    setIsEditDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(product.id);
  };

  const mockAvailableColors = ["red", "blue", "black", "white"];

  function ProductColors() {
    const [selectedColor, setSelectedColor] = useState("red");
  
    return (
      <div className="flex gap-2">
        {mockAvailableColors.map((color) => (
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

  return (
    <>
      <Card 
        className={cn(
          "overflow-hidden border card-transition",
          isHovered ? "shadow-md translate-y-[-2px]" : "shadow-sm"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <AspectRatio ratio={4/3} className="bg-muted">
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t from-muted/20 to-muted/5 transition-opacity duration-300",
              imageLoaded ? "opacity-0" : "opacity-100"
            )} />
            <img
              src={product.image}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              className={cn(
                "object-cover w-full h-full transition-opacity duration-500",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
            />
          </AspectRatio>
          <Badge 
            className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm text-foreground"
          >
            {product.category}
          </Badge>
        </div>
        
        <CardHeader className="pb-3">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="space-y-1">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="font-medium text-lg text-foreground">
                {formatPrice(product.price, 'es-ES', 'EUR')}
              </span>
              <Badge variant="outline">
                Sizes: {product.sizes}
              </Badge>
              <Badge variant="outline">
                Stock: {product.stock}
              </Badge>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-2">
              {ProductColors()}
              <OfferBadge type="limited">Only 3 left!</OfferBadge>
            </div>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-4">
          <p className="text-muted-foreground line-clamp-2">{product.description}</p>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            className="w-full mr-2 transition-colors"
          >
            <Pen className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
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
        productName={product.name}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ProductCard;

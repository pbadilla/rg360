import { useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";

// Individual carousel image item
const CarouselImageItem = ({ src, alt }) => {
  const [isFallback, setIsFallback] = useState(!src);

  return (
    <div
      className={cn(
        "relative w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center bg-white ",
        isFallback
          ? "bg-gray-200 border-2 border-dashed border-gray-400"
          : "bg-muted"
      )}
    >
      <img
        src={src || "/noImage_logo.jpeg"}
        alt={alt}
        onError={(e) => {
          e.currentTarget.src = "/noImage_logo.jpeg";
          setIsFallback(true);
        }}
        className={cn(
          "w-full h-full object-cover transition-transform duration-500 transform hover:scale-105",
          isFallback && "opacity-70 grayscale"
        )}
      />

      {isFallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm font-semibold">
          No Image Available
        </div>
      )}
    </div>
  );
};

// Main Product Image Carousel
const ProductImageCarousel = ({ product }) => {
  // Handle comma-separated URLs and flatten into a single array
  const images =
    product.images?.length > 0
      ? product.images.flatMap((img) =>
          typeof img === "string" ? img.split(",") : [img?.url]
        )
      : [null]; // fallback triggers CarouselImageItem

  return (
    <div className="relative w-full max-w-[600px] mx-auto rounded-lg overflow-hidden bg-muted">
      <Carousel className="w-full">
        <CarouselContent className="flex gap-4">
          {images.map((img, i) => (
            <CarouselItem
              key={i}
              className="flex-shrink-0 w-full sm:w-[300px] md:w-[400px] lg:w-[450px]"
            >
              <CarouselImageItem src={img} alt={product.name ?? "Product"} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel navigation */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default ProductImageCarousel;

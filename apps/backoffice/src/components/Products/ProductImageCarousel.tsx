import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";

const ProductImageCarousel = ({ product }) => {
  const images =
    product.images?.length > 0
      ? product.images.map((img) =>
          typeof img === "string" ? img : img?.url
        )
      : ["/placeholder.jpg"];

  return (
    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-muted">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i}>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={img || "/placeholder.jpg"}
                  alt={product.name ?? "Product"}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  )}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default ProductImageCarousel;

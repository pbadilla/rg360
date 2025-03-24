
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useLazyImage } from '@/lib/animations';
import { ImageIcon, Upload } from 'lucide-react';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (image: string) => void;
  className?: string;
}

// Sample placeholder images for demo
const placeholderImages = [
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
];

export function ImageUpload({ currentImage, onImageChange, className }: ImageUploadProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const { isLoaded, src } = useLazyImage(currentImage || '');

  const handleImageSelect = (image: string) => {
    onImageChange(image);
    setIsSelecting(false);
  };

  return (
    <div className={cn("relative", className)}>
      {!isSelecting ? (
        <div
          className="relative w-24 h-24 rounded-lg overflow-hidden group cursor-pointer"
          onClick={() => setIsSelecting(true)}
        >
          {currentImage && isLoaded ? (
            <>
              <img 
                src={src} 
                alt="Promotion" 
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Upload className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted border border-border">
              <ImageIcon className="text-muted-foreground" size={24} />
            </div>
          )}
        </div>
      ) : (
        <div className="absolute top-0 left-0 z-10 bg-popover border border-border rounded-lg shadow-lg p-3 w-72 animate-scale-in">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Select an image</h4>
            <button 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setIsSelecting(false)}
            >
              &times;
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {placeholderImages.map((image, index) => (
              <div 
                key={index}
                className={cn(
                  "w-full aspect-square rounded-md overflow-hidden cursor-pointer border-2",
                  currentImage === image ? "border-accent" : "border-transparent"
                )}
                onClick={() => handleImageSelect(image)}
              >
                <img src={image} alt={`Option ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

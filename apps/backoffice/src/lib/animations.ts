
import { useEffect, useState } from 'react';

// Staggered animation for list items
export const useStaggeredAnimation = (itemCount: number, staggerMs: number = 50) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);

  useEffect(() => {
    const newVisibleItems = Array(itemCount).fill(false);
    setVisibleItems(newVisibleItems);

    const timeouts: NodeJS.Timeout[] = [];
    
    for (let i = 0; i < itemCount; i++) {
      const timeout = setTimeout(() => {
        setVisibleItems(prev => {
          const updated = [...prev];
          updated[i] = true;
          return updated;
        });
      }, staggerMs * i);
      
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [itemCount, staggerMs]);

  return visibleItems;
};

// For smooth image loading
export const useLazyImage = (src: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    setIsLoaded(false);
    setError(false);
    
    if (!src) return;

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setIsLoaded(true);
      setCurrentSrc(src);
    };
    
    img.onerror = () => {
      setError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { isLoaded, error, src: currentSrc };
};

// Animation delay utility
export const getStaggerDelay = (index: number, baseDelay: number = 50) => {
  return {
    animationDelay: `${baseDelay * index}ms`,
  };
};

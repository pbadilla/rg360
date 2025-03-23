
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductSearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  className?: string;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ searchTerm, onSearch, className }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Update local state when prop changes
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setLocalSearchTerm(newTerm);
    onSearch(newTerm);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        'relative w-full max-w-md mx-auto search-transition',
        isFocused && 'scale-[1.02]',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center rounded-full border bg-background px-3 py-2 shadow-sm transition-all',
          isFocused 
            ? 'border-primary ring-2 ring-primary/20' 
            : 'border-input'
        )}
      >
        <Search 
          className={cn(
            'h-5 w-5 text-muted-foreground transition-colors',
            isFocused && 'text-primary'
          )} 
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={localSearchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 border-0 bg-transparent px-3 py-1 text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        {localSearchTerm && (
          <button
            onClick={handleClearSearch}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;

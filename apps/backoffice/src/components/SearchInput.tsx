import type React from "react";
import { useEffect, useRef, useState } from "react";

import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface SearchInputProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearch,
  placeholder = "Search...",
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setLocalSearchTerm(newTerm);
    onSearch(newTerm);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm("");
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative w-full max-w-md mx-auto", className)}>
      <div
        className={cn(
          "flex items-center border bg-background px-2 py-1 transition-all rounded-md",
          isFocused ? "border-primary ring-1 ring-primary/20" : "border-input",
        )}
      >
        <Search
          className={cn(
            "h-5 w-5 text-muted-foreground transition-colors",
            isFocused && "text-primary",
          )}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={localSearchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="ml-2 h-8 w-full border-none bg-transparent px-1 text-sm placeholder:text-muted-foreground focus:outline-none"
        />
        {localSearchTerm && (
          <button
            onClick={handleClearSearch}
            className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;

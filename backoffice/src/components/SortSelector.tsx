
import React from 'react';
import { SortConfig, SortKey, SortOrder } from '@/types/product';
import { ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface SortSelectorProps {
  sortConfig: SortConfig;
  onSortChange: (config: SortConfig) => void;
  className?: string;
}

const sortOptions: { label: string; value: SortKey }[] = [
  { label: 'Name', value: 'name' },
  { label: 'Price', value: 'price' },
  { label: 'Category', value: 'category' },
  { label: 'Stock', value: 'stock' },
];

const SortSelector: React.FC<SortSelectorProps> = ({ 
  sortConfig, 
  onSortChange,
  className
}) => {
  const toggleDirection = (key: SortKey) => {
    const newDirection: SortOrder = 
      key === sortConfig.key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    
    onSortChange({ key, direction: newDirection });
  };

  const handleSelectOption = (key: SortKey) => {
    if (key === sortConfig.key) {
      toggleDirection(key);
    } else {
      onSortChange({ key, direction: 'asc' });
    }
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-1">
            {sortOptions.find(option => option.value === sortConfig.key)?.label || 'Sort'}
            {sortConfig.direction === 'asc' ? (
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 animate-fade-in">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSelectOption(option.value)}
              className={cn(
                "cursor-pointer flex justify-between items-center",
                sortConfig.key === option.value && "font-medium"
              )}
            >
              <span>{option.label}</span>
              {sortConfig.key === option.value && (
                sortConfig.direction === 'asc' ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortSelector;

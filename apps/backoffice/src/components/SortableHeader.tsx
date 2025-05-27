
import { cn } from "@/lib/utils";
import { SortDirection, SortField } from "@/types/cart";
import { ArrowDown, ArrowUp } from "lucide-react";

interface SortableHeaderProps {
  label: string;
  field: SortField;
  currentSort: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
  className?: string;
}

const SortableHeader = ({
  label,
  field,
  currentSort,
  direction,
  onSort,
  className
}: SortableHeaderProps) => {
  const isActive = currentSort === field;
  
  return (
    <th className={cn(
      "px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer select-none",
      isActive && "text-primary",
      className
    )}>
      <div 
        className="flex items-center space-x-1 transition-all-200 group"
        onClick={() => onSort(field)}
      >
        <span>{label}</span>
        <div className={cn(
          "transition-all-200 opacity-0",
          isActive && "opacity-100",
          !isActive && "group-hover:opacity-60"
        )}>
          {isActive && direction === 'asc' ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
        </div>
      </div>
    </th>
  );
};

export default SortableHeader;

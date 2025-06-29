import React from "react";
import { cn } from "@/lib/utils";
import SortIcon from "./SortIcon";

type SortDirection = "asc" | "desc" | null;

interface SortableColumnProps {
  label: string;
  sortKey: string;
  currentSortKey: string;
  direction: SortDirection;
  onSort?: (key: string) => void;
  className?: string;
}

const SortableColumn: React.FC<SortableColumnProps> = ({
  label,
  sortKey,
  currentSortKey,
  direction,
  onSort,
  className,
}) => {
  const isActive = sortKey === currentSortKey;
  const currentDirection = isActive ? direction : null;

  return (
    <th className={cn("px-4 py-3 font-medium text-left", className)}>
      <div
        className="sortable-header rounded-md px-2 py-1"
        onClick={() => onSort(sortKey)}
      >
        <span>{label}</span>
        <SortIcon
          direction={currentDirection}
          className={cn(
            isActive ? "opacity-100" : "opacity-50",
            "transition-opacity duration-200"
          )}
        />
      </div>
    </th>
  );
};

export default SortableColumn;

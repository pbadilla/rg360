import * as React from "react";
import { useMemo } from "react";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface BrandFilterProps {
  brands: string[];
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
}

export const BrandFilterDropdown: React.FC<BrandFilterProps> = ({
  brands,
  selectedBrands,
  toggleBrand,
}) => {
  // Combine all selected brands into a string
  const selectedLabel = useMemo(() => {
    if (selectedBrands.length === 0) return "Filter by Brand";

    // Join all brands with comma and trim extra spaces
    return selectedBrands.map(b => b.trim()).join(", ");
  }, [selectedBrands]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="primary"
          className="group flex items-center justify-between max-w-[220px] truncate"
          title={selectedLabel}
        >
          <span className="truncate">{selectedLabel}</span>
          <ChevronDown className="ml-2 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 p-2">
        <DropdownMenuLabel>Brands</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {brands.map((brand) => (
          <DropdownMenuCheckboxItem
            key={brand}
            checked={selectedBrands.includes(brand)}
            onCheckedChange={() => toggleBrand(brand)}
          >
            {brand}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

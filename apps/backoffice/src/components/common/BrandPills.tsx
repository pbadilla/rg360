import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge"; // shadcn badge
import { Button } from "@/components/ui/button";

type BrandPillsProps = {
  selectedBrands: string[];
  onRemove: (brand: string) => void;
};

const BrandPills: React.FC<BrandPillsProps> = ({ selectedBrands, onRemove }) => {
  if (selectedBrands.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {selectedBrands.map((brand) => (
        <Badge
          key={brand}
          variant="secondary"
          className="flex items-center gap-1 px-3 py-1 rounded-full"
        >
          {brand}
        <X size={14} onClick={() => onRemove(brand)} />
        </Badge>
      ))}
    </div>
  );
};

export default BrandPills;

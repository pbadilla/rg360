import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function ProductVariations({ variations }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = (e) => {
    e.stopPropagation(); // Prevent modal open
    setIsExpanded((prev) => !prev);
  };

  if (!variations?.length) return null;

  return (
    <div
      className="text-sm text-muted-foreground"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={toggle}
        className="flex items-center gap-1 font-semibold mb-2"
      >
        Variations
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 transition-transform" />
        ) : (
          <ChevronDown className="w-4 h-4 transition-transform" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-wrap gap-2">
          {variations.map((variation, index) => (
            <div
              key={index}
              className="bg-muted px-3 py-1 rounded-full text-xs text-foreground border border-border"
            >
              {variation.color} — Sizes: {variation.sizes?.join(", ") || "N/A"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

import { ExternalLink, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { BannerPromotion } from "@/pages/Index";

interface ActiveBannerProps {
  promotion: BannerPromotion;
}

export const ActiveBanner = ({ promotion }: ActiveBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleCtaClick = () => {
    if (promotion.ctaLink) {
      window.open(promotion.ctaLink, "_blank");
    }
  };

  return (
    <div
      className="relative w-full py-4 px-6 text-center shadow-md"
      style={{
        backgroundColor: promotion.backgroundColor,
        color: promotion.textColor,
      }}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h2 className="font-bold text-xl mb-2">{promotion.title}</h2>
          <p className="text-lg opacity-90 mb-3">{promotion.description}</p>
          {promotion.ctaText && (
            <Button
              onClick={handleCtaClick}
              className="font-medium hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: "transparent",
                color: promotion.textColor,
                border: `2px solid ${promotion.textColor}`,
              }}
            >
              {promotion.ctaText}
              {promotion.ctaLink && <ExternalLink className="w-4 h-4 ml-2" />}
            </Button>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="ml-4 hover:opacity-70"
          style={{ color: promotion.textColor }}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

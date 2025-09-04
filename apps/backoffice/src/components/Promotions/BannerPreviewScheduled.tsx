import { ExternalLink, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { BannerPromotion } from "@/pages/Promotions/ScheduledPromotion";

interface BannerPreviewProps {
  promotion: BannerPromotion;
  onClose: () => void;
}

export const BannerPreview = ({ promotion, onClose }: BannerPreviewProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="dark:text-white">Banner Preview</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="dark:text-gray-400 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How it will appear on your website:
            </h3>
            <div
              className="p-6 rounded-lg text-center shadow-sm border dark:border-gray-600"
              style={{
                backgroundColor: promotion.backgroundColor,
                color: promotion.textColor,
              }}
            >
              <h2 className="font-bold text-2xl mb-3">{promotion.title}</h2>
              <p className="text-lg mb-4 opacity-90">{promotion.description}</p>
              {promotion.ctaText && (
                <button
                  className="px-6 py-3 rounded-lg border-2 font-medium hover:opacity-80 transition-opacity inline-flex items-center gap-2"
                  style={{
                    borderColor: promotion.textColor,
                    color: promotion.textColor,
                  }}
                >
                  {promotion.ctaText}
                  {promotion.ctaLink && <ExternalLink className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t dark:border-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                Start Date
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {promotion.startDate.toLocaleDateString()} at{" "}
                {promotion.startDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                End Date
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {promotion.endDate.toLocaleDateString()} at{" "}
                {promotion.endDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {promotion.ctaLink && (
              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  CTA Link
                </h4>
                <p className="text-gray-600 dark:text-gray-400 break-all">
                  {promotion.ctaLink}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t dark:border-gray-600">
            <Button onClick={onClose}>Close Preview</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

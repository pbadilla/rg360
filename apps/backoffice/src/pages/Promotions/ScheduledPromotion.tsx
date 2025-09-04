import { useEffect, useState } from "react";

import { Calendar, Edit, Eye, Plus, Trash2 } from "lucide-react";

import InsideLayout from "@/components/layout/InsideLayout";
import { ActiveBanner } from "@/components/Promotions/ActiveBanner";
import { BannerForm } from "@/components/Promotions/BannerForm";
import { BannerPreview } from "@/components/Promotions/BannerPreviewScheduled";
import { ScheduleCalendar } from "@/components/Promotions/ScheduleCalendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePromotionStore } from "@/store/usePromotionStore";

export interface BannerPromotion {
  id: string;
  title: string;
  description: string;
  backgroundColor: string;
  textColor: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  ctaText?: string;
  ctaLink?: string;
}

const ScheduledPromotion = () => {
  const { entities: promotionsScheduled } = usePromotionStore();

  const [promotions, setPromotions] = useState<BannerPromotion[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPromotion, setEditingPromotion] =
    useState<BannerPromotion | null>(null);
  const [previewPromotion, setPreviewPromotion] =
    useState<BannerPromotion | null>(null);
  const [activeView, setActiveView] = useState<"list" | "calendar">("list");

  // Map store data to BannerPromotion type
  useEffect(() => {
    if (!promotionsScheduled || promotionsScheduled.length === 0) return;

    const mapped = promotionsScheduled.map((promo) => ({
      id: promo._id,
      title: promo.title,
      description: promo.description,
      backgroundColor: promo.backgroundColor,
      textColor: promo.textColor,
      startDate: new Date(promo.schedule.start),
      endDate: new Date(promo.schedule.end),
      isActive: false, // will be computed in the next effect
      ctaText: promo.cta?.text,
      ctaLink: promo.cta?.link,
    }));

    setPromotions(mapped);
  }, [promotionsScheduled]);

  // Check for active promotions
  useEffect(() => {
    const checkActivePromotions = () => {
      const now = new Date();
      setPromotions((prev) =>
        prev.map((promo) => ({
          ...promo,
          isActive: now >= promo.startDate && now <= promo.endDate,
        }))
      );
    };

    checkActivePromotions();
    const interval = setInterval(checkActivePromotions, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleSavePromotion = (
    promotion: Omit<BannerPromotion, "id" | "isActive">
  ) => {
    if (editingPromotion) {
      setPromotions((prev) =>
        prev.map((p) =>
          p.id === editingPromotion.id
            ? { ...promotion, id: editingPromotion.id, isActive: false }
            : p
        )
      );
      setEditingPromotion(null);
    } else {
      const newPromotion: BannerPromotion = {
        ...promotion,
        id: Date.now().toString(),
        isActive: false,
      };
      setPromotions((prev) => [...prev, newPromotion]);
    }
    setShowForm(false);
  };

  const handleDeletePromotion = (id: string) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
  };

  const getStatusBadge = (promotion: BannerPromotion) => {
    const now = new Date();
    if (promotion.isActive) {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          Active
        </span>
      );
    } else if (now < promotion.startDate) {
      return (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          Scheduled
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
          Expired
        </span>
      );
    }
  };

  const activePromotion = promotions.find((p) => p.isActive);

  return (
    <InsideLayout
      title="Promotion Schedule"
      subTitle="Manage your promotional banners with ease."
    >
      {activePromotion && <ActiveBanner promotion={activePromotion} />}
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Promotion
        </Button>
        <Button
          variant={activeView === "list" ? "default" : "outline"}
          onClick={() => setActiveView("list")}
        >
          List View
        </Button>
        <Button
          variant={activeView === "calendar" ? "default" : "outline"}
          onClick={() => setActiveView("calendar")}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Calendar View
        </Button>
      </div>

      {/* Main Content */}
      {activeView === "list" ? (
        <div className="grid gap-6">
          {promotions.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-gray-400 dark:text-gray-600 mb-4">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No promotions yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Create your first banner promotion to get started
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Promotion
                </Button>
              </CardContent>
            </Card>
          ) : (
            promotions.map((promotion) => (
              <Card
                key={promotion.id}
                className="hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl dark:text-white">
                        {promotion.title}
                      </CardTitle>
                      <CardDescription className="mt-1 dark:text-gray-400">
                        {promotion.description}
                      </CardDescription>
                    </div>
                    {getStatusBadge(promotion)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Start Date
                      </p>
                      <p className="font-medium dark:text-white">
                        {promotion.startDate.toLocaleDateString()}{" "}
                        {promotion.startDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        End Date
                      </p>
                      <p className="font-medium dark:text-white">
                        {promotion.endDate.toLocaleDateString()}{" "}
                        {promotion.endDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewPromotion(promotion)}
                      className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingPromotion(promotion);
                        setShowForm(true);
                      }}
                      className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePromotion(promotion.id)}
                      className="text-red-600 hover:text-red-700 hover:border-red-300 dark:text-red-400 dark:hover:text-red-300 dark:border-gray-600 dark:hover:border-red-400"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      ) : (
        <ScheduleCalendar promotions={promotions} />
      )}

      {/* Banner Form Modal */}
      {showForm && (
        <BannerForm
          promotion={editingPromotion}
          onSave={handleSavePromotion}
          onCancel={() => {
            setShowForm(false);
            setEditingPromotion(null);
          }}
        />
      )}

      {/* Banner Preview Modal */}
      {previewPromotion && (
        <BannerPreview
          promotion={previewPromotion}
          onClose={() => setPreviewPromotion(null)}
        />
      )}
    </InsideLayout>
  );
};

export default ScheduledPromotion;

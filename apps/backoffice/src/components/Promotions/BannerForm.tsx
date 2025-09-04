import { useEffect, useState } from "react";

import { format } from "date-fns";

import { CalendarIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import type { BannerPromotion } from "@/pages/Promotions/ScheduledPromotion";

import { cn } from "@/lib/utils";

interface BannerFormProps {
  promotion?: BannerPromotion | null;
  onSave: (promotion: Omit<BannerPromotion, "id" | "isActive">) => void;
  onCancel: () => void;
}

export const BannerForm = ({
  promotion,
  onSave,
  onCancel,
}: BannerFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    backgroundColor: "#3B82F6",
    textColor: "#FFFFFF",
    startDate: new Date(),
    endDate: new Date(),
    ctaText: "",
    ctaLink: "",
  });

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  useEffect(() => {
    if (promotion) {
      setFormData({
        title: promotion.title,
        description: promotion.description,
        backgroundColor: promotion.backgroundColor,
        textColor: promotion.textColor,
        startDate: promotion.startDate,
        endDate: promotion.endDate,
        ctaText: promotion.ctaText || "",
        ctaLink: promotion.ctaLink || "",
      });
      setStartTime(format(promotion.startDate, "HH:mm"));
      setEndTime(format(promotion.endDate, "HH:mm"));
    }
  }, [promotion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Combine date and time
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startDateTime = new Date(formData.startDate);
    startDateTime.setHours(startHour, startMinute, 0, 0);

    const endDateTime = new Date(formData.endDate);
    endDateTime.setHours(endHour, endMinute, 0, 0);

    onSave({
      ...formData,
      startDate: startDateTime,
      endDate: endDateTime,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {promotion ? "Edit Promotion" : "Create New Promotion"}
              </CardTitle>
              <CardDescription>
                Set up your banner promotion details and schedule
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Promotion Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter promotion title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter promotion description"
                  required
                />
              </div>
            </div>

            {/* Styling */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="backgroundColor">Background Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={formData.backgroundColor}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        backgroundColor: e.target.value,
                      }))
                    }
                    className="w-12 h-10 p-1 border rounded"
                  />
                  <Input
                    value={formData.backgroundColor}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        backgroundColor: e.target.value,
                      }))
                    }
                    placeholder="#3B82F6"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="textColor">Text Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="textColor"
                    type="color"
                    value={formData.textColor}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        textColor: e.target.value,
                      }))
                    }
                    className="w-12 h-10 p-1 border rounded"
                  />
                  <Input
                    value={formData.textColor}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        textColor: e.target.value,
                      }))
                    }
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ctaText">CTA Button Text (Optional)</Label>
                <Input
                  id="ctaText"
                  value={formData.ctaText}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ctaText: e.target.value,
                    }))
                  }
                  placeholder="Learn More"
                />
              </div>

              <div>
                <Label htmlFor="ctaLink">CTA Link (Optional)</Label>
                <Input
                  id="ctaLink"
                  value={formData.ctaLink}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ctaLink: e.target.value,
                    }))
                  }
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Schedule</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date & Time</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "flex-1 justify-start text-left font-normal",
                            !formData.startDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.startDate
                            ? format(formData.startDate, "MMM dd, yyyy")
                            : "Pick date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) =>
                            date &&
                            setFormData((prev) => ({
                              ...prev,
                              startDate: date,
                            }))
                          }
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-32"
                    />
                  </div>
                </div>

                <div>
                  <Label>End Date & Time</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "flex-1 justify-start text-left font-normal",
                            !formData.endDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.endDate
                            ? format(formData.endDate, "MMM dd, yyyy")
                            : "Pick date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(date) =>
                            date &&
                            setFormData((prev) => ({ ...prev, endDate: date }))
                          }
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-32"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <Label>Preview</Label>
              <div
                className="p-4 rounded-lg text-center"
                style={{
                  backgroundColor: formData.backgroundColor,
                  color: formData.textColor,
                }}
              >
                <h3 className="font-bold text-lg mb-2">
                  {formData.title || "Your Title Here"}
                </h3>
                <p className="mb-3">
                  {formData.description || "Your description here"}
                </p>
                {formData.ctaText && (
                  <button
                    className="px-4 py-2 rounded border-2 font-medium hover:opacity-80 transition-opacity"
                    style={{
                      borderColor: formData.textColor,
                      color: formData.textColor,
                    }}
                    type="button"
                  >
                    {formData.ctaText}
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {promotion ? "Update Promotion" : "Create Promotion"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

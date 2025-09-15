import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // for click events
import FullCalendar from "@fullcalendar/react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { BannerPromotion } from "@/pages/Promotions/ScheduledPromotion";

interface ScheduleCalendarProps {
  promotions: BannerPromotion[];
}

export const ScheduleCalendar = ({ promotions }: ScheduleCalendarProps) => {
  const today = new Date();

  // Map promotions to FullCalendar events using Tailwind classes
  const events = promotions.map((promo) => ({
    id: promo.id,
    title: promo.title,
    start: promo.startDate,
    end: promo.endDate,
    classNames: promo.isActive
      ? ["bg-green-500 text-white dark:bg-green-700"]
      : new Date() < promo.startDate
      ? ["bg-blue-500 text-white dark:bg-blue-700"]
      : ["bg-gray-500 text-white dark:bg-gray-600"],
    extendedProps: {
      status: promo.isActive
        ? "Active"
        : new Date() < promo.startDate
        ? "Scheduled"
        : "Expired",
    },
  }));


  return (
    <div className="space-y-6">
      {/* Calendar */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="min-h-[40px]">
          <CardTitle className="text-center dark:text-white">
            Promotion Calendar
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Legend above the calendar */}
          <div className="flex flex-wrap gap-4 mb-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 dark:bg-green-700 rounded"></div>
              <span className="text-sm dark:text-white">Active Promotion</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 dark:bg-blue-700 rounded"></div>
              <span className="text-sm dark:text-white">Scheduled Promotion</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-500 dark:bg-gray-600 rounded"></div>
              <span className="text-sm dark:text-white">Expired Promotion</span>
            </div>
          </div>

          {/* FullCalendar component */}
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventContent={(arg) => {
              const status = arg.event.extendedProps.status;
              const statusColor =
                status === "Active"
                  ? "text-green-800 dark:text-green-400"
                  : status === "Scheduled"
                  ? "text-blue-800 dark:text-blue-400"
                  : "text-gray-800 dark:text-gray-300";
              return (
                <div className={`text-xs truncate ${statusColor}`} title={arg.event.title}>
                  {arg.event.title}
                </div>
              );
            }}
            height={500}
          />
        </CardContent>
      </Card>

      {/* Upcoming Promotions */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg dark:text-white">Upcoming This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {promotions
              .filter(
                (p) =>
                  p.startDate.getMonth() === today.getMonth() &&
                  p.startDate.getFullYear() === today.getFullYear() &&
                  p.startDate >= today
              )
              .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
              .map((promotion) => (
                <div
                  key={promotion.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium dark:text-white">{promotion.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Starts {promotion.startDate.toLocaleDateString()} at{" "}
                      {promotion.startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <Badge variant="secondary">Scheduled</Badge>
                </div>
              ))}
            {promotions.filter(
              (p) =>
                p.startDate.getMonth() === today.getMonth() &&
                p.startDate.getFullYear() === today.getFullYear() &&
                p.startDate >= today
            ).length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No upcoming promotions this month
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BannerPromotion } from "@/pages/Index";

interface ScheduleCalendarProps {
  promotions: BannerPromotion[];
}

export const ScheduleCalendar = ({ promotions }: ScheduleCalendarProps) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Generate calendar days
  const calendarDays = [];

  // Empty cells for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Get promotions for a specific date
  const getPromotionsForDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return promotions.filter((promotion) => {
      const startDate = new Date(
        promotion.startDate.getFullYear(),
        promotion.startDate.getMonth(),
        promotion.startDate.getDate()
      );
      const endDate = new Date(
        promotion.endDate.getFullYear(),
        promotion.endDate.getMonth(),
        promotion.endDate.getDate()
      );
      return date >= startDate && date <= endDate;
    });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-center dark:text-white">
            {monthNames[currentMonth]} {currentYear}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day) => (
              <div
                key={day}
                className="p-2 text-center font-medium text-gray-500 dark:text-gray-400 text-sm"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={index} className="h-24"></div>;
              }

              const dayPromotions = getPromotionsForDate(day);
              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();

              return (
                <div
                  key={day}
                  className={`h-24 p-1 border rounded-lg transition-colors ${
                    isToday
                      ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700"
                      : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div
                    className={`text-sm font-medium mb-1 ${
                      isToday
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayPromotions.slice(0, 2).map((promotion, idx) => {
                      const statusColor = promotion.isActive
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : new Date() < promotion.startDate
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
                      return (
                        <div
                          key={idx}
                          className={`text-xs p-1 rounded truncate ${statusColor}`}
                          title={promotion.title}
                        >
                          {promotion.title}
                        </div>
                      );
                    })}
                    {dayPromotions.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{dayPromotions.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg dark:text-white">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 dark:bg-green-900/30 rounded"></div>
              <span className="text-sm dark:text-gray-300">
                Active Promotion
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900/30 rounded"></div>
              <span className="text-sm dark:text-gray-300">
                Scheduled Promotion
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 dark:bg-gray-700 rounded"></div>
              <span className="text-sm dark:text-gray-300">
                Expired Promotion
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Promotions */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg dark:text-white">
            Upcoming This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {promotions
              .filter((p) => {
                const startDate = p.startDate;
                return (
                  startDate.getMonth() === currentMonth &&
                  startDate.getFullYear() === currentYear &&
                  startDate >= today
                );
              })
              .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
              .map((promotion) => (
                <div
                  key={promotion.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium dark:text-white">
                      {promotion.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Starts {promotion.startDate.toLocaleDateString()} at{" "}
                      {promotion.startDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <Badge variant="secondary">Scheduled</Badge>
                </div>
              ))}
            {promotions.filter((p) => {
              const startDate = p.startDate;
              return (
                startDate.getMonth() === currentMonth &&
                startDate.getFullYear() === currentYear &&
                startDate >= today
              );
            }).length === 0 && (
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

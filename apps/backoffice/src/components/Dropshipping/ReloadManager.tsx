import React, { useState } from "react";

import { Calendar, Clock, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";

export const ReloadManager = () => {
  const [scheduleTime, setScheduleTime] = useState("");
  const [scheduleType, setScheduleType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleManualReload = async () => {
    setIsLoading(true);
    console.log("Starting manual reload...");

    // Simulate reload process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Reload Complete",
        description: "Manual reload has been successfully executed.",
      });
      console.log("Manual reload completed");
    }, 3000);
  };

  const handleScheduleReload = () => {
    if (!scheduleTime || !scheduleType) {
      toast({
        title: "Missing Information",
        description: "Please select both time and schedule type.",
        variant: "destructive",
      });
      return;
    }

    console.log(
      `Scheduling reload for ${scheduleTime} with type: ${scheduleType}`,
    );
    toast({
      title: "Reload Scheduled",
      description: `Reload scheduled for ${scheduleTime} (${scheduleType})`,
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Upload className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Reload Manager</h2>
      </div>

      <div className="space-y-6">
        {/* Manual Reload Section */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Manual Reload</h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Trigger an immediate reload of all product data and inventory.
            </p>
            <Button
              onClick={handleManualReload}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Reloading..." : "Start Manual Reload"}
            </Button>
          </div>
        </div>

        {/* Scheduled Reload Section */}
        <div className="border-t pt-6">
          <h3 className="font-medium text-gray-900 mb-3">Schedule Reload</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="schedule-time" className="text-sm font-medium">
                Time
              </Label>
              <Input
                id="schedule-time"
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="schedule-type" className="text-sm font-medium">
                Frequency
              </Label>
              <Select value={scheduleType} onValueChange={setScheduleType}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="custom">Custom Interval</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleScheduleReload}
              variant="outline"
              className="w-full"
            >
              Schedule Reload
            </Button>
          </div>
        </div>

        {/* Current Schedule Display */}
        <div className="border-t pt-6">
          <h3 className="font-medium text-gray-900 mb-3">Active Schedules</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Daily at 2:00 AM</span>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Every 6 hours</span>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Active
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

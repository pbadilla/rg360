import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, Truck } from "lucide-react";
import ShippingMethodsList from "./ShippingMethodsList";
import TrackingList from "./TrackingList";

export interface ShippingMethod {
  id: string;
  name: string;
  carrier: string;
  estimatedDays: number;
  cost: number;
  isActive: boolean;
  description?: string;
}

export interface TrackingEntry {
  id: string;
  trackingNumber: string;
  shippingMethodId: string;
  customerName: string;
  destination: string;
  status: "pending" | "in_transit" | "delivered" | "exception";
  createdAt: Date;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
}

const ShippingManager = () => {
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([
    {
      id: "1",
      name: "Standard Shipping",
      carrier: "FedEx",
      estimatedDays: 5,
      cost: 9.99,
      isActive: true,
      description: "Standard ground shipping",
    },
    {
      id: "2",
      name: "Express Shipping",
      carrier: "UPS",
      estimatedDays: 2,
      cost: 24.99,
      isActive: true,
      description: "Express overnight delivery",
    },
  ]);

  const [trackingEntries, setTrackingEntries] = useState<TrackingEntry[]>([
    {
      id: "1",
      trackingNumber: "TRK123456789",
      shippingMethodId: "1",
      customerName: "John Doe",
      destination: "New York, NY",
      status: "in_transit",
      createdAt: new Date("2024-06-15"),
      estimatedDelivery: new Date("2024-06-20"),
    },
    {
      id: "2",
      trackingNumber: "TRK987654321",
      shippingMethodId: "2",
      customerName: "Jane Smith",
      destination: "Los Angeles, CA",
      status: "delivered",
      createdAt: new Date("2024-06-16"),
      estimatedDelivery: new Date("2024-06-18"),
      actualDelivery: new Date("2024-06-17"),
    },
  ]);

  return (
    <div className="min-h-screen p-0">
      <div className="mx-auto">
        <Tabs defaultValue="methods" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger
              value="methods"
              className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              <Package className="h-4 w-4" />
              Shipping Methods
            </TabsTrigger>
            <TabsTrigger
              value="tracking"
              className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              <Truck className="h-4 w-4" />
              Tracking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="methods" className="mt-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Shipping Methods</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage your available shipping options and carriers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ShippingMethodsList
                  shippingMethods={shippingMethods}
                  setShippingMethods={setShippingMethods}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="mt-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Package Tracking</CardTitle>
                <CardDescription className="text-slate-400">
                  Monitor and manage package shipments and deliveries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TrackingList
                  trackingEntries={trackingEntries}
                  setTrackingEntries={setTrackingEntries}
                  shippingMethods={shippingMethods}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ShippingManager;

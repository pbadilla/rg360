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
import { useShippingMethodStore } from "@/store/useShippingMethodStore";

const ShippingManager = () => {
  const {
    entities: shippingMethods,
    isLoading: isLoadingShipping,
    addEntity: addShippingMethod,
    editEntity: updateShippingMethod,
    deleteEntity: deleteShippingMethod,
  } = useShippingMethodStore();

  console.log("entities: shippingMethods", shippingMethods);

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
                {isLoadingShipping ? (
                  <div className="text-slate-400">Loading...</div>
                ) : (
                  <ShippingMethodsList
                    shippingMethods={shippingMethods}
                    addShippingMethod={addShippingMethod}
                    updateShippingMethod={updateShippingMethod}
                    deleteShippingMethod={deleteShippingMethod}
                  />
                )}
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
                  trackingEntries={[]} // replace with store data later
                  setTrackingEntries={() => {}}
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

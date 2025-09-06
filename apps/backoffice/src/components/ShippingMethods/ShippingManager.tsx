import { Package, Truck } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useCarriersStore } from "@/store/useCarriersStore";
import { useShippingMethodStore } from "@/store/useShippingMethodStore";

import ShippingMethodsList from "./ShippingMethodsList";
import CarrierList from "./CarrierList";

const ShippingManager = () => {
  const {
    entities: shippingMethods,
    isLoading: isLoadingShipping,
    addEntity: addShippingMethod,
    editEntity: updateShippingMethod,
    deleteEntity: deleteShippingMethod,
  } = useShippingMethodStore();

  const {
    entities: carriers,
    isLoading: isLoadingCarrier,
    addEntity: addCarrierMethod,
    editEntity: updateCarrierMethod,
    deleteEntity: deleteCarrierMethod,
  } = useCarriersStore();

  console.log("carriers");

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
              Carriers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="methods" className="mt-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="mt-4">
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
              <CardContent className="mt-4">
                <CarrierList
                  carrierEntries={carriers} // replace with store data later
                  setCarrierEntries={() => {}}
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

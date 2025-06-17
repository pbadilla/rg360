import React from "react";
import { ProductList } from "@/components/Dropshipping/ProductList";
import { SystemStatus } from "@/components/Dropshipping/SystemStatus";
import { ReloadManager } from "@/components/Dropshipping/ReloadManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Activity, RefreshCw } from "lucide-react";

const DropshippingDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dropshipping Manager
          </h1>
          <p className="text-gray-600">
            Manage your products, monitor system status, and control reload
            schedules
          </p>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="status" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              System Status
            </TabsTrigger>
            <TabsTrigger value="reload" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Reload Manager
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <ProductList />
          </TabsContent>

          <TabsContent value="status" className="mt-6">
            <SystemStatus />
          </TabsContent>

          <TabsContent value="reload" className="mt-6">
            <ReloadManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DropshippingDashboard;

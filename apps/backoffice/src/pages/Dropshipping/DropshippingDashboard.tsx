import React from "react";
import { ProductList } from "@/components/Dropshipping/ProductList";
import { SystemStatus } from "@/components/Dropshipping/SystemStatus";
import { ReloadManager } from "@/components/Dropshipping/ReloadManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Activity, RefreshCw } from "lucide-react";

const DropshippingDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dropshipping Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your products, monitor system status, and control reload
            schedules
          </p>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-slate-800 shadow-sm">
            <TabsTrigger
              value="products"
              className="flex items-center gap-2 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger
              value="status"
              className="flex items-center gap-2 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <Activity className="h-4 w-4" />
              System Status
            </TabsTrigger>
            <TabsTrigger
              value="reload"
              className="flex items-center gap-2 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
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

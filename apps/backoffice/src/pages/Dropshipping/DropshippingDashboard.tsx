import React from "react";

import { Activity, Package, RefreshCw } from "lucide-react";

import { ProductList } from "@/components/Dropshipping/ProductList";
import { ReloadManager } from "@/components/Dropshipping/ReloadManager";
import { SystemStatus } from "@/components/Dropshipping/SystemStatus";
import InsideLayout from "@/components/layout/InsideLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DropshippingDashboard = () => {
  return (
    <InsideLayout
      title=" Dropshipping Manager"
      subTitle=" Manage your products, monitor system status, and control reload schedules"
    >
      <div className="min-h-screen p-0">
        <div className="mx-auto">
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
    </InsideLayout>
  );
};

export default DropshippingDashboard;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/hooks/use-theme";

import Index from "@/pages/Index";

import AbandonedCarts from '@/pages/AbandonedCarts';
import BulkActions from "@/pages/BulkActions";
import Dropshipping from "@/pages/Dropshipping";
import Logistics from "@/pages/Logistics";
import NotFound from "@/pages/NotFound";
import Orders from "@/pages/Orders";
import Payments from "@/pages/Payments";
import ProductsListWrapper from "@/pages/ProductsListWrapper";
import Promotions from "@/pages/Promotions";
import Transports from "@/pages/Transports";
import Users from "@/pages/Users";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Index />} />              
              {/* Products Routes */}
              <Route path="/products/*" element={<ProductsListWrapper />} />              
              {/* Orders Routes */}
              <Route path="/orders" element={<Orders />} />             
              {/* Users Routes */}
              <Route path="/users" element={<Users />} />              
              {/* Promotions Routes */}
              <Route path="/promotions" element={<Promotions />} />              
              {/* Abandoned Carts Routes */}
              <Route path="/abandoned-carts/*" element={<AbandonedCarts />} />              
              {/* Logistics Routes */}
              <Route path="/logistics/*" element={<Logistics />} />              
              {/* Transports Routes */}
              <Route path="/transports/*" element={<Transports />} />             
              {/* Payments Routes */}
              <Route path="/payments/*" element={<Payments />} />             
              {/* Dropshipping Routes */}
              <Route path="/dropshipping/*" element={<Dropshipping />} />       
              {/* Bulk Actions Routes */}
              <Route path="/bulk-actions/*" element={<BulkActions />} />             
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

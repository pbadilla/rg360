import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/hooks/use-theme";

import Index from "@/pages/Index";
import AbandonedCarts from "@/pages/AbandonedCarts";
import BulkActions from "@/pages/BulkActions";
import Dropshipping from "@/pages/Dropshipping";
import Inventory from "@/pages/Inventary";
import Login from "@/pages/Login";
import Logistics from "@/pages/Logistics";
import MicroBulkActions from "@/pages/MicroBulkActions";
import NotFound from "@/pages/NotFound";
import Orders from "@/pages/Orders";
import Payments from "@/pages/Payments";
import ProductsListWrapper from "@/pages/ProductsListWrapper";
import Promotions from "@/pages/Promotions";
import RollerbladeBulkActions from "@/pages/RollerbladeBulkActions";
import Transports from "@/pages/Transports";
import UniverskateBulkActions from "@/pages/UniverskateBulkActions";
import Users from "@/pages/Users";

import { ProtectedRoute } from "@/routes/protectedRoutes";
import { PublicRoute } from "@/routes/publicRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Route (no token required) */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            {/* Routes WITH MainLayout */}
            <Route element={<ProtectedRoute><MainLayout><Outlet /></MainLayout></ProtectedRoute>}>
              <Route path="/index" element={<Index />} />
              {/* Index Routes */}              
              {/* Products Routes */}
              <Route path="/products/*" element={<ProductsListWrapper />} />
              {/* Inventory Routes */}
              <Route path="/products/inventory/*" element={<Inventory />} />               
              {/* Orders Routes */}
              <Route path="/orders" element={<Orders />} />             
              {/* Users Routes */}
              <Route path="/users" element={<Users />} />
              <Route path="/users/all" element={<Users />} />          
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
              <Route path="/bulk-actions" element={<BulkActions />} />
              <Route path="/bulk-actions/universkate" element={<UniverskateBulkActions />} /> 
              <Route path="/bulk-actions/rollerblade" element={<RollerbladeBulkActions />} /> 
              <Route path="/bulk-actions/micro" element={<MicroBulkActions />} />         
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

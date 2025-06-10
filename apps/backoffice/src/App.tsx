import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/hooks/use-theme";

import AbandonedCarts from "@/pages/AbandonedCarts";
import BulkActions from "@/pages/BulkActions";
import Dashboard from "@/pages/Stocks/dashboard";
import Dropshipping from "@/pages/Dropshipping";
import EditProduct from "@/pages/Stocks/edit-product";
import Index from "@/pages/Index";
import Inventory from "@/pages/Inventary";
import Login from "@/pages/Login";
import Logistics from "@/pages/Logistics";
import MicroList from "@/pages/MicroList";
import NewProduct from "@/pages/Stocks/new-product";
import NotFound from "@/pages/NotFound";
import Orders from "@/pages/Orders";
import Payments from "@/pages/Payments";
import ProductDetail from "@/pages/Stocks/product-detail";
import ProductsListWrapper from "@/pages/ProductsListWrapper";
import ProductsPage from "@/pages/Stocks/products-page";
import Promotions from "@/pages/Promotions";
import RollerbladeList from "@/pages/RollerbladeList";
import Stocks from "@/pages/Stocks/Stocks";
import Transports from "@/pages/Transports";
import UniverskateList from "@/pages/UniverskateList";
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
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Outlet />
                  </MainLayout>
                </ProtectedRoute>
              }
            >
              <Route path="/index" element={<Index />} />
              {/* Index Routes */}
              {/* Products Routes */}
              <Route path="/products/*" element={<ProductsListWrapper />} />
              {/* Inventory Routes */}
              <Route path="/products/inventory/*" element={<Inventory />} />
              {/* Stocks Routes */}
              <Route path="/stocks/dashboard" element={<Dashboard />} />
              <Route path="/stocks" element={<Stocks />} />
              <Route path="/stocks/products" element={<ProductsPage />} />
              <Route path="/stocks/new" element={<NewProduct />} />
              <Route path="/stocks/:id" element={<ProductDetail />} />
              <Route path="/stocks/:id/edit" element={<EditProduct />} />

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
              <Route
                path="/bulk-actions/universkate"
                element={<UniverskateList />}
              />
              <Route
                path="/bulk-actions/rollerblade"
                element={<RollerbladeList />}
              />
              <Route path="/bulk-actions/micro" element={<MicroList />} />
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

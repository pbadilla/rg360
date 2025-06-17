import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/hooks/use-theme";

import AbandonedCarts from "@/pages/AbandonedCarts/AbandonedCarts";
import ActivePromotion from "@/pages/Promotions/ActivePromotions";
import Categories from "@/pages/Products/Categories";
import CreatePromotion from "@/pages/Promotions/CreatePromotion";
import Dashboard from "@/pages/Stocks/dashboard";
import DropshippingDashboard from "@/pages/Dropshipping/DropshippingDashboard";
import EditProduct from "@/pages/Stocks/edit-product";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import LogisticsDashboard from "@/pages/Logistics/LogisticsDashboard";
import NewProduct from "@/pages/Stocks/new-product";
import NotFound from "@/pages/NotFound";
import Orders from "@/pages/Orders/Orders";
import PaymentsDashboard from "@/pages/Payments/PaymentsDashboard";
import ProductDetail from "@/pages/Stocks/product-detail";
import ProductsListWrapper from "@/pages/Products/ProductsListWrapper";
import ProductsPage from "@/pages/Stocks/products-page";
import Promotions from "@/pages/Promotions/Promotions";
import ScheduledPromotion from "@/pages/Promotions/ScheduledPromotion";
import Stocks from "@/pages/Stocks/Stocks";
import Users from "@/pages/Users/Users";
import UserRoles from "@/pages/Users/Roles";

// import BulkActions from "@/pages/BulkActions";
// import RollerbladeList from "@/pages/RollerbladeList";
// import UniverskateList from "@/pages/UniverskateList";
// import MicroList from "@/pages/MicroList";

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
              {/* Index Routes */}
              <Route path="/index" element={<Index />} />

              {/* Products Routes */}
              <Route path="/products/*" element={<ProductsListWrapper />} />
              <Route path="/products/categories" element={<Categories />} />

              {/* Inventory/Stocks Routes */}
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
              <Route path="/users/roles" element={<UserRoles />} />

              {/* Promotions Routes */}
              <Route path="/promotions" element={<Promotions />} />
              <Route path="/promotions/active" element={<ActivePromotion />} />
              <Route
                path="/promotions/scheduled"
                element={<ScheduledPromotion />}
              />
              <Route path="/promotions/create" element={<CreatePromotion />} />

              {/* Abandoned Carts Routes */}
              <Route path="/abandoned-carts/*" element={<AbandonedCarts />} />

              {/* Logistics Routes */}
              <Route path="/logistics/*" element={<LogisticsDashboard />} />
              {/* Payments Routes */}
              <Route path="/payments/*" element={<PaymentsDashboard />} />
              {/* Dropshipping Routes */}
              <Route
                path="/dropshipping/*"
                element={<DropshippingDashboard />}
              />
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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";


import { Layout } from "@/components/Layout";
import { MainLayout } from "@/components/layout/MainLayout";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ThemeProvider } from "@/hooks/use-theme";

import AbandonedCarts from "@/pages/AbandonedCarts/AbandonedCarts";
import DropshippingDashboard from "@/pages/Dropshipping/DropshippingDashboard";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Orders from "@/pages/Orders/Orders";
import PaymentsDashboard from "@/pages/Payments/PaymentsDashboard";
import Products from "@/pages/POS/Products";
import Sales from "@/pages/POS/Sales";
import Sellers from "@/pages/POS/Sellers";
import Stats from "@/pages/POS/Stats";
import Categories from "@/pages/Products/Categories";
import ProductsListWrapper from "@/pages/Products/ProductsListWrapper";
import ActivePromotion from "@/pages/Promotions/ActivePromotions";
import CreatePromotion from "@/pages/Promotions/CreatePromotion";
import Promotions from "@/pages/Promotions/Promotions";
import ScheduledPromotion from "@/pages/Promotions/ScheduledPromotion";
import ShippingMethods from "@/pages/ShippingMethods/ShippingMethods";
import Dashboard from "@/pages/Stocks/dashboard";
import EditProduct from "@/pages/Stocks/edit-product";
import NewProduct from "@/pages/Stocks/new-product";
import ProductDetail from "@/pages/Stocks/product-detail";
import ProductsPage from "@/pages/Stocks/products-page";
import Stocks from "@/pages/Stocks/Stocks";
import UserRoles from "@/pages/Users/Roles";
import Users from "@/pages/Users/Users";
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
              <Route path="/abandoned-carts" element={<AbandonedCarts />} />

              {/* Shipping Methods Routes */}
              <Route path="/shipping-methods/*" element={<ShippingMethods />} />
              {/* Payments Routes */}
              <Route path="/payments/*" element={<PaymentsDashboard />} />
              {/* Dropshipping Routes */}
              <Route
                path="/dropshipping/*"
                element={<DropshippingDashboard />}
              />
              {/* POS Routes */}
              <Route path="/pos/" element={<Sales />} />
              <Route path="/pos/products" element={<Products />} />
              <Route path="/pos/stats" element={<Stats />} />
              <Route path="/pos/sellers" element={<Sellers />} />

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


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import ProductsListWrapper from "@/pages/ProductsListWrapper";

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
              <Route path="/orders/*" element={<NotFound />} />             
              {/* Users Routes */}
              <Route path="/users/*" element={<NotFound />} />              
              {/* Promotions Routes */}
              <Route path="/promotions/*" element={<NotFound />} />              
              {/* Abandoned Carts Routes */}
              <Route path="/abandoned-carts/*" element={<NotFound />} />              
              {/* Logistics Routes */}
              <Route path="/logistics/*" element={<NotFound />} />              
              {/* Transports Routes */}
              <Route path="/transports/*" element={<NotFound />} />             
              {/* Payments Routes */}
              <Route path="/payments/*" element={<NotFound />} />             
              {/* Dropshipping Routes */}
              <Route path="/dropshipping/*" element={<NotFound />} />       
              {/* Bulk Actions Routes */}
              <Route path="/bulk-actions/*" element={<NotFound />} />             
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

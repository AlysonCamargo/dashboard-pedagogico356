import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { SEOProvider } from "@/components/SEOProvider";
import CartDrawer from "@/components/CartDrawer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export const App = () => (
  <>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 left-0 bg-white text-black p-2 z-50">
      Skip to main content
    </a>
    <div id="main-content">
      <QueryClientProvider client={queryClient}>
        <SEOProvider>
          <CartProvider>
            <WishlistProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <CartDrawer />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/product/:id" element={<Index />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </WishlistProvider>
          </CartProvider>
        </SEOProvider>
      </QueryClientProvider>
    </div>
  </>
);

export default App;

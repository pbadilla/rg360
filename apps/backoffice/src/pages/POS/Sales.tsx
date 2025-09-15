import { useRef, useState, useMemo } from "react";

import { Search } from "lucide-react";

import InsideLayout from "@/components/layout/InsideLayout";
import Cart from "@/components/POS/Cart";
import ProductCard from "@/components/POS/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { useToast } from "@/hooks/use-toast";

import { useProductStore } from "@/store/useProductStore";

import type { CartItem, Product } from "@/types/product";

import { sortByStock } from "@/utils/sort";

const sellers = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"];

const Sales = () => {
  const {
    filteredProducts: filteredProductsStore,
    loading,
    error,
    searchTerm,
    setSearchTerm,
  } = useProductStore();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSeller, setSelectedSeller] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState<{
    items: CartItem[];
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
  } | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  const categories = ["all", "food", "beverage", "electronics"];
  const TAX_RATE = 0.21;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filtered products: stocks > 0 first
  const filteredProducts = useMemo(() => {
    return filteredProductsStore
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" ||
          String(product.category) === String(selectedCategory);
        return matchesSearch && matchesCategory;
      })
      .sort(sortByStock);
  }, [filteredProductsStore, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (!selectedSeller) {
      toast({
        title: "Please select a seller",
        description: "You must select a seller before processing the payment.",
        variant: "destructive",
      });
      return;
    }
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items before checkout.",
        variant: "destructive",
      });
      return;
    }

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price.pvp * item.quantity,
      0
    );
    const discount = subtotal * (discountPercent / 100);
    const taxedAmount = (subtotal - discount) * TAX_RATE;
    const total = subtotal - discount + taxedAmount;

    setCheckoutDetails({
      items: cart,
      subtotal,
      discount,
      tax: taxedAmount,
      total,
    });
    setShowReceipt(true);
    setCart([]);
  };

  const handlePrint = () => {
    if (!receiptRef.current) return;
    const printContents = receiptRef.current.innerHTML;
    const printWindow = window.open("", "", "height=600,width=400");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: monospace; font-size: 14px; padding: 10px; }
            h2, h4 { text-align: center; margin: 0; }
            .center { text-align: center; }
            .line { border-top: 1px dashed #000; margin: 5px 0; }
            .total { font-weight: bold; }
            .right { text-align: right; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleReservation = (product: Product) => {
    console.log("Reservation requested for:", product);
  
    // Example: send to backend
    fetch("/api/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    })
      .then(() => alert(`Reservation request sent for ${product.name}`))
      .catch((err) => console.error("Error reserving product:", err));
  };

  return (
    <InsideLayout
      title="POS"
      subTitle="Point Of Sale - Manage your sales and inventory efficiently."
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSeller} onValueChange={setSelectedSeller}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Seller" />
            </SelectTrigger>
            <SelectContent>
              {sellers.map((seller) => (
                <SelectItem key={seller} value={seller}>
                  {seller}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 h-[calc(100vh-150px)]">
          {/* Products with pagination */}
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onReserve={handleReservation} 
                    disabled={product.stock <= 0}
                    hasAddButton={true}
                    allowReservation={true}
                  />
                ))}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent className="flex items-center gap-2">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (page) =>
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                      )
                      .map((page, idx, arr) => {
                        const prev = arr[idx - 1];
                        const showEllipsis = prev && page - prev > 1;

                        return (
                          <span key={page} className="flex items-center">
                            {showEllipsis && <PaginationEllipsis />}
                            <PaginationItem>
                              <PaginationLink
                                isActive={currentPage === page}
                                onClick={() => setCurrentPage(page)}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          </span>
                        );
                      })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>

          {/* Cart sticky */}
          <div className="h-full">
            <div className="sticky top-4">
              <Cart
                items={cart.map((item) => ({
                  ...item,
                  price: item.price.pvp,
                }))}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                onCheckout={handleCheckout}
                selectedSeller={selectedSeller}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Receipt</DialogTitle>
          </DialogHeader>

          <div ref={receiptRef}>
            <h2>My Shop</h2>
            <h4>NIF: 12345678A</h4>
            <p className="center">Thank you for shopping with us!</p>
            <div className="line"></div>
            {checkoutDetails?.items.map((item) => (
              <div key={item.id}>
                <div>
                  {item.name} x{item.quantity}
                </div>
                <div className="right">
                  ${(item.price.pvp * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            <div className="line"></div>
            <div>
              Subtotal:{" "}
              <span className="right">
                ${checkoutDetails?.subtotal.toFixed(2)}
              </span>
            </div>
            <div>
              Discount ({discountPercent}%):{" "}
              <span className="right">
                -${checkoutDetails?.discount.toFixed(2)}
              </span>
            </div>
            <div>
              Tax (21%):{" "}
              <span className="right">
                ${checkoutDetails?.tax.toFixed(2)}
              </span>
            </div>
            <div className="line"></div>
            <div className="total">
              TOTAL: ${checkoutDetails?.total.toFixed(2)}
            </div>
            <div className="line"></div>
            <p className="center">* This is your purchase receipt *</p>
            <p className="center">
              Returns within 14 days with proof of purchase
            </p>
          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowReceipt(false)}>
              Close
            </Button>
            <Button onClick={handlePrint}>Print</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </InsideLayout>
  );
};

export default Sales;

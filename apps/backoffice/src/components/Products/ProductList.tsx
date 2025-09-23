import React, { useMemo, useState, useEffect } from "react";

import { ChevronLeft, ChevronRight, Plus, PlusCircle } from "lucide-react";

import SearchInput from "@/components/SearchInput";
import SortDropdown, {
  type SortConfig,
} from "@/components/sorting/SortSelector";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"; // Adjust import path

import { useProductStore } from "@/store/useProductStore";

import { Product } from "@/types/product";

import ProductCard from "./ProductCard";
import ProductEditDialog from "./ProductEditDialog";
import ProductTable from "./ProductTable";
import { BrandFilterDropdown } from "../ui/BrandFilterDropdown";
import ViewToggle from "../ViewToggle";

import { getPaginationPages } from "@/utils/pagination";

const ProductList: React.FC = () => {
  const {
    filteredProducts,
    loading,
    error,
    searchTerm,
    viewMode,
    setSearchTerm,
    setViewMode,
    addProduct,
    editProduct,
    deleteProduct,
    isAdding,
    isEditing,
    isDeleting,
    brandsList,
    selectedBrands,
    setSelectedBrands,
  } = useProductStore();

  const productSortOptions = [
    { label: "Name", value: "name" },
    { label: "Price", value: "price" },
    { label: "Category", value: "category" },
    { label: "Stock", value: "stock" },
  ] as const;

  type ProductSortKey = (typeof productSortOptions)[number]["value"];

  const [sortConfig, setSortConfig] = useState<SortConfig<ProductSortKey>>({
    key: "stock",
    direction: "desc",
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Apply search + brand filter
  const filteredAndBrandedProducts = useMemo(() => {
    return filteredProducts.filter((product) => {
      const name =
        typeof product.name === "string"
          ? product.name
          : typeof product.name === "string"
          ? product.name
          : "";

      const matchesSearch = searchTerm
        ? name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesBrand =
        selectedBrands.length > 0
          ? selectedBrands.includes(product.brand || product.brand || "")
          : true;

      return matchesSearch && matchesBrand;
    });
  }, [filteredProducts, searchTerm, selectedBrands]);

  // Paginate + sort filtered products
  const totalPages = Math.ceil(filteredAndBrandedProducts.length / pageSize);

  const paginatedProducts = useMemo(() => {
    const sorted = [...filteredAndBrandedProducts].sort((a, b) => {
      const { key, direction } = sortConfig;

      let aValue = a[key];
      let bValue = b[key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    const startIndex = (currentPage - 1) * pageSize;
    return sorted.slice(startIndex, startIndex + pageSize);
  }, [filteredAndBrandedProducts, sortConfig, currentPage, pageSize]);

  // Reset page when filters change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [filteredAndBrandedProducts.length, totalPages, currentPage]);

  if (loading) return <div className="min-h-[400px] flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading products...</div></div>;
  if (error) return <div className="min-h-[400px] flex flex-col items-center justify-center"><div className="text-red-500 mb-4">Error loading products</div><Button onClick={() => window.location.reload()}>Retry</Button></div>;

  return (
    <>
      {/* Header: Search + Add + View + Sort */}
      <div className="py-6 px-4 sm:px-6 bg-primary/5 border-b">
        <div className="flex flex-col space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight animate-slide-down">Products</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
            <div className="flex items-center gap-2">
              <SearchInput searchTerm={searchTerm} onSearch={setSearchTerm} placeholder="Search products..." className="w-[500px]" />
              <Button onClick={() => setIsAddDialogOpen(true)} className="group" disabled={isAdding}>
                <PlusCircle size={16} className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
                {isAdding ? "Adding..." : "Add Product"}
              </Button>
              <Button onClick={() => setIsAddDialogOpen(true)} className="group" disabled={isAdding}>
                <PlusCircle size={16} className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
                {isAdding ? "Adding..." : "Add Product by Image"}
              </Button>
              <BrandFilterDropdown brands={brandsList} selectedBrands={selectedBrands} toggleBrand={toggleBrand} />
            </div>
            <div className="flex items-center gap-4 sm:ml-auto">
              <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
              <SortDropdown
                sortConfig={sortConfig}
                onSortChange={setSortConfig}
                sortOptions={[...productSortOptions]}
                label="Sort products by:"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product grid/table */}
      <div className="w-full mx-auto px-4 sm:px-6 space-y-8 py-8">
        {filteredAndBrandedProducts.length === 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-8 border rounded-lg bg-muted/20">
            <h3 className="text-xl font-medium">No products found</h3>
            <p className="text-muted-foreground mt-2 mb-6">
              {searchTerm ? "Try adjusting your search criteria" : "No products available. Add your first product!"}
            </p>
            {searchTerm ? <Button variant="outline" onClick={() => setSearchTerm("")}>Clear search</Button> : <Button onClick={() => setIsAddDialogOpen(true)}><Plus className="h-4 w-4 mr-2" />Add Product</Button>}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onEdit={editProduct} onDelete={deleteProduct} isDeleting={false} isEditing={isEditing} />
            ))}
          </div>
        ) : (
          <ProductTable products={paginatedProducts} onEdit={editProduct} onDelete={deleteProduct} isDeleting={isDeleting} isEditing={isEditing} />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-6">
            <PaginationPrevious
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : 0}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
            <PaginationContent>
              {getPaginationPages(currentPage, totalPages).map((page, idx) =>
                page === "..." ? (
                  <PaginationEllipsis key={`ellipsis-${idx}`} />
                ) : (
                  <PaginationItem key={`page-${page}-${idx}`}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
            </PaginationContent>
            <PaginationNext
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              aria-disabled={currentPage === totalPages}
              tabIndex={currentPage === totalPages ? -1 : 0}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </Pagination>
        )}

        {/* Add Product Dialog */}
        <ProductEditDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onSave={(product) => { const { id, ...productWithoutId } = product; addProduct(productWithoutId); setIsAddDialogOpen(false); }} isLoading={isAdding} />
      </div>
    </>
  );
};


export default ProductList;

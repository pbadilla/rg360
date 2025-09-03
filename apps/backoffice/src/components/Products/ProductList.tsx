import React, { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, PlusCircle } from "lucide-react";

import SearchInput from "@/components/SearchInput";
import SortDropdown, {
  type SortConfig,
} from "@/components/sorting/SortSelector";
import { Button } from "@/components/ui/button";

import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/product";

import ProductCard from "./ProductCard";
import ProductEditDialog from "./ProductEditDialog";
import ProductTable from "./ProductTable";
import ViewToggle from "../ViewToggle";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"; // Adjust import path
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
  } = useProductStore();

  const productSortOptions = [
    { label: "Name", value: "name" },
    { label: "Price", value: "price" },
    { label: "Category", value: "category" },
    { label: "Stock", value: "stock" },
  ] as const;

  type ProductSortKey = (typeof productSortOptions)[number]["value"];
  const [sortConfig, setSortConfig] = useState<SortConfig<ProductSortKey>>({
    key: "name",
    direction: "asc",
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  console.log("filteredProducts", filteredProducts);

  // Paginate filtered products
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  // Reset page when search or sort changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1); // fallback to 1 if no products
    }
  }, [filteredProducts.length, totalPages]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <div className="text-red-500 mb-4">Error loading products</div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <>
      {/* Header: Search + Add + View + Sort */}
      <div className="py-6 px-4 sm:px-6 bg-primary/5 border-b">
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col gap-2 mb-2">
            <h1 className="text-3xl font-semibold tracking-tight animate-slide-down">
              Products
            </h1>
            <p className="text-muted-foreground animate-slide-down">
              Add and manage products.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
            {/* Search + Add */}
            <div className="flex items-center gap-2">
              <SearchInput
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                placeholder="Search products..."
                className="w-[500px] sm:w-[500px] lg:w-[500px]"
              />
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="group"
                disabled={isAdding}
              >
                <PlusCircle
                  size={16}
                  className="h-5 w-5 mr-2 transition-transform group-hover:scale-110"
                />
                {isAdding ? "Adding..." : "Add Product"}
              </Button>
            </div>

            {/* View + Sort */}
            <div className="flex items-center gap-4 sm:ml-auto">
              <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
              <SortDropdown
                sortConfig={sortConfig}
                onSortChange={setSortConfig}
                sortOptions={productSortOptions}
                label="Sort products by:"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product grid/table */}
      <div className="w-full mx-auto px-4 sm:px-6 space-y-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-8 border rounded-lg bg-muted/20">
            <h3 className="text-xl font-medium">No products found</h3>
            <p className="text-muted-foreground mt-2 mb-6">
              {searchTerm
                ? "Try adjusting your search criteria"
                : "No products available. Add your first product!"}
            </p>
            {searchTerm ? (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear search
              </Button>
            ) : (
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="animate-slide-up">
                <ProductCard
                  product={product}
                  onEdit={editProduct}
                  onDelete={deleteProduct}
                  isDeleting={false}
                  isEditing={isEditing}
                />
              </div>
            ))}
          </div>
        ) : (
          <ProductTable
            products={paginatedProducts}
            onEdit={editProduct}
            onDelete={deleteProduct}
            isDeleting={isDeleting}
            isEditing={isEditing}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-6">
            <PaginationPrevious
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            />
            {/* <PaginationContent>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  return (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  );
                })
                .map((page, idx, arr) => {
                  const prev = arr[idx - 1];
                  const showEllipsis = prev && page - prev > 1;
                  return (
                    <React.Fragment key={page}>
                      {showEllipsis && <PaginationEllipsis />}
                      <PaginationItem>
                        <PaginationLink
                          isActive={currentPage === page}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    </React.Fragment>
                  );
                })}
            </PaginationContent> */}
            <PaginationContent>
              {getPaginationPages(currentPage, totalPages).map((page, idx) =>
                page === "..." ? (
                  <PaginationEllipsis key={idx} />
                ) : (
                  <PaginationItem key={page}>
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
              disabled={currentPage === totalPages}
            />
          </Pagination>
        )}

        {/* Add Product Dialog */}
        <ProductEditDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSave={(product) => {
            const { id, ...productWithoutId } = product;
            addProduct(productWithoutId);
            setIsAddDialogOpen(false);
          }}
          isLoading={isAdding}
        />
      </div>
    </>
  );
};

export default ProductList;

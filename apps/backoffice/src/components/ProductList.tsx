import React, { useState, useMemo } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useProductStore } from "@/store/storeProducts"; // Replace context with our new hook
import ProductCard from "./ProductCard";
import ProductTable from "./ProductTable";
import ProductSearch from "./ProductSearch";
import SortSelector from "./SortSelector";
import ViewToggle from "./ViewToggle";
import ProductEditDialog from "./ProductEditDialog";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/product";

const ProductList: React.FC = () => {
  // Replace both useProducts() and useProductsQuery() with single hook
  const {
    filteredProducts,
    loading,
    error,
    searchTerm,
    sortConfig,
    viewMode,
    setSearchTerm,
    setSortConfig,
    setViewMode,
    deleteProduct,
    editProduct,
    addProduct,
    isDeleting,
    isEditing,
    isAdding,
  } = useProductStore();

  console.log("Filtered Products:", filteredProducts);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 8;

  // Paginate the already filtered products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  // Reset to page 1 when search/filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortConfig]);

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
      <div className="py-6 px-4 sm:px-6 bg-primary/5 border-b">
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="group"
              disabled={isAdding}
            >
              <Plus className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
              {isAdding ? "Adding..." : "Add Product"}
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <ProductSearch
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
              className="sm:max-w-md flex-grow"
            />
            <div className="flex items-center gap-4">
              <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
              <SortSelector
                sortConfig={sortConfig}
                onSortChange={setSortConfig}
              />
            </div>
          </div>
        </div>
      </div>

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
                  isDeleting={isDeleting}
                  isEditing={isEditing}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="animate-fade-in">
            <ProductTable
              products={paginatedProducts}
              onEdit={editProduct}
              onDelete={deleteProduct}
              isDeleting={isDeleting}
              isEditing={isEditing}
            />
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft className="h-5 w-5" /> Prev
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages} ({filteredProducts.length}{" "}
              total)
            </span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}

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

import React, { useState, useMemo, useEffect } from "react";
import { useProductStore } from "@/store/storeProducts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, ChevronLeft, ChevronRight } from "lucide-react";

import SearchInput from "@/components/SearchInput";
import ViewToggle from "@/components/ViewToggle";
import SortDropdown, { SortConfig } from "@/components/SortSelector";
import ProductCard from "@/components/POS/ProductCard";
import ProductTable from "@/components/Products/ProductTable";
import ProductEditDialog from "@/components/Products/ProductEditDialog";

const POSProducts: React.FC = () => {
  const {
    filteredProducts,
    loading,
    error,
    searchTerm,
    viewMode,
    setSearchTerm,
    setViewMode,
    deleteProduct,
    editProduct,
    addProduct,
    isDeleting,
    isEditing,
    isAdding,
  } = useProductStore();

  const productSortOptions = [
    { label: "Name", value: "name" },
    { label: "Price", value: "price" },
    { label: "Category", value: "category" },
    { label: "Stock", value: "stock" },
  ];

  type ProductSortKey = (typeof productSortOptions)[number]["value"];

  const [sortConfig, setSortConfig] = useState<SortConfig<ProductSortKey>>({
    key: "name",
    direction: "asc",
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  // Reset to first page when filters or sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortConfig]);

  // Category badge colors
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "food":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "beverage":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "electronics":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  // Stock status badge
  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return { label: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (stock < 10)
      return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { label: "In Stock", color: "bg-green-100 text-green-800" };
  };

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">POS Product Management</h1>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="group"
          disabled={isAdding}
        >
          <Plus className="h-4 w-4 mr-2" />
          {isAdding ? "Adding..." : "Add Product"}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-gradient-primary text-white">
          <p className="text-sm opacity-90">Total Products</p>
          <p className="text-2xl font-bold">{filteredProducts.length}</p>
        </Card>
        <Card className="p-4 bg-gradient-success text-white">
          <p className="text-sm opacity-90">In Stock</p>
          <p className="text-2xl font-bold">
            {filteredProducts.filter((p) => p.stock > 0).length}
          </p>
        </Card>
        <Card className="p-4 bg-yellow-500 text-white">
          <p className="text-sm opacity-90">Low Stock</p>
          <p className="text-2xl font-bold">
            {filteredProducts.filter((p) => p.stock < 10 && p.stock > 0).length}
          </p>
        </Card>
        <Card className="p-4 bg-red-500 text-white">
          <p className="text-sm opacity-90">Out of Stock</p>
          <p className="text-2xl font-bold">
            {filteredProducts.filter((p) => p.stock === 0).length}
          </p>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SearchInput
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          placeholder="Search products..."
          className="w-full max-w-xs"
        />
        <div className="flex items-center gap-4">
          <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
          <SortDropdown
            sortConfig={sortConfig}
            onSortChange={setSortConfig}
            sortOptions={productSortOptions}
            label="Sort products by:"
          />
        </div>
      </div>

      {/* Product List */}
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
            <ProductCard
              key={product.id}
              product={{
                ...product,
                // category: String(product.category),
                price:
                  typeof product.price === "object" && product.price !== null
                    ? typeof (product.price as any).amount === "number"
                      ? (product.price as any).amount
                      : 0
                    : typeof product.price === "number"
                    ? product.price
                    : 0,
              }}
              onAddToCart={() => {}} // TODO: implement cart logic if needed
            />
          ))}
        </div>
      ) : (
        <ProductTable
          products={paginatedProducts.map((p) => ({
            ...p,
            categoryBadge: (
              <Badge className={getCategoryColor(String(p.category))}>
                {String(p.category)}
              </Badge>
            ),
            stockBadge: (
              <Badge className={getStockStatus(p.stock).color}>
                {getStockStatus(p.stock).label}
              </Badge>
            ),
          }))}
          onEdit={editProduct}
          onDelete={deleteProduct}
          isDeleting={isDeleting}
          isEditing={isEditing}
        />
      )}

      {/* Pagination */}
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
            Page {currentPage} of {totalPages} ({filteredProducts.length} total)
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

      {/* Add/Edit Dialog */}
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
  );
};

export default POSProducts;

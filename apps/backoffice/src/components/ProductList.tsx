import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useProducts } from '@/context/ProductContext';
import ProductCard from './ProductCard';
import ProductTable from './ProductTable';
import ProductSearch from './ProductSearch';
import SortSelector from './SortSelector';
import ViewToggle from './ViewToggle';
import ProductEditDialog from './ProductEditDialog';
import { Button } from '@/components/ui/button';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { SortConfig, ViewMode, Product } from '@/types/product';

const ProductList: React.FC = () => {
  const { 
    filteredProducts,
    products,
    loading, 
    searchTerm, 
    sortConfig,
    viewMode,
    setSearchTerm, 
    setSortConfig,
    setViewMode,
    deleteProduct,
    editProduct,
    addProduct
  } = useProducts();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const pageSize = 8; // Adjust as needed

  const queryClient = useQueryClient();

  useEffect(() => {
    const storedProducts = queryClient.getQueryData<Product[]>(['products', 'ProductsStore']) || [];
    setDisplayedProducts(storedProducts);
  }, [queryClient]);

  // Calculate pagination
  const totalPages = Math.ceil(displayedProducts.length / pageSize);
  const paginatedProducts = displayedProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <div className="py-6 px-4 sm:px-6 bg-primary/5 border-b">
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
            <Button onClick={() => setIsAddDialogOpen(true)} className="group">
              <Plus className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
              Add Product
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
              <SortSelector sortConfig={sortConfig} onSortChange={setSortConfig} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto px-4 sm:px-6 space-y-8 py-8">
        {loading ? (
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading products...</div>
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-8 border rounded-lg bg-muted/20">
            <h3 className="text-xl font-medium">No products found</h3>
            <p className="text-muted-foreground mt-2 mb-6">Try adjusting your search or sort criteria</p>
            <Button variant="outline" onClick={() => setSearchTerm('')}>Clear search</Button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="animate-slide-up">
                <ProductCard product={product} onEdit={editProduct} onDelete={deleteProduct} />
              </div>
            ))}
          </div>
        ) : (
          <div className="animate-fade-in">
            <ProductTable products={paginatedProducts} onEdit={editProduct} onDelete={deleteProduct} />
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
            <span className="text-sm">Page {currentPage} of {totalPages}</span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
        />
      </div>
    </>
  );
};

export default ProductList;

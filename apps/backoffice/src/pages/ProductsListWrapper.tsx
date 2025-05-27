import React from 'react';
import { ProductProvider } from '@/context/ProductContext';
import ProductList from '@/components/ProductList';

const ProductsListWrapper = () => {
  return (
    <div className="min-h-screen bg-background">
      <ProductProvider>
        <ProductList />
      </ProductProvider>
    </div>
  );
};

export default ProductsListWrapper;
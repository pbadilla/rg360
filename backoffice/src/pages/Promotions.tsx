
import React from 'react';
import { Layout } from '@/components/Layout';
import { PromotionTable } from '@/components/PromotionTable';

const Promotions = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium tracking-wider mb-3">
            MANAGE PROMOTIONS
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Promotion Management</h1>
          <p className="mt-4 text-muted-foreground">
            Create and manage your promotional campaigns with a simple and intuitive interface.
            Edit titles, percentages, descriptions, and images directly from the table.
          </p>
        </div>
        
        <PromotionTable />
      </div>
    </Layout>
  );
};

export default Promotions;

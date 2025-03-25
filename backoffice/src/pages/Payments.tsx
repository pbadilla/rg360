
import React from 'react';
import OrderTable from '@/components/OrderTable';
import { getMockPayments } from '@/services/paymentsService';

const Payments: React.FC = () => {
  const orders = getMockPayments();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
        <div className="flex flex-col gap-2 mb-8">
          <span className="text-sm font-medium text-muted-foreground animate-slide-down">
            Management
          </span>
          <h1 className="text-3xl font-semibold tracking-tight animate-slide-down">
            Payments
          </h1>
          <p className="text-muted-foreground animate-slide-down">
            View and manage all your orders with sortable columns.
          </p>
        </div>
        
        <div className="mt-8 animate-slide-up">
          <OrderTable orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default Payments;

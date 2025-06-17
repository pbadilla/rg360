import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentMethodsManager from "@/components/Payments/PaymentMethodsManager";
import TransactionTracker from "@/components/Payments/TransactionTracker";
import RefundManager from "@/components/Payments/RefundManager";
import PaymentStats from "@/components/Payments/PaymentStats";
import CustomerManager from "@/components/Payments/CustomerManager";
import { CreditCard, Receipt, RotateCcw, BarChart3, Users } from "lucide-react";
import Payments from "@/pages/Payments";

const PaymentsDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Payment Manager
          </h1>
          <p className="text-lg text-slate-600">
            Manage payment methods, transactions, refunds, and analytics
          </p>
        </div>

        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Methods
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="flex items-center gap-2"
            >
              <Receipt className="h-4 w-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="refunds" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Refunds
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <PaymentStats />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentMethodsManager />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionTracker />
          </TabsContent>

          <TabsContent value="refunds">
            <RefundManager />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentsDashboard;

import { BarChart3, CreditCard, Receipt, RotateCcw, Users } from "lucide-react";

import InsideLayout from "@/components/layout/InsideLayout";
import CustomerManager from "@/components/Payments/CustomerManager";
import PaymentMethodsManager from "@/components/Payments/PaymentMethodsManager";
import PaymentStats from "@/components/Payments/PaymentStats";
import RefundManager from "@/components/Payments/RefundManager";
import TransactionTracker from "@/components/Payments/TransactionTracker";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PaymentsDashboard = () => {
  return (
    <InsideLayout
      title="Payment Manager"
      subTitle="Manage payment methods, transactions, refunds, and analytics."
    >
      <div className="min-h-screen p-0">
        <div className="mx-auto">
          <Tabs defaultValue="stats" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white dark:bg-slate-800 shadow-sm">
              <TabsTrigger
                value="stats"
                className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <CreditCard className="h-4 w-4" />
                Payment Methods
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <Receipt className="h-4 w-4" />
                Transactions
              </TabsTrigger>
              <TabsTrigger
                value="refunds"
                className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <RotateCcw className="h-4 w-4" />
                Refunds
              </TabsTrigger>
              <TabsTrigger
                value="customers"
                className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
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
    </InsideLayout>
  );
};

export default PaymentsDashboard;

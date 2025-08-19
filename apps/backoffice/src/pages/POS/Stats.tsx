import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  BarChart3,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

import InsideLayout from "@/components/layout/InsideLayout";
import { Card } from "@/components/ui/card";

const dailySales = [
  { day: "Mon", sales: 1250, orders: 45 },
  { day: "Tue", sales: 1580, orders: 52 },
  { day: "Wed", sales: 1920, orders: 68 },
  { day: "Thu", sales: 1740, orders: 61 },
  { day: "Fri", sales: 2100, orders: 75 },
  { day: "Sat", sales: 2450, orders: 89 },
  { day: "Sun", sales: 1890, orders: 67 },
];

const topProducts = [
  { name: "Margherita Pizza", value: 35, color: "#22c55e" },
  { name: "Pepperoni Pizza", value: 28, color: "#3b82f6" },
  { name: "Smartphone", value: 20, color: "#f59e0b" },
  { name: "Coffee", value: 17, color: "#ef4444" },
];

const sellerPerformance = [
  { name: "John Doe", sales: 15200, orders: 89 },
  { name: "Jane Smith", sales: 18500, orders: 102 },
  { name: "Mike Johnson", sales: 12800, orders: 76 },
  { name: "Sarah Wilson", sales: 16900, orders: 94 },
];

const Stats = () => {
  const totalRevenue = dailySales.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = dailySales.reduce((sum, day) => sum + day.orders, 0);
  const averageOrderValue = totalRevenue / totalOrders;

  return (
    <InsideLayout title="POS Product Management" subTitle="Sales Analytics.">
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 bg-gradient-primary text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ${totalRevenue.toLocaleString()}
                </p>
                <p className="text-xs opacity-75">This week</p>
              </div>
              <DollarSign className="h-8 w-8 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-success text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Orders</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
                <p className="text-xs opacity-75">This week</p>
              </div>
              <ShoppingCart className="h-8 w-8 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 bg-blue-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Avg Order Value</p>
                <p className="text-2xl font-bold">
                  ${averageOrderValue.toFixed(2)}
                </p>
                <p className="text-xs opacity-75">Per transaction</p>
              </div>
              <TrendingUp className="h-8 w-8 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 bg-purple-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Active Sellers</p>
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs opacity-75">Currently working</p>
              </div>
              <Users className="h-8 w-8 opacity-80" />
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-card border-0 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Daily Sales</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="hsl(142 76% 36%)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Top Products</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topProducts}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-md lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Seller Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={sellerPerformance}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="hsl(142 76% 36%)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 bg-gradient-card border-0 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {[
              {
                time: "2 minutes ago",
                seller: "Jane Smith",
                amount: "$45.99",
                items: "Pizza, Coke",
              },
              {
                time: "5 minutes ago",
                seller: "John Doe",
                amount: "$699.99",
                items: "Smartphone",
              },
              {
                time: "8 minutes ago",
                seller: "Sarah Wilson",
                amount: "$23.97",
                items: "Coffee, Burger",
              },
              {
                time: "12 minutes ago",
                seller: "Mike Johnson",
                amount: "$129.99",
                items: "Wireless Headphones",
              },
            ].map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-background rounded-lg"
              >
                <div>
                  <p className="font-medium">{transaction.seller}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.items}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{transaction.amount}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </InsideLayout>
  );
};

export default Stats;

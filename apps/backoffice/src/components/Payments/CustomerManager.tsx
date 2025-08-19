import { useState } from "react";

import { CreditCard, DollarSign, Eye, Mail, Phone, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalSpent: number;
  transactionCount: number;
  lastTransaction: string;
  status: "active" | "inactive" | "blocked";
  preferredPaymentMethod: string;
  joinDate: string;
}

const CustomerManager = () => {
  const [customers] = useState<Customer[]>([
    {
      id: "cust_001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      totalSpent: 1299.97,
      transactionCount: 8,
      lastTransaction: "2024-06-17",
      status: "active",
      preferredPaymentMethod: "Visa *4242",
      joinDate: "2024-01-15",
    },
    {
      id: "cust_002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      totalSpent: 849.5,
      transactionCount: 5,
      lastTransaction: "2024-06-16",
      status: "active",
      preferredPaymentMethod: "PayPal",
      joinDate: "2024-02-20",
    },
    {
      id: "cust_003",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      totalSpent: 299.99,
      transactionCount: 2,
      lastTransaction: "2024-06-10",
      status: "inactive",
      preferredPaymentMethod: "Mastercard *8888",
      joinDate: "2024-03-05",
    },
    {
      id: "cust_004",
      name: "Alice Brown",
      email: "alice.brown@example.com",
      phone: "+1 (555) 456-7890",
      totalSpent: 2150.75,
      transactionCount: 12,
      lastTransaction: "2024-06-15",
      status: "active",
      preferredPaymentMethod: "Visa *1234",
      joinDate: "2023-12-10",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgSpending = totalRevenue / totalCustomers;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Customer Manager
          </h2>
          <p className="text-slate-600">
            Manage customer payment profiles and history
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {totalCustomers}
                </div>
                <p className="text-sm text-slate-600">Total Customers</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {activeCustomers}
                </div>
                <p className="text-sm text-slate-600">Active Customers</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <Badge className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  ${totalRevenue.toFixed(2)}
                </div>
                <p className="text-sm text-slate-600">Total Revenue</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  ${avgSpending.toFixed(2)}
                </div>
                <p className="text-sm text-slate-600">Avg. Spending</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search customers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>
            Showing {filteredCustomers.length} of {customers.length} customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Last Transaction</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-slate-500">
                          Member since{" "}
                          {new Date(customer.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Mail className="h-4 w-4 mr-1" />
                        {customer.email}
                      </div>
                      {customer.phone && (
                        <div className="flex items-center text-sm text-slate-600">
                          <Phone className="h-4 w-4 mr-1" />
                          {customer.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      ${customer.totalSpent.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell>{customer.transactionCount}</TableCell>
                  <TableCell>
                    {new Date(customer.lastTransaction).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Customer Details</DialogTitle>
                          <DialogDescription>
                            Payment profile and transaction history
                          </DialogDescription>
                        </DialogHeader>
                        {selectedCustomer && (
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback>
                                  {getInitials(selectedCustomer.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {selectedCustomer.name}
                                </div>
                                <Badge
                                  className={getStatusColor(
                                    selectedCustomer.status,
                                  )}
                                >
                                  {selectedCustomer.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <span className="text-sm font-medium">
                                  Email:
                                </span>
                                <p className="text-sm text-slate-600">
                                  {selectedCustomer.email}
                                </p>
                              </div>
                              {selectedCustomer.phone && (
                                <div>
                                  <span className="text-sm font-medium">
                                    Phone:
                                  </span>
                                  <p className="text-sm text-slate-600">
                                    {selectedCustomer.phone}
                                  </p>
                                </div>
                              )}
                              <div>
                                <span className="text-sm font-medium">
                                  Preferred Payment:
                                </span>
                                <p className="text-sm text-slate-600">
                                  {selectedCustomer.preferredPaymentMethod}
                                </p>
                              </div>
                              <div>
                                <span className="text-sm font-medium">
                                  Total Spent:
                                </span>
                                <p className="text-sm text-slate-600">
                                  ${selectedCustomer.totalSpent.toFixed(2)}
                                </p>
                              </div>
                              <div>
                                <span className="text-sm font-medium">
                                  Transactions:
                                </span>
                                <p className="text-sm text-slate-600">
                                  {selectedCustomer.transactionCount}
                                </p>
                              </div>
                              <div>
                                <span className="text-sm font-medium">
                                  Last Transaction:
                                </span>
                                <p className="text-sm text-slate-600">
                                  {new Date(
                                    selectedCustomer.lastTransaction,
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerManager;

import { useState } from "react";

import { Download, Eye, Filter, Search, AlertCircle, CheckCircle, CirclePlus, BadgeDollarSign } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Transaction } from "@/types/payments";
import { useTransactionsStore } from "@/store/useTransactionsStore";

const TransactionTracker = () => {
  const {
    entities: transactions,
    addEntity,
    editEntity,
    deleteEntity,
    isLoading,
    isAdding,
    isEditing,
    isDeleting,
    error,
  } = useTransactionsStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredTransactions.reduce(
    (sum, txn) => sum + txn.amount,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
              {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <BadgeDollarSign className="h-8 w-8 text-white mr-3" />
              <div>
                <div className="text-2xl font-bold text-white">{totalAmount.toFixed(2)} €</div>
                <p className="text-sm text-white">Total Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-600">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-white mr-3" />
              <div>
                <div className="text-2xl font-bold text-white">
                  {filteredTransactions.filter((t) => t.status === "completed").length}
                </div>
                <p className="text-sm text-white">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-600">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-white mr-3" />
              <div>
                <div className="text-2xl font-bold text-white">
                  { filteredTransactions.filter((t) => t.status === "pending").length }
                </div>
                <p className="text-sm text-white">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-600">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CirclePlus className="h-8 w-8 text-white mr-3 rotate-45" />
              <div>
                <div className="text-2xl font-bold text-white">
                  {filteredTransactions.filter((t) => t.status === "failed").length}
                </div>
                <p className="text-sm text-white">Failed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Showing {filteredTransactions.length} of {transactions.length}{" "}
            transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.id}
                  </TableCell>
                  <TableCell>{transaction.customer}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
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

export default TransactionTracker;

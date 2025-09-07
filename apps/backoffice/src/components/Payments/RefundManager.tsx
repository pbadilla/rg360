/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import { useState } from "react";

import { AlertCircle, CheckCircle, Plus, BadgeDollarSign } from "lucide-react";

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
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";

import { useToast } from "@/hooks/use-toast";
import { Refund } from "@/types/payments";
import { useRefundsStore } from "@/store/useRefundsStore";

const RefundManager = () => {
  const { toast } = useToast();
  const {
    entities: refunds,
    addEntity,
    editEntity,
    deleteEntity,
    isLoading,
    isAdding,
    isEditing,
    isDeleting,
    error,
  } = useRefundsStore();

  const [refundsData, setRefundsData] = useState<Refund[]>(refunds);

  const [newRefund, setNewRefund] = useState({
    transactionId: "",
    customer: "",
    originalAmount: "",
    refundAmount: "",
    reason: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusColor = (status: Refund["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "processed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const processRefund = () => {
    if (
      !newRefund.transactionId ||
      !newRefund.customer ||
      !newRefund.refundAmount ||
      !newRefund.reason
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const refund: Refund = {
      id: `ref_${Date.now()}`,
      transactionId: newRefund.transactionId,
      customer: newRefund.customer,
      originalAmount: parseFloat(newRefund.originalAmount),
      refundAmount: parseFloat(newRefund.refundAmount),
      reason: newRefund.reason,
      status: "pending",
      requestDate: new Date().toISOString().split("T")[0],
    };

    setRefundsData([refund, ...refunds]);
    setNewRefund({
      transactionId: "",
      customer: "",
      originalAmount: "",
      refundAmount: "",
      reason: "",
    });
    setIsDialogOpen(false);

    toast({
      title: "Success",
      description: "Refund request created successfully",
    });
  };

  const updateRefundStatus = (
    refundId: string,
    newStatus: Refund["status"]
  ) => {
    setRefundsData((refunds) =>
      refunds.map((refund) => {
        if (refund.id === refundId) {
          const updates: Partial<Refund> = { status: newStatus };
          if (newStatus === "processed") {
            updates.processedDate = new Date().toISOString().split("T")[0];
          }
          return { ...refund, ...updates };
        }
        return refund;
      })
    );

    toast({
      title: "Status Updated",
      description: `Refund status changed to ${newStatus}`,
    });
  };

  const pendingRefunds = refunds.filter((r) => r.status === "pending").length;
  const totalRefunded = refunds
    .filter((r) => r.status === "processed")
    .reduce((sum, r) => sum + r.refundAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              New Refund
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogDescription>Create a new refund request</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="transactionId">Transaction ID</Label>
                <Input
                  id="transactionId"
                  value={newRefund.transactionId}
                  onChange={(e) =>
                    setNewRefund({
                      ...newRefund,
                      transactionId: e.target.value,
                    })
                  }
                  placeholder="txn_001"
                />
              </div>
              <div>
                <Label htmlFor="customer">Customer Name</Label>
                <Input
                  id="customer"
                  value={newRefund.customer}
                  onChange={(e) =>
                    setNewRefund({ ...newRefund, customer: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="originalAmount">Original Amount</Label>
                <Input
                  id="originalAmount"
                  type="number"
                  step="0.01"
                  value={newRefund.originalAmount}
                  onChange={(e) =>
                    setNewRefund({
                      ...newRefund,
                      originalAmount: e.target.value,
                    })
                  }
                  placeholder="299.99"
                />
              </div>
              <div>
                <Label htmlFor="refundAmount">Refund Amount</Label>
                <Input
                  id="refundAmount"
                  type="number"
                  step="0.01"
                  value={newRefund.refundAmount}
                  onChange={(e) =>
                    setNewRefund({ ...newRefund, refundAmount: e.target.value })
                  }
                  placeholder="299.99"
                />
              </div>
              <div>
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  value={newRefund.reason}
                  onChange={(e) =>
                    setNewRefund({ ...newRefund, reason: e.target.value })
                  }
                  placeholder="Describe the reason for refund..."
                />
              </div>
              <Button onClick={processRefund} className="w-full">
                Create Refund Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <BadgeDollarSign className="h-8 w-8 text-white mr-3" />
              <div>
                <div className="text-2xl font-bold text-white ">
                  {totalRefunded.toFixed(2)} €
                </div>
                <p className="text-sm text-white">Total Refunded</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-600">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-white  mr-3" />
              <div>
                <div className="text-2xl font-bold text-white ">
                  {refunds.filter((r) => r.status === "processed").length}
                </div>
                <p className="text-sm text-white">Processed</p>
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
                  {pendingRefunds}
                </div>
                <p className="text-sm text-white">Pending Refunds</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refunds Table */}
      <Card>
        <CardHeader>
          <CardTitle>Refund Requests</CardTitle>
          <CardDescription>
            Manage and track all refund requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Refund ID</TableHead>
                <TableHead>Transaction</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refunds.map((refund) => (
                <TableRow key={refund.id}>
                  <TableCell className="font-medium">{refund.id}</TableCell>
                  <TableCell>{refund.transactionId}</TableCell>
                  <TableCell>{refund.customer}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        ${refund.refundAmount.toFixed(2)}
                      </div>
                      <div className="text-sm text-slate-500">
                        of ${refund.originalAmount.toFixed(2)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {refund.reason}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(refund.status)}>
                      {refund.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(refund.requestDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {refund.status === "pending" && (
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateRefundStatus(refund.id, "approved")
                          }
                          className="text-green-600 hover:text-green-700"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateRefundStatus(refund.id, "rejected")
                          }
                          className="text-red-600 hover:text-red-700"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    {refund.status === "approved" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateRefundStatus(refund.id, "processed")
                        }
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Process
                      </Button>
                    )}
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

export default RefundManager;

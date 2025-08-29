/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import { useState } from "react";

import {
  Building,
  CreditCard,
  Edit,
  Plus,
  Smartphone,
  Trash2,
} from "lucide-react";

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

import { useToast } from "@/hooks/use-toast";
import { usePaymentMethodStore } from "@/store/usePaymentMethodStore";
import { PaymentMethod } from "@/types/payments";

const PaymentMethodsManager = () => {
  const {
    entities: paymentMethods,
    addEntity,
    editEntity,
    deleteEntity,
    isLoading,
    isAdding,
    isEditing,
    isDeleting,
    error,
  } = usePaymentMethodStore();

  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getIcon = (type: PaymentMethod["type"]) => {
    switch (type) {
      case "card":
        return <CreditCard className="h-5 w-5" />;
      case "paypal":
        return <Building className="h-5 w-5" />;
      case "bank_transfer":
        return <Building className="h-5 w-5" />;
      // case "mobile_payment":
      //   return <Smartphone className="h-5 w-5" />;
    }
  };

  const [newMethod, setNewMethod] = useState({
    type: "credit_card" as PaymentMethod["type"],
    name: "",
    details: "",
  });

  const addPaymentMethod = async () => {
    if (!newMethod.name || !newMethod.details) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const method = {
      id: Date.now().toString(),
      ...newMethod,
      isActive: true,
      lastUsed: new Date().toISOString().split("T")[0],
    };

    await addEntity({
      ...newMethod,
      isActive: true,
    }); // uses your store
    setNewMethod({ type: "card", name: "", details: "" });
    setIsDialogOpen(false);

    toast({
      title: "Success",
      description: "Payment method added successfully",
    });
  };

  const toggleMethod = async (id: string) => {
    const method = paymentMethods.find((m) => m.id === id);
    if (!method) return;
    await editEntity({ ...method, isActive: !method.isActive });
  };

  const deleteMethod = async (id: string) => {
    await deleteEntity(id);
    toast({
      title: "Success",
      description: "Payment method deleted",
    });
  };

  console.log("paymentMethods", paymentMethods);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payment Methods</h2>
          <p className="text-slate-400">Manage available payment options</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Method
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>
                Configure a new payment method for customers
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="type">Payment Type</Label>
                <Select
                  value={newMethod.type}
                  onValueChange={(value: PaymentMethod["type"]) =>
                    setNewMethod({ ...newMethod, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="mobile_payment">
                      Mobile Payment
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  value={newMethod.name}
                  onChange={(e) =>
                    setNewMethod({ ...newMethod, name: e.target.value })
                  }
                  placeholder="e.g., Visa ending in 4242"
                />
              </div>
              <div>
                <Label htmlFor="details">Details</Label>
                <Input
                  id="details"
                  value={newMethod.details}
                  onChange={(e) =>
                    setNewMethod({ ...newMethod, details: e.target.value })
                  }
                  placeholder="e.g., **** **** **** 4242"
                />
              </div>
              <Button onClick={addPaymentMethod} className="w-full">
                Add Payment Method
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && <p>Loading payment methods...</p>}
        {error && <p className="text-red-500">{error.message}</p>}
        {paymentMethods.map((method) => (
          <Card key={method.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getIcon(method.type)}
                  <CardTitle className="text-lg">{method.brand}</CardTitle>
                </div>
                <Badge variant={method.isActive ? "default" : "secondary"}>
                  {method.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className=" mb-4">
                Last Used:
                <span className="text-slate-400 ml-1">
                  {method.lastUsed
                    ? new Date(method.lastUsed).toLocaleDateString()
                    : "Never"}
                </span>
              </p>
              <p className="font-mono mb-4">
                Mask:{" "}
                <span className="text-slate-400">
                  {method.cardNumberMasked || "N/A"}
                </span>
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleMethod(method.id)}
                  className="flex-1"
                >
                  {method.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMethod(method.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodsManager;

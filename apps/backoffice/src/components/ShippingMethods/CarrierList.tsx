import { useState } from "react";

import { Download, Package, Plus, Truck, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
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

import { useToast } from "@/hooks/use-toast";

import type { Carrier } from "@/types/carriers";

interface CarrierListProps {
  carrierEntries: CarrierEntry[];
  setCarrierEntries: (entries: CarrierEntry[]) => void;
  shippingMethods: ShippingMethod[];
}

const CarrierList = ({
  carrierEntries,
  setCarrierEntries,
  shippingMethods,
}: CarrierListProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<CarrierEntry | null>(null);
  const [formData, setFormData] = useState({
    carrierNumber: "",
    shippingMethodId: "",
    customerName: "",
    destination: "",
    status: "pending" as CarrierEntry["status"],
    estimatedDelivery: "",
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({
      carrierNumber: "",
      shippingMethodId: "",
      customerName: "",
      destination: "",
      status: "pending",
      estimatedDelivery: "",
    });
    setEditingEntry(null);
  };

  const handleOpenDialog = (entry?: CarrierEntry) => {
    if (entry) {
      setEditingEntry(entry);
      setFormData({
        carrierNumber: entry.carrierNumber,
        shippingMethodId: entry.shippingMethodId,
        customerName: entry.customerName,
        destination: entry.destination,
        status: entry.status,
        estimatedDelivery:
          entry.estimatedDelivery?.toISOString().split("T")[0] || "",
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (
      !formData.carrierNumber ||
      !formData.shippingMethodId ||
      !formData.customerName ||
      !formData.destination
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editingEntry) {
      setCarrierEntries(
        carrierEntries.map((entry) =>
          entry.id === editingEntry.id
            ? {
                ...entry,
                ...formData,
                estimatedDelivery: formData.estimatedDelivery
                  ? new Date(formData.estimatedDelivery)
                  : undefined,
                actualDelivery:
                  formData.status === "delivered"
                    ? new Date()
                    : entry.actualDelivery,
              }
            : entry
        )
      );
      toast({
        title: "Success",
        description: "Carrier entry updated successfully",
      });
    } else {
      const newEntry: CarrierEntry = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
        estimatedDelivery: formData.estimatedDelivery
          ? new Date(formData.estimatedDelivery)
          : undefined,
      };
      setCarrierEntries([...carrierEntries, newEntry]);
      toast({
        title: "Success",
        description: "Carrier entry added successfully",
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setCarrierEntries(carrierEntries.filter((entry) => entry.id !== id));
    toast({
      title: "Success",
      description: "Carrier entry deleted successfully",
    });
  };

  const getStatusBadge = (status: CarrierEntry["status"]) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, label: "Pending" },
      in_transit: { variant: "default" as const, label: "In Transit" },
      delivered: { variant: "default" as const, label: "Delivered" },
      exception: { variant: "destructive" as const, label: "Exception" },
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getShippingMethodName = (id: string) => {
    const method = shippingMethods.find((m) => m.id === id);
    return method ? `${method.name} (${method.carrier})` : "Unknown";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-white">
          <h3 className="text-lg font-semibold">Carrier Entries</h3>
          <p className="text-sm text-slate-400">
            {carrierEntries.length} packages being tracked
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleOpenDialog()}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Carrier
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingEntry ? "Edit Carrier Entry" : "Add New Carrier Entry"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="carrier" className="text-right text-slate-300">
                  Carrier #
                </Label>
                <Input
                  id="carrier"
                  value={formData.carrierNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, carrierNumber: e.target.value })
                  }
                  className="col-span-3 bg-slate-700 border-slate-600 text-white"
                  placeholder="TRK123456789"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="method" className="text-right text-slate-300">
                  Method
                </Label>
                <Select
                  value={formData.shippingMethodId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, shippingMethodId: value })
                  }
                >
                  <SelectTrigger className="col-span-3 bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select shipping method" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {shippingMethods
                      .filter((m) => m.isActive)
                      .map((method) => (
                        <SelectItem
                          key={method.id}
                          value={method.id}
                          className="text-white"
                        >
                          {method.name} ({method.carrier})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right text-slate-300">
                  Customer
                </Label>
                <Input
                  id="customer"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  className="col-span-3 bg-slate-700 border-slate-600 text-white"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="destination"
                  className="text-right text-slate-300"
                >
                  Destination
                </Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  className="col-span-3 bg-slate-700 border-slate-600 text-white"
                  placeholder="New York, NY"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right text-slate-300">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: CarrierEntry["status"]) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger className="col-span-3 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="pending" className="text-white">
                      Pending
                    </SelectItem>
                    <SelectItem value="in_transit" className="text-white">
                      In Transit
                    </SelectItem>
                    <SelectItem value="delivered" className="text-white">
                      Delivered
                    </SelectItem>
                    <SelectItem value="exception" className="text-white">
                      Exception
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="delivery" className="text-right text-slate-300">
                  Est. Delivery
                </Label>
                <Input
                  id="delivery"
                  type="date"
                  value={formData.estimatedDelivery}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estimatedDelivery: e.target.value,
                    })
                  }
                  className="col-span-3 bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700"
              >
                {editingEntry ? "Update" : "Add"} Entry
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {carrierEntries.length > 0 ? (
        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-600">
                  <TableHead className="text-slate-300">
                    Carrier Number
                  </TableHead>
                  <TableHead className="text-slate-300">Customer</TableHead>
                  <TableHead className="text-slate-300">Method</TableHead>
                  <TableHead className="text-slate-300">Destination</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">
                    Est. Delivery
                  </TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carrierEntries.map((entry) => (
                  <TableRow key={entry.id} className="border-slate-600">
                    <TableCell className="text-white font-mono">
                      {entry.carrierNumber}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {entry.customerName}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {getShippingMethodName(entry.shippingMethodId)}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {entry.destination}
                    </TableCell>
                    <TableCell>{getStatusBadge(entry.status)}</TableCell>
                    <TableCell className="text-slate-300">
                      {entry.estimatedDelivery?.toLocaleDateString() || "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(entry)}
                          className="border-slate-600 text-slate-300 hover:bg-slate-600"
                        >
                          <Upload className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(entry.id)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-12">
          <Truck className="h-12 w-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-400 mb-2">
            No carrier entries
          </h3>
          <p className="text-slate-500 mb-4">
            Start carrier packages by adding your first entry
          </p>
          <Button
            onClick={() => handleOpenDialog()}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Entry
          </Button>
        </div>
      )}
    </div>
  );
};

export default CarrierList;

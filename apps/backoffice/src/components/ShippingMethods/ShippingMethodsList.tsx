import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Upload, Download, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ShippingMethod } from "@/types/shippingMethod";

interface ShippingMethodsListProps {
  shippingMethods: ShippingMethod[];
  setShippingMethods: (methods: ShippingMethod[]) => void;
}

const ShippingMethodsList = ({
  shippingMethods,
  setShippingMethods,
}: ShippingMethodsListProps) => {
  console.log("shippingMethods", shippingMethods);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<ShippingMethod | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    carrier: "",
    estimatedDays: 1,
    cost: 0,
    active: true,
    description: "",
  });

  const { toast } = useToast();

  const resetForm = () => {
    setFormData({
      name: "",
      carrier: "",
      estimatedDays: 1,
      cost: 0,
      active: true,
      description: "",
    });
    setEditingMethod(null);
  };

  const handleOpenDialog = (method?: ShippingMethod) => {
    if (method) {
      setEditingMethod(method);
      setFormData({
        name: method.name,
        carrier: method.carrier,
        estimatedDays: method.estimatedDays,
        cost: method.cost,
        active: method.active,
        description: method.description || "",
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.carrier) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editingMethod) {
      setShippingMethods(
        shippingMethods.map((method) =>
          method.id === editingMethod.id ? { ...method, ...formData } : method
        )
      );
      toast({
        title: "Success",
        description: "Shipping method updated successfully",
      });
    } else {
      const newMethod: ShippingMethod = {
        id: Date.now().toString(),
        ...formData,
      };
      setShippingMethods([...shippingMethods, newMethod]);
      toast({
        title: "Success",
        description: "Shipping method added successfully",
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setShippingMethods(shippingMethods.filter((method) => method.id !== id));
    toast({
      title: "Success",
      description: "Shipping method deleted successfully",
    });
  };

  const toggleActive = (id: string) => {
    setShippingMethods(
      shippingMethods.map((method) =>
        method.id === id ? { ...method, active: !method.active } : method
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-white">
          <h3 className="text-lg font-semibold">Available Methods</h3>
          <p className="text-sm text-slate-400">
            {shippingMethods.length} shipping methods configured
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="group">
              <PlusCircle
                size={16}
                className="h-5 w-5 mr-2 transition-transform group-hover:scale-110"
              />
              Add Method
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle>
                {editingMethod
                  ? "Edit Shipping Method"
                  : "Add New Shipping Method"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Form Fields */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-slate-300">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="col-span-3 bg-slate-700 border-slate-600 text-white"
                  placeholder="e.g., Standard Shipping"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="carrier" className="text-right text-slate-300">
                  Carrier
                </Label>
                <Input
                  id="carrier"
                  value={formData.carrier}
                  onChange={(e) =>
                    setFormData({ ...formData, carrier: e.target.value })
                  }
                  className="col-span-3 bg-slate-700 border-slate-600 text-white"
                  placeholder="e.g., FedEx, UPS, USPS"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="days" className="text-right text-slate-300">
                  Est. Days
                </Label>
                <Input
                  id="days"
                  type="number"
                  min={1}
                  value={formData.estimatedDays}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estimatedDays: parseInt(e.target.value) || 1,
                    })
                  }
                  className="col-span-3 bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cost" className="text-right text-slate-300">
                  Cost ($)
                </Label>
                <Input
                  id="cost"
                  type="number"
                  min={0}
                  step={0.01}
                  value={formData.cost}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cost: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="col-span-3 bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="active" className="text-right text-slate-300">
                  Active
                </Label>
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, active: checked })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="description"
                  className="text-right text-slate-300"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="col-span-3 bg-slate-700 border-slate-600 text-white"
                  placeholder="Optional description"
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
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editingMethod ? "Update" : "Add"} Method
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Shipping Methods Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shippingMethods.map((method) => (
          <Card key={method.id} className="bg-slate-700 border-slate-600">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-400" />
                  <CardTitle className="text-white text-lg">
                    {method.name}
                  </CardTitle>
                </div>
                <Badge variant={method.active ? "default" : "secondary"}>
                  {method.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-slate-300 space-y-1">
                <p>
                  <span className="text-slate-400">Carrier:</span>{" "}
                  {method.carrier}
                </p>
                <p>
                  <span className="text-slate-400">Delivery:</span>{" "}
                  {method.estimatedDays} days
                </p>
                <p>
                  <span className="text-slate-400">Cost:</span> $
                  {method.cost.toFixed(2)}
                </p>
                {method.description && (
                  <p className="text-sm text-slate-400 mt-2">
                    {method.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(method)}
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-600"
                >
                  <Upload className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleActive(method.id)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-600"
                >
                  {method.active ? "Disable" : "Enable"}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(method.id)}
                >
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {shippingMethods.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-400 mb-2">
            No shipping methods
          </h3>
          <p className="text-slate-500 mb-4">
            Get started by adding your first shipping method
          </p>
          <Button onClick={() => handleOpenDialog()} className="group">
            <PlusCircle
              size={16}
              className="h-5 w-5 mr-2 transition-transform group-hover:scale-110"
            />
            Add First Method
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShippingMethodsList;

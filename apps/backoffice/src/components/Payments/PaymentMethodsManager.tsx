
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit, Plus, CreditCard, Smartphone, Building } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal' | 'bank_transfer' | 'mobile_payment';
  name: string;
  details: string;
  isActive: boolean;
  lastUsed: string;
}

const PaymentMethodsManager = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'credit_card',
      name: 'Visa ending in 4242',
      details: '**** **** **** 4242',
      isActive: true,
      lastUsed: '2024-06-15'
    },
    {
      id: '2',
      type: 'paypal',
      name: 'PayPal Account',
      details: 'user@example.com',
      isActive: true,
      lastUsed: '2024-06-14'
    },
    {
      id: '3',
      type: 'bank_transfer',
      name: 'Bank Account',
      details: 'Account ending in 7890',
      isActive: false,
      lastUsed: '2024-06-10'
    }
  ]);

  const [newMethod, setNewMethod] = useState({
    type: 'credit_card' as PaymentMethod['type'],
    name: '',
    details: ''
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'credit_card':
        return <CreditCard className="h-5 w-5" />;
      case 'paypal':
        return <Building className="h-5 w-5" />;
      case 'bank_transfer':
        return <Building className="h-5 w-5" />;
      case 'mobile_payment':
        return <Smartphone className="h-5 w-5" />;
    }
  };

  const addPaymentMethod = () => {
    if (!newMethod.name || !newMethod.details) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const method: PaymentMethod = {
      id: Date.now().toString(),
      ...newMethod,
      isActive: true,
      lastUsed: new Date().toISOString().split('T')[0]
    };

    setPaymentMethods([...paymentMethods, method]);
    setNewMethod({ type: 'credit_card', name: '', details: '' });
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Payment method added successfully"
    });
  };

  const toggleMethod = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method =>
        method.id === id ? { ...method, isActive: !method.isActive } : method
      )
    );
  };

  const deleteMethod = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
    toast({
      title: "Success",
      description: "Payment method deleted"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Payment Methods</h2>
          <p className="text-slate-600">Manage available payment options</p>
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
                  onValueChange={(value: PaymentMethod['type']) =>
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
                    <SelectItem value="mobile_payment">Mobile Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  value={newMethod.name}
                  onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                  placeholder="e.g., Visa ending in 4242"
                />
              </div>
              <div>
                <Label htmlFor="details">Details</Label>
                <Input
                  id="details"
                  value={newMethod.details}
                  onChange={(e) => setNewMethod({ ...newMethod, details: e.target.value })}
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
        {paymentMethods.map((method) => (
          <Card key={method.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getIcon(method.type)}
                  <CardTitle className="text-lg">{method.name}</CardTitle>
                </div>
                <Badge variant={method.isActive ? "default" : "secondary"}>
                  {method.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-2">{method.details}</p>
              <p className="text-sm text-slate-500 mb-4">
                Last used: {new Date(method.lastUsed).toLocaleDateString()}
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

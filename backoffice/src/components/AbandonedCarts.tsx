
import { useEffect, useState } from "react";
import { AbandonedCart, SortDirection, SortField } from "@/types/cart";
import { getMockAbandonedCarts, sendCartReminder } from "@/services/cartService";
import StatusBadge from "./StatusBadge";
import SortableHeader from "./SortableHeader";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const AbandonedCarts = () => {
  const [carts, setCarts] = useState<AbandonedCart[]>([]);
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [reminderInProgress, setReminderInProgress] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = getMockAbandonedCarts();
      setCarts(data);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedCarts = [...carts].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case "date":
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case "price":
        comparison = a.price - b.price;
        break;
      case "email":
        comparison = a.email.localeCompare(b.email);
        break;
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "lastActive":
        comparison = new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime();
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const handleSendReminder = async (cart: AbandonedCart) => {
    try {
      setReminderInProgress(cart.id);
      const success = await sendCartReminder(cart.id);
      
      if (success) {
        // Update the cart status in the local state
        setCarts(prev => 
          prev.map(c => 
            c.id === cart.id ? { ...c, status: 'reminder-sent' } : c
          )
        );
        
        toast.success(`Reminder sent to ${cart.name}`, {
          description: `Email sent to ${cart.email}`
        });
      }
    } catch (error) {
      toast.error("Failed to send reminder", {
        description: "Please try again later"
      });
    } finally {
      setReminderInProgress(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4 my-8">
        <div className="h-8 bg-secondary rounded w-1/4"></div>
        <div className="h-96 bg-secondary rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium tracking-tight">Abandoned Carts</h2>
        <span className="text-sm text-muted-foreground">
          {carts.length} {carts.length === 1 ? 'cart' : 'carts'} found
        </span>
      </div>
      
      <div className="rounded-xl overflow-hidden border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <SortableHeader
                  label="Date"
                  field="date"
                  currentSort={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Customer"
                  field="name"
                  currentSort={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Email"
                  field="email"
                  currentSort={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Amount"
                  field="price"
                  currentSort={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Last Active"
                  field="lastActive"
                  currentSort={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {sortedCarts.map((cart) => (
                <tr 
                  key={cart.id}
                  className="hover:bg-muted/30 transition-all-200"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {new Date(cart.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{cart.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {cart.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {formatCurrency(cart.price)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {formatDate(cart.lastActive)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusBadge status={cart.status} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendReminder(cart)}
                      disabled={reminderInProgress === cart.id || cart.status === 'recovered'}
                      className="transition-all-200"
                    >
                      {reminderInProgress === cart.id ? (
                        <span className="flex items-center gap-1">
                          <span className="h-3 w-3 rounded-full border-2 border-primary border-t-transparent animate-spin mr-1"></span>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5 mr-1" />
                          {cart.status === 'abandoned' ? 'Send Reminder' : 
                            cart.status === 'reminder-sent' ? 'Resend' : 'Recovered'}
                        </span>
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AbandonedCarts;

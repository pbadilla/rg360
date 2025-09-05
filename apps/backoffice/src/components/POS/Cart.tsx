import { useState } from "react";

import { Minus, Plus, ShoppingBag, Trash2, BadgeDollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  selectedSeller?: string;
}

const Cart = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  selectedSeller,
}: CartProps) => {
  const [discountPercent, setDiscountPercent] = useState(0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.21; // 21% tax
  const preDiscountTotal = subtotal + tax;

  const discountAmount = (discountPercent / 100) * preDiscountTotal;
  const total = Math.max(preDiscountTotal - discountAmount, 0);

  return (
    <Card className="p-6 h-full bg-gradient-card border-0 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Current Order</h2>
      </div>

      {selectedSeller && (
        <div className="mb-4 p-3 bg-primary/10 rounded-lg">
          <p className="text-sm font-medium">Seller: {selectedSeller}</p>
        </div>
      )}

      <div className="flex-1 space-y-3 mb-6">
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Cart is empty
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 bg-background rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.price.toFixed(2)}€ each
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>

                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>

                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 ml-2"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <>
          <Separator className="my-4" />

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>{subtotal.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (21%):</span>
              <span>{tax.toFixed(2)}€</span>
            </div>

            {/* Discount percentage input */}
            <div className="flex justify-between items-center text-sm">
              <span>Discount (%):</span>
              <Input
                type="number"
                className="w-20 h-8 text-right"
                value={discountPercent}
                onChange={(e) =>
                  setDiscountPercent(parseFloat(e.target.value) || 0)
                }
                min="0"
                max="100"
              />
            </div>

            {/* Show discount amount */}
            {discountPercent > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount Amount:</span>
                <span>- {discountAmount.toFixed(2)}€</span>
              </div>
            )}

            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-primary">{total.toFixed(2)}€</span>
            </div>
          </div>

          <Button
            onClick={onCheckout}
            className="w-full group"
            variant="primary"
            size="lg"
          >
            <BadgeDollarSign className="w-4 h-4" /> Process Payment
          </Button>
        </>
      )}
    </Card>
  );
};

export default Cart;

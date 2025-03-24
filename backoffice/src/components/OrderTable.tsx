
import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import SortableColumn from './SortableColumn';
import { cn } from '@/lib/utils';

export interface Order {
  id: string;
  name: string;
  date: Date;
  product: string;
  pvp: number;
  costPercentage: number;
  gainPercentage: number;
}

interface OrderTableProps {
  orders: Order[];
  className?: string;
}

type SortKey = 'name' | 'date' | 'product' | 'pvp' | 'costPercentage' | 'gainPercentage';
type SortDirection = 'asc' | 'desc' | null;

const OrderTable: React.FC<OrderTableProps> = ({ orders, className }) => {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (key: string) => {
    const newKey = key as SortKey;
    if (newKey === sortKey) {
      // Toggle direction if same key
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new key and default to ascending
      setSortKey(newKey);
      setSortDirection('asc');
    }
  };

  const sortedOrders = useMemo(() => {
    if (!sortKey || !sortDirection) return orders;

    return [...orders].sort((a, b) => {
      let valueA = a[sortKey];
      let valueB = b[sortKey];

      // Special handling for dates
      if (sortKey === 'date') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }

      // For sorting strings
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // For sorting numbers
      return sortDirection === 'asc'
        ? (valueA as number) - (valueB as number)
        : (valueB as number) - (valueA as number);
    });
  }, [orders, sortKey, sortDirection]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className={cn("w-full overflow-auto rounded-lg shadow-sm border", className)}>
      <div className="bg-white dark:bg-card rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <SortableColumn
                label="Name"
                sortKey="name"
                currentSortKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableColumn
                label="Date"
                sortKey="date"
                currentSortKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableColumn
                label="Product"
                sortKey="product"
                currentSortKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableColumn
                label="PVP"
                sortKey="pvp"
                currentSortKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableColumn
                label="Cost %"
                sortKey="costPercentage"
                currentSortKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableColumn
                label="Gain %"
                sortKey="gainPercentage"
                currentSortKey={sortKey}
                direction={sortDirection}
                onSort={handleSort}
              />
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr 
                key={order.id} 
                className="table-row hover:bg-muted/30 border-t border-muted"
              >
                <td className="px-6 py-4 text-sm font-medium">{order.name}</td>
                <td className="px-6 py-4 text-sm">
                  {format(new Date(order.date), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 text-sm">{order.product}</td>
                <td className="px-6 py-4 text-sm font-medium">
                  {formatCurrency(order.pvp)}
                </td>
                <td className="px-6 py-4 text-sm text-destructive">
                  {formatPercentage(order.costPercentage)}
                </td>
                <td className="px-6 py-4 text-sm text-green-600">
                  {formatPercentage(order.gainPercentage)}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;

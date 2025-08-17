import React, { useMemo } from "react";
import { useStaggeredAnimation } from "@/lib/animations";
import { useAbandonedCartStore } from "@/store/useAbandonedCartStore";
import SearchInput from "@/components/SearchInput";
import SortSelector from "../sorting/SortSelector";
import { cn } from "@/lib/utils";

export function AbandonedCartsTable() {
  const {
    entities: carts,
    isLoading,
    error,
    searchTerm,
    sortConfig,
    setSearchTerm,
    setSortConfig,
  } = useAbandonedCartStore();

  const visibleItems = useStaggeredAnimation((carts || []).length);

  const filteredCarts = useMemo(() => {
    if (!carts) return [];

    return [...carts]
      .filter((cart) => {
        const term = searchTerm.toLowerCase();
        return (
          cart.user?.toLowerCase().includes(term) ||
          cart.status.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => {
        const { key, direction } = sortConfig;

        const valueA = a[key];
        const valueB = b[key];

        if (typeof valueA === "number" && typeof valueB === "number") {
          return direction === "asc" ? valueA - valueB : valueB - valueA;
        }

        return direction === "asc"
          ? String(valueA).localeCompare(String(valueB))
          : String(valueB).localeCompare(String(valueA));
      });
  }, [carts, searchTerm, sortConfig]);

  if (isLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
        Loading abandoned carts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex flex-col items-center justify-center text-red-500">
        Error loading abandoned carts
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
        {/* Left side: Search */}
        <div className="flex items-center gap-2">
          <SearchInput
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            placeholder="Search carts ..."
            className="w-[500px] sm:w-[500px] lg:w-[500px]"
          />
        </div>

        {/* Right side: Controls */}
        <div className="flex items-center gap-4 sm:ml-auto">
          <SortSelector
            sortConfig={sortConfig}
            onSortChange={(config) =>
              setSortConfig({
                key: config.key as keyof (typeof filteredCarts)[0],
                direction: config.direction,
              })
            }
            sortOptions={[
              { value: "createdAt", label: "Date Created" },
              { value: "totalAmount", label: "Total Amount" },
              { value: "reminderCount", label: "Reminders Sent" },
              { value: "status", label: "Status" },
            ]}
          />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase">
                  Created At
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase">
                  Last Reminder
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase">
                  Reminders Sent
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCarts.map((cart, index) => (
                <tr
                  key={cart.id}
                  className={cn(
                    "transition-all duration-300",
                    !visibleItems[index] && "opacity-0 translate-y-4"
                  )}
                >
                  <td className="px-6 py-4">{cart.user}</td>
                  <td className="px-6 py-4">${cart.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 capitalize">{cart.status}</td>
                  <td className="px-6 py-4">
                    {new Date(cart.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {cart.lastReminderSentAt
                      ? new Date(cart.lastReminderSentAt).toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-6 py-4">{cart.reminderCount}</td>
                </tr>
              ))}

              {filteredCarts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No abandoned carts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

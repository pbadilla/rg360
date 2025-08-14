import React, { useMemo } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useOrderStore } from "@/store/useOrderStore";
import { formatCurrency } from "@/utils/format";
import SearchInput from "@/components/SearchInput";
import SortSelector from "@/components/SortSelector";
import SortableColumn from "../SortableColumn";

const OrderTable: React.FC = () => {
  const {
    entities: orders,
    isLoading,
    error,
    searchTerm,
    sortConfig,
    setSearchTerm,
    setSortConfig,
  } = useOrderStore();

  // Keys valid for sorting and searching — update these based on your Order type
  type SortKey =
    | "id"
    | "createdAt"
    | "status"
    | "totalAmount"
    | "paymentStatus"
    | "itemsCount";

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Search by ID or Status or payment method or product name inside items
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter((order) => {
        // Search id or status
        if (order.id.toLowerCase().includes(lowerSearch)) return true;
        if (order.status.toLowerCase().includes(lowerSearch)) return true;
        // Search payment status
        if (order.payment.status.toLowerCase().includes(lowerSearch))
          return true;
        // Search inside product names from items (assuming you have product info here)
        return order.items.some((item) =>
          item.productId.toLowerCase().includes(lowerSearch)
        );
      });
    }

    // Sort
    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        let valA: any;
        let valB: any;

        switch (sortConfig.key) {
          case "id":
            valA = a.id;
            valB = b.id;
            break;
          case "createdAt":
            valA = new Date(a.createdAt).getTime();
            valB = new Date(b.createdAt).getTime();
            break;
          case "status":
            valA = a.status;
            valB = b.status;
            break;
          case "totalAmount":
            valA = a.totalAmount;
            valB = b.totalAmount;
            break;
          // case "paymentStatus":
          //   valA = a.payment.status;
          //   valB = b.payment.status;
          //   break;
          // case "itemsCount":
          //   valA = a.items.length;
          //   valB = b.items.length;
          //   break;
          default:
            valA = "";
            valB = "";
        }

        if (typeof valA === "string" && typeof valB === "string") {
          return sortConfig.direction === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }

        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      });
    }

    return result;
  }, [orders, searchTerm, sortConfig]);

  // const handleSortChange = (key: SortKey) => {
  //   setSortConfig((prev) => {
  //     const direction =
  //       prev.key === key && prev.direction === "asc" ? "desc" : "asc";
  //     return { key, direction };
  //   });
  // };

  if (isLoading) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Failed to load orders.
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
            placeholder="Search by ID, status, payment, or product..."
            className="w-[500px] sm:w-[500px] lg:w-[500px]"
          />
        </div>

        {/* Right side: Controls */}
        <div className="flex items-center gap-4 sm:ml-auto"></div>
        <SortSelector
          sortConfig={sortConfig}
          // onSortChange={(config: { key: SortKey; direction: "asc" | "desc" }) =>
          //   setSortConfig({
          //     key: config.key,
          //     direction: config.direction,
          //   })
          // }
          sortOptions={[
            { value: "id", label: "Order ID" },
            { value: "createdAt", label: "Created Date" },
            { value: "status", label: "Status" },
            { value: "totalAmount", label: "Total Amount" },
            { value: "paymentStatus", label: "Payment Status" },
            { value: "itemsCount", label: "# Items" },
          ]}
        />
      </div>

      <div className="overflow-auto rounded-lg shadow-sm border">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <SortableColumn
                label="Order ID"
                sortKey="id"
                currentSortKey={sortConfig.key}
                direction={sortConfig.direction}
                // onSort={handleSortChange}
              />
              <SortableColumn
                label="Created Date"
                sortKey="createdAt"
                currentSortKey={sortConfig.key}
                direction={sortConfig.direction}
                // onSort={handleSortChange}
              />
              <SortableColumn
                label="Status"
                sortKey="status"
                currentSortKey={sortConfig.key}
                direction={sortConfig.direction}
                // onSort={handleSortChange}
              />
              <SortableColumn
                label="Total Amount"
                sortKey="totalAmount"
                currentSortKey={sortConfig.key}
                direction={sortConfig.direction}
                // onSort={handleSortChange}
              />
              <SortableColumn
                label="Payment Status"
                sortKey="paymentStatus"
                currentSortKey={sortConfig.key}
                direction={sortConfig.direction}
                // onSort={handleSortChange}
              />
              <SortableColumn
                label="# Items"
                sortKey="itemsCount"
                currentSortKey={sortConfig.key}
                direction={sortConfig.direction}
                // onSort={handleSortChange}
              />
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-muted/30 border-t border-muted"
                >
                  <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                  <td className="px-6 py-4 text-sm">
                    {format(new Date(order.createdAt), "MMM dd, yyyy")}
                  </td>
                  <td className="px-6 py-4 text-sm capitalize">
                    {order.status}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="px-6 py-4 text-sm capitalize">
                    {order.payment?.status || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm">{order.items.length}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-muted-foreground"
                >
                  No orders found.
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

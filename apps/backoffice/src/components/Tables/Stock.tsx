import React from "react";
import { EditableTable } from "@/components/common/EditableTable";
import { useStockStore } from "@/store/useStockStore";
import { Stock } from "@/types/stock";

export function StockTable() {
  const {
    entities: stocks,
    addEntity: addStock,
    editEntity: editStock,
    deleteEntity: deleteStock,
    isLoading,
    error,
  } = useStockStore();

  const handleAddStock = () => {
    const newStock: Omit<Stock, "id"> = {
      name: { en: "New Product Name", es: "Nuevo Nombre de Producto" },
      own_stock: false,
      brand: "",
      ean13: "",
      parentReference: "",
      reference: "",
      price: {
        pvp: 1,
        pv: 2,
        benefit_percentage: 50,
      },
      variations: [],
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updateData: new Date().toISOString(),
      colors: [],
      sizes: [],
      images: [],
      stock: 0,
      tags: [],
      isFeatured: false,
      isNewArrival: false,
    };

    addStock(newStock);
  };

  if (isLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
        Loading stock...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-red-500">
        Error loading stock
      </div>
    );
  }

  return (
    <EditableTable<Stock>
      data={stocks}
      fields={[
        { key: "name", label: "Product" },
        { key: "own_stock", label: "Own Stock" },
        { key: "brand", label: "Brand" },
        { key: "ean13", label: "EAN13" },
        // Add more fields as needed based on the Stock type definition
      ]}
      entityName="Stock"
      searchKeys={["name", "brand", "ean13"]}
      sortKeys={["name", "brand", "ean13"]}
      onAdd={handleAddStock}
      onEdit={editStock}
      onDelete={deleteStock}
      getId={(stock) => stock.id}
    />
  );
}

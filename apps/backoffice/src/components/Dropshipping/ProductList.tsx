import React, { useEffect, useState } from "react";

import { Package, Upload, Download } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useImportStore } from "@/store/useImportStore";
import { useStockStore } from "@/store/useStockStore";

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: "imported" | "pending" | "error";
  lastUpdated: string;
  supplier: string;
}

// const mockProducts: Product[] = [
//   {
//     id: "1",
//     name: "Wireless Bluetooth Headphones",
//     sku: "WBH-001",
//     price: 79.99,
//     stock: 156,
//     status: "imported",
//     lastUpdated: "2024-06-17 10:30:00",
//     supplier: "TechSupplier Co.",
//   },
//   {
//     id: "2",
//     name: "Smart Fitness Tracker",
//     sku: "SFT-002",
//     price: 129.99,
//     stock: 89,
//     status: "imported",
//     lastUpdated: "2024-06-17 09:45:00",
//     supplier: "HealthTech Ltd.",
//   },
//   {
//     id: "3",
//     name: "Portable Phone Charger",
//     sku: "PPC-003",
//     price: 24.99,
//     stock: 0,
//     status: "pending",
//     lastUpdated: "2024-06-17 08:15:00",
//     supplier: "PowerGear Inc.",
//   },
//   {
//     id: "4",
//     name: "LED Desk Lamp",
//     sku: "LDL-004",
//     price: 45.99,
//     stock: 23,
//     status: "error",
//     lastUpdated: "2024-06-17 07:20:00",
//     supplier: "LightCorp",
//   },
// ];

export const ProductList = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);

  // Get data from stores instead of mock data
  const {
    loading,
    importUniverskate,
    importRollerblade,
    importAll,
    importCSV,
    lastImportResult,
    importHistory,
  } = useImportStore();

  const {
    entities: stockProducts,
    isLoading: stockLoading,
    setPage,
    page,
    pageSize,
    total,
    error,
    refetch
  } = useStockStore();

  const products: Product[] =
  stockProducts?.map((product: any) => ({
    id: product.id ?? Math.random().toString(),
    name:
      typeof product.name === "string"
        ? product.name
        : product.name?.en || product.name?.default || "Unknown Product",
    sku: product.sku ?? "N/A",
    price:
      typeof product.price === "number"
        ? product.price
        : product.price?.pvp ?? 0, // pick a numeric field
    stock:
      typeof product.stock === "number"
        ? product.stock
        : product.stock?.quantity ?? 0, // pick a numeric field
    status: determineProductStatus(product),
    lastUpdated:
      product.updatedAt || product.lastModified || new Date().toISOString(),
    supplier: product.supplier || product.source || "Unknown",
  })) || [];


  function determineProductStatus(
    product: any
  ): "imported" | "pending" | "error" {
    // Check if this product was in the last import
    if (
      lastImportResult?.success &&
      lastImportResult?.products?.some((p: any) => p.sku === product.sku)
    ) {
      return "imported";
    }

    // Check import history for this product
    const productHistory = importHistory?.find((history: any) =>
      history.products?.some((p: any) => p.sku === product.sku)
    );

    if (productHistory) {
      return productHistory.success ? "imported" : "error";
    }

    // Default logic
    if (product.stock > 0) return "imported";
    if (product.error || product.hasError) return "error";
    return "pending";
  }

  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "imported":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Imported
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pending
          </Badge>
        );
      case "error":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Error
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const handleImport = async (
    type: "universkate" | "rollerblade" | "all" | "csv",
    csvData?: FormData
  ) => {
    try {
      let result;

      if (type === "universkate") {
        result = await importUniverskate();
      } else if (type === "rollerblade") {
        result = await importRollerblade();
      } else if (type === "all") {
        result = await importAll();
      } else if (type === "csv" && csvData) {
        result = await importCSV(csvData);
      }

      // Show success/error message
      if (result?.success) {
        alert(`Import successful! Imported ${result.count || 0} products.`);
      } else {
        alert(`Import failed: ${result?.error || "Unknown error"}`);
      }

      // Refresh the product list
      await refetch();
    } catch (error) {
      console.error("Import error:", error);
      alert(
        `Import failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
      const formData = new FormData();
      formData.append("file", file);
      handleImport("csv", formData);
    } else {
      alert("Please select a valid CSV file");
    }
  };

  const handleRefresh = async () => {
    await refetch();
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  console.log("products", products);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Product List</h2>
        </div>
        <Button onClick={() => handleImport("csv")} disabled={loading}>
          <Upload className="h-4 w-4" />
          Import Products from CSV
        </Button>

        <Button onClick={() => handleImport("rollerblade")} disabled={loading}>
          <Download className="h-4 w-4" />
          Import Rollerblade Products
        </Button>

        <Button onClick={() => handleImport("universkate")} disabled={loading}>
          <Download className="h-4 w-4" />
          Import Universkate Products
        </Button>

        <Button onClick={() => handleImport("all")} disabled={loading}>
          <Download className="h-4 w-4" />
          Import All Products
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-200">
                Product
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-200">
                SKU
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-200">
                Price
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-200">
                Stock
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-200">
                Status
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-200">
                Supplier
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-200">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-100 text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-500">
                    {product.name}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-500">{product.id}</td>
                <td className="py-3 px-4 text-gray-500 font-medium">
                  {product.price} €
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`${
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    } font-medium`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="py-3 px-4">{getStatusBadge(product.status)}</td>
                <td className="py-3 px-4 text-gray-500">{product.supplier}</td>
                <td className="py-3 px-4 text-gray-500 text-sm">
                  {product.lastUpdated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Showing {products.length} products
      </div>
    </Card>
  );
};

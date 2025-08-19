import React, { useState } from "react";

import { Package, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    sku: "WBH-001",
    price: 79.99,
    stock: 156,
    status: "imported",
    lastUpdated: "2024-06-17 10:30:00",
    supplier: "TechSupplier Co.",
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    sku: "SFT-002",
    price: 129.99,
    stock: 89,
    status: "imported",
    lastUpdated: "2024-06-17 09:45:00",
    supplier: "HealthTech Ltd.",
  },
  {
    id: "3",
    name: "Portable Phone Charger",
    sku: "PPC-003",
    price: 24.99,
    stock: 0,
    status: "pending",
    lastUpdated: "2024-06-17 08:15:00",
    supplier: "PowerGear Inc.",
  },
  {
    id: "4",
    name: "LED Desk Lamp",
    sku: "LDL-004",
    price: 45.99,
    stock: 23,
    status: "error",
    lastUpdated: "2024-06-17 07:20:00",
    supplier: "LightCorp",
  },
];

export const ProductList = () => {
  const [products] = useState<Product[]>(mockProducts);

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

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Product List</h2>
        </div>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Import Products
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Product
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                SKU
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Price
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Stock
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Status
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Supplier
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">
                    {product.name}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{product.sku}</td>
                <td className="py-3 px-4 text-gray-900 font-medium">
                  ${product.price}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`${product.stock > 0 ? "text-green-600" : "text-red-600"} font-medium`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="py-3 px-4">{getStatusBadge(product.status)}</td>
                <td className="py-3 px-4 text-gray-600">{product.supplier}</td>
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

import type React from "react";
import { useState } from "react";

import { toast } from "sonner";

import { AlertCircle } from "lucide-react";

import ExportButton from "@/components/csv/ExportButton";
import FileUpload from "@/components/csv/FileUpload";
import FTPImport from "@/components/csv/FTPImport";
import DataTable from "@/components/DataTable";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useStoreCSVData } from "@/store/storeCSVData";

// import { addProduct } from '@/store/storeProducts';
import type { Product } from "@/types/product";

import type { CSVData } from "@/utils/csvUtils";

interface CSVImportExportProps {
  title: string;
  store: string;
}

const CSVImportExport: React.FC<CSVImportExportProps> = ({ title, store }) => {
  const [csvData, setCsvData] = useState<CSVData>({ headers: [], rows: [] });
  const [activeTab, setActiveTab] = useState("import");
  const { mutate } = useStoreCSVData();

  const handleCSVImport = (csvData: {
    headers: string[];
    rows: string[][];
  }) => {
    const { headers, rows } = csvData;

    console.log("Entra?", rows);
    console.log("Entra headers?", headers);

    const headerMap: Record<string, keyof Product> = {
      Id: "id",
      Reference: "reference",
      Ean: "ean13",
      Marque: "brand",
      Nom: "name",
      Prix: "price",
      Brand: "category",
      Image: "image",
      Stock: "stock",
    };

    rows.forEach((row) => {
      const product = headers.reduce<Partial<Record<keyof Product, any>>>(
        (obj, header, index) => {
          const mappedKey = headerMap[header];

          if (mappedKey) {
            let value: unknown = row[index];

            if (
              mappedKey === "price" ||
              mappedKey === "stock" ||
              mappedKey === "ean13"
            ) {
              value = parseFloat(row[index]) || 0;
            }

            obj[mappedKey] = value;
          }

          return obj;
        },
        {},
      );

      // if (product.name && product.price) {
      //   addProduct({
      //     id: String(product.ean13),
      //     reference: product.reference || '',
      //     ean13: product.ean13 as number || 0,
      //     brand: product.brand || 'Unknown',
      //     name: product.name,
      //     description: product.description || '',
      //     price: product.price as number || 0,
      //     category: product.category || 'Uncategorized',
      //     image: product.image || '',
      //     stock: product.stock as number || 0,
      //   });
      // }
    });
  };

  const handleFileLoaded = (data: CSVData) => {
    // Parse CSV data
    const parsedCSVData = {
      headers: data.headers,
      rows: data.rows.map((row) => row.map((cell) => cell.trim())),
    };
    setCsvData(data);

    // Store data using React Query
    mutate({ parsedData: data, title: store });

    // Change to save the data into the mongoDB DDBB
    // first mapped and transform and then save it
    // this what I have in the mongoDB atlas DDBB
    // {"_id":{"$oid":"67d08c5ae001af851f635932"},
    // "name":"Wireless Keyboard",
    // "description":"Ergonomic wireless keyboard with backlight.",
    // "price":{"$numberDouble":"59.99"},
    // "category":{"$oid":"67d08c5ae001af851f635933"},
    // "vendorId":{"$oid":"67d08c5ae001af851f635931"},
    // "stock":{"$numberInt":"100"},
    // "images":["keyboard1.jpg"],
    // "SKU":"LOGI1234",
    // "rating":{"$numberDouble":"4.7"},
    // "createdAt":{"$date":{"$numberLong":"1741720666722"}},
    // "updatedAt":{"$date":{"$numberLong":"1741720666722"}}}

    // [
    //   "Reference": "CKIT-FR-VI-5-8",
    //   "Ean" "4891844449027",
    //   "Prix" "25.000000",
    //   "Stock""0",
    //   "Nom": "SEBA FR CUSTOM KIT 38-42 VIOLET",
    //   "Image": "https://www.universkate.com/46-large_default/seba-fr-custom-kit.jpg",
    //   "Marque": "SEBA",
    //   "Refmere" "CKIT-FR",
    //   "category": "" <- from mapping,
    // ]

    // vendors [
    //   {"_id":{"$oid":"67d08c5ae001af851f635931"},
    //   "name":"Tech Store Inc.",
    //   "owner":{"$oid":"67d08c5ae001af851f635930"},
    //   "email":"vendor@example.com",
    //   "status":"active",
    //   "createdAt":{"$date":{"$numberLong":"1741720666672"}},
    //   "updatedAt":{"$date":{"$numberLong":"1741720666672"}}}
    // ]

    toast.success("Products saved correctly!!");

    // Process CSV rows and add products
    handleCSVImport(parsedCSVData);

    // Switch tab to show data
    setActiveTab("data");
  };

  const hasData = csvData.headers.length > 0 && csvData.rows.length > 0;

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>
          Import, view, and export CSV data with ease
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="automatic_import">Automatic Import</TabsTrigger>
            <TabsTrigger value="manual_import">Manual Import</TabsTrigger>
            <TabsTrigger value="data" disabled={!hasData}>
              Data View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="automatic_import" className="pt-4">
            <FTPImport />
          </TabsContent>

          <TabsContent value="manual_import" className="pt-4">
            <FileUpload onFileLoaded={handleFileLoaded} />
          </TabsContent>

          <TabsContent value="data" className="pt-4">
            {hasData ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      <strong>{csvData.rows.length}</strong> articles imported
                    </p>
                  </div>
                  <ExportButton data={csvData} />
                </div>

                <DataTable data={csvData} store={store} />
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No data available. Please import a CSV file first.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CSVImportExport;

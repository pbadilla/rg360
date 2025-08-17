import { ChangeEvent, useState } from "react";
import { AlertCircle, CheckCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CSVRow {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export const CSVImport = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [stats, setStats] = useState<{
    total: number;
    succeeded: number;
    failed: number;
  }>({
    total: 0,
    succeeded: 0,
    failed: 0,
  });

  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setUploadStatus("idle");
      setErrorMessage("");
    } else {
      setFile(null);
      setUploadStatus("error");
      setErrorMessage("Please select a valid CSV file");
    }
  };

  const parseCSV = (text: string): CSVRow[] => {
    const lines = text.split("\n");
    const headers = lines[0]
      .split(",")
      .map((header) => header.trim().toLowerCase());

    // Check for required headers
    const requiredHeaders = ["name", "price", "stock", "category"];
    const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h));

    if (missingHeaders.length > 0) {
      throw new Error(`Missing required columns: ${missingHeaders.join(", ")}`);
    }

    const results: CSVRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Handle quoted values with commas inside them
      const values: string[] = [];
      let currentValue = "";
      let insideQuotes = false;

      for (let j = 0; j < line.length; j++) {
        const char = line[j];

        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === "," && !insideQuotes) {
          values.push(currentValue.trim());
          currentValue = "";
        } else {
          currentValue += char;
        }
      }

      values.push(currentValue.trim());

      const row: Partial<CSVRow> = {};

      headers.forEach((header, index) => {
        const value = values[index]?.replace(/^"|"$/g, "") || "";

        if (header === "price") {
          row.price = parseFloat(value);
        } else if (header === "stock") {
          row.stock = parseInt(value, 10);
        } else if (header === "name") {
          row.name = value;
        } else if (header === "description") {
          row.description = value;
        } else if (header === "category") {
          row.category = value;
        }
      });

      results.push(row as CSVRow);
    }

    return results;
  };

  const uploadProducts = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadStatus("idle");
    setErrorMessage("");

    try {
      const text = await file.text();
      const products = parseCSV(text);

      setStats({ total: products.length, succeeded: 0, failed: 0 });

      const results = await Promise.all(
        products.map(async (product) => {
          try {
            // Validate product data
            if (
              !product.name ||
              isNaN(product.price) ||
              isNaN(product.stock) ||
              !product.category
            ) {
              throw new Error("Invalid product data");
            }

            const { error } = await supabase.from("products").insert([
              {
                name: product.name,
                description: product.description || "",
                price: product.price,
                stock: product.stock,
                category: product.category,
              } as any,
            ]); // Use 'as any' if the schema mismatch persists

            if (error) throw error;
            return { success: true };
          } catch (error) {
            return { success: false, error };
          }
        })
      );

      const succeeded = results.filter((r) => r.success).length;
      const failed = results.length - succeeded;

      setStats({ total: products.length, succeeded, failed });
      setUploadStatus(failed === 0 ? "success" : "error");

      toast({
        title: succeeded > 0 ? "Products uploaded" : "Upload failed",
        description: `Successfully imported ${succeeded} of ${products.length} products.`,
        variant: failed === 0 ? "default" : "destructive",
      });
    } catch (error: any) {
      setUploadStatus("error");
      setErrorMessage(error.message || "Failed to process CSV file");

      toast({
        title: "Import error",
        description: error.message || "Failed to process CSV file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Products from CSV</CardTitle>
        <CardDescription>
          Upload a CSV file to add multiple products at once
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary transition-colors">
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="csv-upload"
            className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
          >
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-base font-medium">
              {file ? file.name : "Click to select a CSV file"}
            </span>
            <span className="text-sm text-muted-foreground mt-1">
              Your CSV must include columns for: name, price, stock, and
              category
            </span>
          </label>
        </div>

        {uploadStatus === "error" && (
          <div className="flex items-start gap-3 p-3 bg-red-50 text-red-800 rounded-md">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Error</p>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {uploadStatus === "success" && (
          <div className="flex items-start gap-3 p-3 bg-green-50 text-green-800 rounded-md">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Import Successful</p>
              <p>All products were imported successfully.</p>
            </div>
          </div>
        )}

        {stats.total > 0 && (
          <div className="flex flex-col gap-2 p-3 rounded-md text-sm">
            <div className="font-medium">Import Results</div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="text-gray-500">Total</div>
                <div className="text-lg font-semibold">{stats.total}</div>
              </div>
              <div>
                <div className="text-green-600">Succeeded</div>
                <div className="text-lg font-semibold">{stats.succeeded}</div>
              </div>
              <div>
                <div className="text-red-600">Failed</div>
                <div className="text-lg font-semibold">{stats.failed}</div>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={uploadProducts}
          disabled={!file || isUploading}
          className="w-full"
        >
          {isUploading ? "Importing..." : "Import Products"}
        </Button>
      </CardContent>
    </Card>
  );
};

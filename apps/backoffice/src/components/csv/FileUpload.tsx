import type React from "react";
import { useRef, useState } from "react";

import { toast } from "sonner";

import { FileUp, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { type CSVData, parseCSV } from "@/utils/csvUtils";

interface FileUploadProps {
  onFileLoaded: (data: CSVData) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = parseCSV(text);

        if (data.headers.length === 0) {
          toast.error("The CSV file appears to be empty or invalid");
          return;
        }

        onFileLoaded(data);
        toast.success("CSV file loaded successfully");
      } catch (error) {
        console.error("Error parsing CSV file:", error);
        toast.error("Failed to parse CSV file. Please check the format.");
      }
    };

    reader.onerror = () => {
      toast.error("Error reading file");
    };

    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];

      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        toast.error("Please upload a CSV file");
        return;
      }

      processFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card
      className={`p-8 border-2 border-dashed transition-colors ${
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/20"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <FileUp
          className="w-12 h-12 text-muted-foreground"
          aria-hidden="true"
        />

        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">Upload CSV File</h3>
          <p className="text-sm text-muted-foreground">
            Drag and drop your CSV file here, or click to browse
          </p>
        </div>

        <Button onClick={handleButtonClick} variant="outline" className="mt-2">
          <Upload className="w-4 h-4 mr-2" />
          Choose File
        </Button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept=".csv"
          className="hidden"
        />
      </div>
    </Card>
  );
};

export default FileUpload;

import React from "react";

import { FileDown } from "lucide-react";

import ImportButton from "@/components/csv/ImportButton";

const Index = () => {
  return (
    <div className="flex items-center justify-center p-4 rounded-lg bg-card text-card-foreground shadow-sm p-8 border-2 border-dashed transition-colors border-muted-foreground/20">
      <div className="flex flex-col items-center justify-center gap-4">
        <FileDown
          className="w-12 h-12 text-muted-foreground"
          aria-hidden="true"
        />
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">Upload File</h3>
          <p className="text-sm text-muted-foreground">
            Click the button below to import your files
          </p>
        </div>
        <ImportButton
          onImportComplete={() => {
            console.log("Import completed!");
          }}
        />
      </div>
    </div>
  );
};

export default Index;

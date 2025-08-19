import type React from "react";
import { useState } from "react";

import { Import } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { toast } from "@/hooks/use-toast";

interface ImportButtonProps {
  onImportComplete?: () => void;
}

const ImportButton: React.FC<ImportButtonProps> = ({ onImportComplete }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateImport = () => {
    // launch API import of FTP
    setIsImporting(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + 10;

        if (nextProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsImporting(false);
            toast({
              title: "Import successful",
              description: "Your file has been imported successfully",
              variant: "default",
            });
            if (onImportComplete) onImportComplete();
          }, 500);
          return 100;
        }

        return nextProgress;
      });
    }, 400);
  };

  return (
    <div className="flex flex-col w-full max-w-xs">
      <Button
        onClick={simulateImport}
        disabled={isImporting}
        className="mb-2 flex items-center gap-2"
      >
        <Import className="h-4 w-4" />
        {isImporting ? "Importing..." : "Import"}
      </Button>

      {isImporting && (
        <div className="w-full mt-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {progress}%
          </p>
        </div>
      )}
    </div>
  );
};

export default ImportButton;

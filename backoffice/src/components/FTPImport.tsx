
import React from "react";
import ImportButton from "@/components/ImportButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">File Import</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              Click the button below to import your files
            </p>
          </div>
          
          <ImportButton 
            onImportComplete={() => {
              console.log("Import completed!");
            }} 
          />
  
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;

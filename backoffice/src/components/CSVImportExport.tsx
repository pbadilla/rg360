
import React, { useState } from 'react';
import { useStoreCSVData } from '@/store/storeCSVData';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CSVData } from '@/utils/csvUtils';

import FileUpload from './FileUpload';
import DataTable from './DataTable';
import ExportButton from './ExportButton';

import { AlertCircle } from 'lucide-react';

interface CSVImportExportProps {
  title: string;
  store: string;
}

const CSVImportExport: React.FC<CSVImportExportProps> = ({ title, store }) => {
  const [csvData, setCsvData] = useState<CSVData>({ headers: [], rows: [] });
  const [activeTab, setActiveTab] = useState('import');
  const { mutate } = useStoreCSVData();
  
  const handleFileLoaded = (data: CSVData) => {
    setCsvData(data);
    console.log("data"  , data);
    // addData to react-query
    mutate({ parsedData: data, title: store });
    setActiveTab('data');
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="import">Import</TabsTrigger>
            <TabsTrigger value="data" disabled={!hasData}>Data View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="import" className="pt-4">
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

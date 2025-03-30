
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CSVData, downloadCSV } from '@/utils/csvUtils';
import { toast } from 'sonner';

interface ExportButtonProps {
  data: CSVData;
  filename?: string;
  disabled?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ 
  data, 
  filename = 'export.csv',
  disabled = false
}) => {
  const handleExport = () => {
    if (data.headers.length === 0 || data.rows.length === 0) {
      toast.error('No data to export');
      return;
    }
    
    try {
      downloadCSV(data, filename);
      toast.success('CSV file exported successfully');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      toast.error('Failed to export CSV file');
    }
  };

  return (
    <Button 
      onClick={handleExport} 
      disabled={disabled || data.headers.length === 0}
      variant="default"
    >
      <Download className="w-4 h-4 mr-2" />
      Export CSV
    </Button>
  );
};

export default ExportButton;

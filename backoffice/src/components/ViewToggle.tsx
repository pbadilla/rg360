
import React from 'react';
import { ViewMode } from '@/types/product';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, Table2 } from 'lucide-react';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewChange }) => {
  return (
    <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && onViewChange(value as ViewMode)}>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <LayoutGrid className="h-4 w-4 mr-1" />
        Grid
      </ToggleGroupItem>
      <ToggleGroupItem value="table" aria-label="Table view">
        <Table2 className="h-4 w-4 mr-1" />
        Table
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ViewToggle;

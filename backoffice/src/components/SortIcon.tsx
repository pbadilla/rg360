
import React from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type SortDirection = 'asc' | 'desc' | null;

interface SortIconProps {
  direction: SortDirection;
  className?: string;
}

const SortIcon: React.FC<SortIconProps> = ({ direction, className }) => {
  if (direction === 'asc') {
    return <ChevronUp className={cn("w-4 h-4 transition-all", className)} />;
  } else if (direction === 'desc') {
    return <ChevronDown className={cn("w-4 h-4 transition-all", className)} />;
  }
  return <ChevronsUpDown className={cn("w-4 h-4 opacity-30 transition-all", className)} />;
};

export default SortIcon;

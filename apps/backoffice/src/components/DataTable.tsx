import type React from "react";
import { useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { CSVData } from "@/utils/csvUtils";

type SortDirection = "asc" | "desc" | null;

const ROWS_PER_PAGE = 10;

interface DataTableProps {
  data: CSVData;
  store: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, store }) => {
  const [filteredProducts, setFilteredProducts] = useState(data.rows);

  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (!filteredProducts || filteredProducts.length === 0) {
    return <div>No products available</div>;
  }

  const handleSort = (columnIndex: number) => {
    if (sortColumn === columnIndex) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortColumn(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(columnIndex);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (columnIndex: number) => {
    if (sortColumn !== columnIndex) return null;

    if (sortDirection === "asc") {
      return <ChevronUp className="w-4 h-4 ml-1" />;
    } else if (sortDirection === "desc") {
      return <ChevronDown className="w-4 h-4 ml-1" />;
    }

    return null;
  };

  // Sort data if needed
  const displayRows = [...filteredProducts];
  if (sortColumn !== null && sortDirection !== null) {
    displayRows.sort((a, b) => {
      const valueA = a[sortColumn] || "";
      const valueB = b[sortColumn] || "";

      const numA = Number(valueA);
      const numB = Number(valueB);

      if (!isNaN(numA) && !isNaN(numB)) {
        return sortDirection === "asc" ? numA - numB : numB - numA;
      }

      return sortDirection === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }

  const totalPages = Math.ceil(displayRows.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const paginatedRows = displayRows.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-md overflow-hidden">
        <ScrollArea className="h-[500px]">
          <Table className="border-collapse text-black">
            <TableHeader className="bg-muted/50 sticky top-0">
              <TableRow className="border-b border-b-border">
                {/* Example headers based on product properties */}
                {Object.keys(filteredProducts[0]).map((header, index) => (
                  <TableHead
                    key={index}
                    className="font-semibold bg-slate-100 border-r border-r-border last:border-r-0"
                  >
                    <Button
                      variant="ghost"
                      className="p-0 h-auto font-semibold hover:bg-transparent w-full justify-start"
                      onClick={() => handleSort(index)}
                    >
                      <span className="flex items-center">
                        {header}
                        {getSortIcon(index)}
                      </span>
                    </Button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRows.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={`border-b hover:bg-slate-50 ${rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                >
                  {Object.values(row).map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className="border-r border-r-border last:border-r-0"
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {getPaginationItems()}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default DataTable;

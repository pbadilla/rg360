import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { Edit2, PlusCircle, Save, Trash2, AlertCircle } from "lucide-react";

import { ImageUpload } from "@/components/csv/ImageUpload";
import SearchInput from "@/components/SearchInput";
import SortSelector from "@/components/sorting/SortSelector";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useStaggeredAnimation } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { searchEntities } from "@/utils/searchEntities";
import { sortEntities } from "@/utils/sortEntities";

import StockProductDialog from "@/components/Stock/StockProductDialog";

type Field<T> = {
  key: keyof T;
  label: string;
  type?: "text" | "textarea" | "image";
};

interface EditableTableProps<T> {
  data: T[];
  fields: Field<T>[];
  entityName: string;
  searchKeys: (keyof T)[];
  sortKeys: (keyof T)[];
  onAdd: () => void;
  onEdit: (updated: T) => void;
  onDelete: (id: string) => void;
  getId: (item: T) => string;
  pageSize?: number;
}

export function EditableTable<T extends Record<string, any>>({
  data,
  fields,
  entityName,
  searchKeys,
  sortKeys,
  onAdd,
  onEdit,
  onDelete,
  getId,
  pageSize = 10,
}: EditableTableProps<T>) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<T>>({});
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({ key: sortKeys[0].toString(), direction: "asc" });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const visibleItems = useStaggeredAnimation(data.length);

  // filter + sort
  const filteredItems = useMemo(() => {
    const searched = searchEntities(data, searchTerm, searchKeys);
    return sortEntities(searched, sortConfig);
  }, [data, searchTerm, sortConfig]);

  // calculate pagination
  const totalPages = Math.ceil(filteredItems.length / pageSize);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  const handleInputChange = (key: keyof T, value: any) => {
    setEditValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveClick = (id: string) => {
    onEdit({ ...editValues, id } as unknown as T);
    setEditingId(null);
    setEditValues({});
    setIsAdding(false);
    toast.success(`${entityName} updated successfully`);
  };

  const handleEditClick = (item: T) => {
    setEditingId(getId(item));
    setEditValues({ ...item });
  };

  const handleDeleteClick = (id: string) => {
    onDelete(id);
    if (editingId === id) {
      setEditingId(null);
      setEditValues({});
    }
    toast.success(`${entityName} deleted successfully`);
  };

  const handleImageChange = (key: keyof T, id: string, value: string) => {
    if (editingId === id) {
      setEditValues((prev) => ({ ...prev, [key]: value }));
    } else {
      const item = data.find((i) => getId(i) === id);
      if (item) {
        onEdit({ ...item, [key]: value } as T);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
        {/* Search + Add buttons */}
        <div className="flex items-center gap-2">
          <SearchInput
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            placeholder={`Search ${entityName.toLowerCase()}...`}
            className="w-[500px]"
          />
          <Button onClick={onAdd} className="group">
            <PlusCircle size={16} className="h-5 w-5 mr-2" />
            {isAdding ? "Adding..." : `Add ${entityName}`}
          </Button>

          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="group"
            disabled={isAdding}
          >
            <PlusCircle size={16} className="h-5 w-5 mr-2" />
            {isAdding ? "Adding..." : "Add Product by Image"}
          </Button>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-4 sm:ml-auto">
          <SortSelector
            sortConfig={sortConfig}
            onSortChange={(config) =>
              setSortConfig({
                key: config.key,
                direction: config.direction,
              })
            }
            sortOptions={sortKeys.map((key) => ({
              value: key.toString(),
              label: String(key).charAt(0).toUpperCase() + String(key).slice(1),
            }))}
          />
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-hidden rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/40">
                {fields.map((field) => (
                  <th
                    key={String(field.key)}
                    className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    {field.label}
                  </th>
                ))}
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item, index) => {
                const id = getId(item);
                return (
                  <tr
                    key={id}
                    className={cn(
                      "transition-all duration-300",
                      !visibleItems[index] && "opacity-0 translate-y-4",
                      editingId === id && "bg-accent/5",
                    )}
                  >
                  {fields.map((field) => {
                    const value =
                      editingId === id
                        ? editValues[field.key]
                        : item[field.key];

                    const safeValue =
                      value === undefined || value === null ? "" : String(value);

                    return (
                      <td
                        key={String(field.key)}
                        className="px-6 py-4"
                        data-testid="editable-table-cell"
                        data-value={String(field.key)}
                      >
                        {field.type === "image" ? (
                          <ImageUpload
                            currentImage={safeValue}
                            onImageChange={(img) =>
                              handleImageChange(field.key, id, img)
                            }
                          />
                        ) : editingId === id ? (
                          field.type === "textarea" ? (
                            <textarea
                              value={safeValue}
                              onChange={(e) =>
                                handleInputChange(field.key, e.target.value)
                              }
                              aria-label={field.label}
                              placeholder={field.label}
                              className="w-full bg-background border-b border-border p-2 rounded-md"
                              rows={2}
                            />
                          ) : (
                            <input
                              type="text"
                              value={safeValue}
                              onChange={(e) =>
                                handleInputChange(field.key, e.target.value)
                              }
                              aria-label={field.label}
                              placeholder={field.label}
                              className="w-full bg-background border-b border-border p-2 rounded-md"
                            />
                          )
                        ) : (
                            <div className="max-w-md line-clamp-2">
                              {safeValue ? (
                                safeValue
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-muted px-3 py-0.5 text-xs font-medium text-muted-foreground">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  No value
                                </span>
                              )}
                            </div>  
                        )}
                      </td>
                    );
                  })}

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {editingId === id ? (
                          <button
                            onClick={() => handleSaveClick(id)}
                            className="p-2 text-accent hover:text-accent/80 transition-colors"
                          >
                            <Save size={18} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEditClick(item)}
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteClick(id)}
                          className="p-2 text-destructive hover:text-destructive/80 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginatedItems.length === 0 && (
                <tr>
                  <td
                    colSpan={fields.length + 1}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No {entityName.toLowerCase()} found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-4 mb-4">
          <PaginationPrevious
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          />
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1),
              )
              .map((page, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && page - prev > 1;

                return (
                  <React.Fragment key={page}>
                    {showEllipsis && <PaginationEllipsis />}
                    <PaginationItem>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  </React.Fragment>
                );
              })}
          </PaginationContent>
          <PaginationNext
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}

      {/* Add/Edit Dialog */}
      <StockProductDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={(product) => {
          const { _id, ...productWithoutId } = product;
          setIsAddDialogOpen(false);
        }}
        isLoading={isAdding}
      />
    </div>
  );
}

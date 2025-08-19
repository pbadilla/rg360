import React, { useMemo, useState } from "react";

import { toast } from "sonner";

import { Edit2, PlusCircle, Save, Trash2 } from "lucide-react";

import { ImageUpload } from "@/components/csv/ImageUpload";
import SearchInput from "@/components/SearchInput";
import SortSelector from "@/components/sorting/SortSelector";
import { Button } from "@/components/ui/button";

import { useStaggeredAnimation } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { searchEntities } from "@/utils/searchEntities";
import { sortEntities } from "@/utils/sortEntities";

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
}: EditableTableProps<T>) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<T>>({});
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({ key: sortKeys[0].toString(), direction: "asc" });

  const visibleItems = useStaggeredAnimation(data.length);

  const filteredItems = useMemo(() => {
    const searched = searchEntities(data, searchTerm, searchKeys);
    return sortEntities(searched, sortConfig);
  }, [data, searchTerm, sortConfig]);

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
      onEdit({ ...item, [key]: value } as T);
    }
  };

  console.log("data", data);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
        {/* Left side: Search */}
        <div className="flex items-center gap-2">
          <SearchInput
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            placeholder={`Search ${entityName.toLowerCase()}...`}
            className="w-[500px] sm:w-[500px] lg:w-[500px]"
          />
          <Button onClick={onAdd} className="group">
            <PlusCircle
              size={16}
              className="h-5 w-5 mr-2 transition-transform group-hover:scale-110"
            />
            {isAdding ? "Adding..." : `Add ${entityName}`}
          </Button>
        </div>

        {/* Right side: Controls */}
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
              {filteredItems.map((item, index) => {
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
                    {fields.map((field) => (
                      <td
                        key={String(field.key)}
                        className="px-6 py-4"
                        data-testid="editable-table-cell"
                        data-value={String(field.key)}
                      >
                        {field.type === "image" ? (
                          <ImageUpload
                            currentImage={
                              editingId === id
                                ? (editValues[field.key] as string)
                                : item[field.key]
                            }
                            onImageChange={(img) =>
                              handleImageChange(field.key, id, img)
                            }
                          />
                        ) : editingId === id ? (
                          field.type === "textarea" ? (
                            <textarea
                              value={(editValues[field.key] as string) || ""}
                              onChange={(e) =>
                                handleInputChange(field.key, e.target.value)
                              }
                              className="w-full bg-background border-b border-border p-2 rounded-md"
                              rows={2}
                            />
                          ) : (
                            <input
                              type="text"
                              value={(editValues[field.key] as string) || ""}
                              onChange={(e) =>
                                handleInputChange(field.key, e.target.value)
                              }
                              className="w-full bg-background border-b border-border p-2 rounded-md"
                            />
                          )
                        ) : (
                          <div className="max-w-md line-clamp-2">
                            {String(item[field.key])}
                          </div>
                        )}
                      </td>
                    ))}
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
              {filteredItems.length === 0 && (
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
    </div>
  );
}

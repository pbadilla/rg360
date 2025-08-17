import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useStaggeredAnimation } from "@/lib/animations";
import { ImageUpload } from "../csv/ImageUpload";
import { Edit2, Save, Trash2, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import SearchInput from "@/components/SearchInput";
import SortSelector from "../sorting/SortSelector";

import { Category } from "@/types/category";
import { searchEntities } from "@/utils/searchEntities";
import { sortEntities } from "@/utils/sortEntities";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Button } from "@/components/ui/button";

export function CategoryTable() {
  const {
    entities: categories,
    isLoading,
    error,
    searchTerm,
    sortConfig,
    setSearchTerm,
    setSortConfig,
    addEntity: addCategory,
    editEntity: editCategory,
    deleteEntity: deleteCategory,
  } = useCategoryStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Category>>({});
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const visibleItems = useStaggeredAnimation((categories || []).length);

  const filteredCategories = useMemo(() => {
    const searched = searchEntities(categories || [], searchTerm, [
      "name",
      "description",
    ]);
    // Only allow "name" or "description" as sort keys
    if (sortConfig.key === "name" || sortConfig.key === "description") {
      return sortEntities(
        searched,
        sortConfig as {
          key: "name" | "description";
          direction: typeof sortConfig.direction;
        }
      );
    }
    return searched;
  }, [categories, searchTerm, sortConfig]);

  const handleEditClick = (category: Category) => {
    setEditingId(category.id);
    setEditValues({ ...category });
  };

  const handleSaveClick = (id: string) => {
    editCategory({ ...editValues, id } as Category);
    setEditingId(null);
    setEditValues({});
    toast.success("Category updated successfully");
  };

  const handleDeleteClick = (id: string) => {
    deleteCategory(id);
    if (editingId === id) {
      setEditingId(null);
      setEditValues({});
    }
    toast.success("Category deleted successfully");
  };

  const handleInputChange = (key: keyof Category, value: string) => {
    setEditValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (id: string, image: string) => {
    if (editingId === id) {
      setEditValues((prev) => ({ ...prev, image }));
    } else {
      editCategory({ ...categories.find((c) => c.id === id)!, image });
      toast.success("Image updated successfully");
    }
  };

  const handleAddCategory = () => {
    const newCategory = {
      name: "New Category",
      description: "Describe your category",
      image: "",
    };
    addCategory(newCategory);
    const newId = `${Date.now()}`;
    setEditingId(newId);
    setEditValues({ ...newCategory, id: newId });
    setIsAdding(true);
    toast.success("Category added successfully");

    setTimeout(() => {
      const element = document.getElementById(`category-${newId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex flex-col items-center justify-center text-red-500">
        Error loading categories
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
        {/* Left side: Search */}
        <div className="flex items-center gap-2">
          <SearchInput
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            placeholder="Search category..."
            className="w-[500px] sm:w-[500px] lg:w-[500px]"
          />
          <Button onClick={handleAddCategory} className="group">
            <PlusCircle
              size={16}
              className="h-5 w-5 mr-2 transition-transform group-hover:scale-110"
            />
            {isAdding ? "Adding..." : "Add Category"}
          </Button>
        </div>

        {/* Right side: Controls */}
        <div className="flex items-center gap-4 sm:ml-auto">
          <SortSelector
            sortConfig={sortConfig}
            onSortChange={(config) =>
              setSortConfig({
                key: config.key as keyof Category,
                direction: config.direction,
              })
            }
            sortOptions={[
              { value: "name", label: "Name" },
              { value: "description", label: "Description" },
            ]}
          />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category, index) => (
                <tr
                  key={category.id}
                  id={`category-${category.id}`}
                  className={cn(
                    "transition-all duration-300",
                    !visibleItems[index] && "opacity-0 translate-y-4",
                    editingId === category.id && "bg-accent/5"
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ImageUpload
                      currentImage={
                        editingId === category.id
                          ? editValues.image
                          : category.image
                      }
                      onImageChange={(image) =>
                        handleImageChange(category.id, image)
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === category.id ? (
                      <input
                        type="text"
                        value={editValues.name || ""}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full bg-background border-b border-border p-2 rounded-md"
                      />
                    ) : (
                      <div className="font-medium">{category.name}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === category.id ? (
                      <textarea
                        value={editValues.description || ""}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        className="w-full bg-background border-b border-border p-2 rounded-md"
                        rows={2}
                      />
                    ) : (
                      <div className="max-w-md line-clamp-2">
                        {category.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {editingId === category.id ? (
                        <button
                          onClick={() => handleSaveClick(category.id)}
                          className="p-2 text-accent hover:text-accent/80 transition-colors"
                        >
                          <Save size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(category)}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteClick(category.id)}
                        className="p-2 text-destructive hover:text-destructive/80 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCategories.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No categories found. Add one to get started.
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

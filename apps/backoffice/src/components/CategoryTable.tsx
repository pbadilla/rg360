import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useStaggeredAnimation } from "@/lib/animations";
import { ImageUpload } from "./ImageUpload";
import { Edit2, Save, Trash2, PlusCircle } from "lucide-react";
import { toast } from "sonner";

// Types
interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Electronics",
      description: "Devices, gadgets, and more",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: "2",
      name: "Clothing",
      description: "Men, Women, and Kids clothing",
      image:
        "https://images.unsplash.com/photo-1521335629791-ce4aec67ddaf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Category>>({});
  const visibleItems = useStaggeredAnimation(categories.length);

  const handleEditClick = (category: Category) => {
    setEditingId(category.id);
    setEditValues({ ...category });
  };

  const handleSaveClick = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...editValues } : cat))
    );
    setEditingId(null);
    setEditValues({});
    toast.success("Category updated successfully");
  };

  const handleDeleteClick = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
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
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, image } : cat))
      );
      toast.success("Image updated successfully");
    }
  };

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: `${Date.now()}`,
      name: "New Category",
      description: "Describe your category",
      image: "",
    };

    setCategories((prev) => [...prev, newCategory]);
    setEditingId(newCategory.id);
    setEditValues({ ...newCategory });

    setTimeout(() => {
      const element = document.getElementById(`category-${newCategory.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={handleAddCategory}
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors"
        >
          <PlusCircle size={16} />
          <span>Add Category</span>
        </button>
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
              {categories.map((category, index) => (
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
              {categories.length === 0 && (
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

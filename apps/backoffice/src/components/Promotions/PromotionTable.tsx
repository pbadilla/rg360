import React, { useState } from "react";

import { toast } from "sonner";

import { Edit2, PlusCircle, Save, Trash2 } from "lucide-react";

import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";

import { usePromotionStore } from "@/store/usePromotionStore";

import type { Promotion } from "@/types/promotion";

import { ImageUpload } from "../csv/ImageUpload";

import { useStaggeredAnimation } from "@/lib/animations";
import { cn } from "@/lib/utils";

export const PromotionTable = () => {
  const {
    entities: promotions,
    create,
    update,
    remove,
    isLoading,
    error,
    searchTerm,
    sortConfig,
    setSearchTerm,
    setSortConfig,
  } = usePromotionStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Promotion>>({});
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const visibleItems = useStaggeredAnimation(promotions.length);

  // Handle edit
  const handleEditClick = (promotion: Promotion) => {
    setEditingId(promotion._id);
    setEditValues({ ...promotion });
  };

  // Handle save
  const handleSaveClick = async (id: string) => {
    const updated = { ...editValues, _id: id } as Promotion;
    await update(updated);
    setEditingId(null);
    setEditValues({});
    toast.success("Promotion updated successfully");
  };

  // Handle delete
  const handleDeleteClick = async (id: string) => {
    await remove(id);
    if (editingId === id) {
      setEditingId(null);
      setEditValues({});
    }
    toast.success("Promotion deleted successfully");
  };

  // Handle input change
  const handleInputChange = (key: keyof Promotion, value: string) => {
    setEditValues((prev) => ({ ...prev, [key]: value }));
  };

  // Handle image change
  const handleImageChange = (id: string, image: string) => {
    if (editingId === id) {
      setEditValues((prev) => ({ ...prev, bannerImage: image }));
    } else {
      const target = promotions.find((p) => p._id === id);
      if (target) {
        update({ ...target, bannerImage: image });
        toast.success("Image updated successfully");
      }
    }
  };

  // Add new promotion
  const handleAddPromotion = async () => {
    const newPromotion = {
      title: "New Promotion",
      description: "Describe your promotion",
      bannerImage: "",
      status: "active",
    };

    const created = await create(newPromotion);
    setEditingId(created._id);
    setEditValues({ ...created });

    setTimeout(() => {
      const element = document.getElementById(`promotion-${created._id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  console.log("promotions", promotions);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
        {/* Left side: Search */}
        <div className="flex items-center gap-2">
          <SearchInput
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            placeholder="Search carts ..."
            className="w-[500px] sm:w-[500px] lg:w-[500px]"
          />
        </div>
        <Button onClick={handleAddPromotion} className="group">
          <PlusCircle
            size={16}
            className="h-5 w-5 mr-2 transition-transform group-hover:scale-110"
          />
          {isAdding ? "Adding..." : `Add Promotion`}
        </Button>

        {/* Right side: Controls */}
        <div className="flex items-center gap-4 sm:ml-auto"></div>
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
                  Title
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
              {promotions.map((promotion, index) => (
                <tr
                  key={promotion._id}
                  id={`promotion-${promotion._id}`}
                  className={cn(
                    "transition-all duration-300",
                    !visibleItems[index] && "opacity-0 translate-y-4",
                    editingId === promotion._id && "bg-accent/5"
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ImageUpload
                      currentImage={
                        editingId === promotion._id
                          ? editValues.bannerImage
                          : promotion.bannerImage
                      }
                      onImageChange={(image) =>
                        handleImageChange(promotion._id, image)
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === promotion._id ? (
                      <input
                        type="text"
                        value={editValues.title || ""}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        className="w-full bg-background border-b border-border p-2 rounded-md"
                      />
                    ) : (
                      <div className="font-medium">{promotion.title}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === promotion._id ? (
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
                        {promotion.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {editingId === promotion._id ? (
                        <button
                          onClick={() => handleSaveClick(promotion._id)}
                          className="p-2 text-accent hover:text-accent/80 transition-colors"
                        >
                          <Save size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(promotion)}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteClick(promotion._id)}
                        className="p-2 text-destructive hover:text-destructive/80 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {promotions.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No promotions found. Add one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

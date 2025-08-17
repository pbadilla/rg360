import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useStaggeredAnimation } from "@/lib/animations";
import { ImageUpload } from "../csv/ImageUpload";
import { Edit2, Save, Trash2, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import SearchInput from "@/components/SearchInput";
import SortSelector from "../sorting/SortSelector";
import { useUsersStore } from "@/store/useUsersStore";
import { User } from "@/types/users";
import { Button } from "@/components/ui/button";

export const UsersTable: React.FC = () => {
  const {
    filteredEntities: users,
    isLoading,
    error,
    searchTerm,
    sortConfig,
    setSearchTerm,
    setSortConfig,
    addEntity: addUser,
    editEntity: editUser,
    deleteEntity: deleteUser,
  } = useUsersStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<User>>({});

  const visibleItems = useStaggeredAnimation((users || []).length);

  const handleEditClick = (role: User) => {
    setEditingId(role.id);
    setEditValues({ ...role });
  };

  const handleSaveClick = (id: string) => {
    if (!editValues.name?.trim()) {
      toast.error("Name is required");
      return;
    }
    editUser({ ...editValues, id } as User);
    setEditingId(null);
    setEditValues({});
    toast.success("User updated successfully");
  };

  const handleDeleteClick = (id: string) => {
    deleteUser(id);
    if (editingId === id) {
      setEditingId(null);
      setEditValues({});
    }
    toast.success("User deleted successfully");
  };

  const handleInputChange = (key: keyof User, value: string) => {
    setEditValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (id: string, image: string) => {
    if (editingId === id) {
      setEditValues((prev) => ({ ...prev, image }));
    } else {
      const currentUser = users.find((r) => r.id === id);
      if (currentUser) {
        editUser({ ...currentUser, image });
        toast.success("Image updated successfully");
      }
    }
  };

  const handleAddUser = () => {
    const newUser = {
      name: "New User",
      description: "Describe this role",
      image: "",
    };
    addUser(newUser);
    const newId = `${Date.now()}`;
    setEditingId(newId);
    setEditValues({ ...newUser, id: newId });

    setTimeout(() => {
      const element = document.getElementById(`role-${newId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex flex-col items-center justify-center text-red-500">
        Error loading users
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
        {/* Left side: Search */}
        <div className="flex items-center gap-2">
          <SearchInput
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            placeholder="Search users"
            className="w-[500px] sm:w-[500px] lg:w-[500px]"
          />
          <Button onClick={handleAddUser} className="group">
            <PlusCircle size={16} className="h-4 w-4 mr-2" />
            <span>Add User</span>
          </Button>
        </div>

        {/* Right side: Controls */}
        <div className="flex items-center gap-4 sm:ml-auto">
          <SortSelector
            sortConfig={sortConfig}
            onSortChange={(config) =>
              setSortConfig({
                key: config.key as keyof User,
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

      {/* Table */}
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
              {users.map((role, index) => (
                <tr
                  key={role.id}
                  id={`role-${role.id}`}
                  className={cn(
                    "transition-all duration-300",
                    !visibleItems[index] && "opacity-0 translate-y-4",
                    editingId === role.id && "bg-accent/5"
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ImageUpload
                      currentImage={
                        editingId === role.id ? editValues.image : role.image
                      }
                      onImageChange={(image) =>
                        handleImageChange(role.id, image)
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === role.id ? (
                      <input
                        type="text"
                        value={editValues.name || ""}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full bg-background border-b border-border p-2 rounded-md"
                      />
                    ) : (
                      <div className="font-medium">{role.name}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === role.id ? (
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
                        {role.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {editingId === role.id ? (
                        <button
                          onClick={() => handleSaveClick(role.id)}
                          className="p-2 text-accent hover:text-accent/80 transition-colors"
                        >
                          <Save size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(role)}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteClick(role.id)}
                        className="p-2 text-destructive hover:text-destructive/80 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No users found. Add one to get started.
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

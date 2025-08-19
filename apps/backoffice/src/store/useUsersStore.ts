import type { User } from "@/types/users";

import { useEntityStore } from "./useEntityStore";

// Your real API methods here
const fetchUsers = async () => {
  // Fetch from API
  return { data: [], total: 0 };
};
const createUser = async (role: Omit<User, "id">) => {
  // Create API call
  return { ...role, id: Date.now().toString() };
};
const updateUser = async (role: User) => {
  // Update API call
  return role;
};
const deleteUser = async (id: string) => {
  // Delete API call
  return id;
};

const searchUsers = (data: User[], term: string) => {
  if (!term) return data;
  return data.filter(
    (r) =>
      r.name.toLowerCase().includes(term.toLowerCase()) ||
      r.description.toLowerCase().includes(term.toLowerCase()),
  );
};

const sortUsers = (
  data: User[],
  config: { key: keyof User; direction: "asc" | "desc" },
) => {
  return [...data].sort((a, b) => {
    const valA = a[config.key] ?? "";
    const valB = b[config.key] ?? "";
    if (valA < valB) return config.direction === "asc" ? -1 : 1;
    if (valA > valB) return config.direction === "asc" ? 1 : -1;
    return 0;
  });
};

export const useUsersStore = () => {
  return useEntityStore<User>({
    queryKey: "roles",
    fetchFn: fetchUsers,
    createFn: createUser,
    updateFn: updateUser,
    deleteFn: deleteUser,
    searchFn: searchUsers,
    sortFn: sortUsers,
    defaultSort: { key: "name", direction: "asc" },
  });
};

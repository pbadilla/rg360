import type { Role } from "@/types/users";

import { useEntityStore } from "./useEntityStore";

// Your real API methods here
const fetchRoles = async () => {
  // Fetch from API
  return { data: [], total: 0 };
};
const createRole = async (role: Omit<Role, "id">) => {
  // Create API call
  return { ...role, id: Date.now().toString() };
};
const updateRole = async (role: Role) => {
  // Update API call
  return role;
};
const deleteRole = async (id: string) => {
  // Delete API call
  return id;
};

const searchRoles = (data: Role[], term: string) => {
  if (!term) return data;
  return data.filter(
    (r) =>
      r.name.toLowerCase().includes(term.toLowerCase()) ||
      r.description.toLowerCase().includes(term.toLowerCase()),
  );
};

const sortRoles = (
  data: Role[],
  config: { key: keyof Role; direction: "asc" | "desc" },
) => {
  return [...data].sort((a, b) => {
    const valA = a[config.key] ?? "";
    const valB = b[config.key] ?? "";
    if (valA < valB) return config.direction === "asc" ? -1 : 1;
    if (valA > valB) return config.direction === "asc" ? 1 : -1;
    return 0;
  });
};

export const useRolesStore = () => {
  return useEntityStore<Role>({
    queryKey: "roles",
    fetchFn: fetchRoles,
    createFn: createRole,
    updateFn: updateRole,
    deleteFn: deleteRole,
    searchFn: searchRoles,
    sortFn: sortRoles,
    defaultSort: { key: "name", direction: "asc" },
  });
};

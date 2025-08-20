import type { User } from "@/types/users";

import { useEntityStore } from "@/store/useEntityStore";

import api from "@/config/axiosConfig";
// import { searchUsers, sortUsers } from "@/utils/userUtils";

export const useUsersStore = () =>
  useEntityStore<User>({
    queryKey: "users",
    fetchFn: async ({ page = 1, pageSize = 10 }) => {
      const res = await api.get("/users", {
        params: { page, pageSize },
      });
      return {
        data: res.data.users ?? [],
        total: res.data.total ?? 0,
      };
    },
    createFn: async (user: Omit<User, "id">) => {
      // Replace with API call if available
      return { ...user, id: Date.now().toString() };
    },
    updateFn: async (user: User) => {
      // Replace with API call if available
      return user;
    },
    deleteFn: async (id: string) => {
      // Replace with API call if available
      return id;
    },
    importFn: async (data: User[]) => {
      // Handle CSV/Excel import, or just return as-is
      return data;
    },
    defaultSort: {
      key: "name", // or another valid User property
      direction: "asc",
    },
    searchFn: (users, term) =>
      term
        ? users.filter(
            (u) =>
              u.name.toLowerCase().includes(term.toLowerCase()) ||
              u.description.toLowerCase().includes(term.toLowerCase()),
          )
        : users,
    sortFn: (users, config) =>
      [...users].sort((a, b) => {
        const valA = a[config.key] ?? "";
        const valB = b[config.key] ?? "";
        if (valA < valB) return config.direction === "asc" ? -1 : 1;
        if (valA > valB) return config.direction === "asc" ? 1 : -1;
        return 0;
      }),
  });

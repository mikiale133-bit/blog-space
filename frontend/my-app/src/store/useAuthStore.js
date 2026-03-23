import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist((set) => ({
    user: null,
    register: (userData) => set({ user: userData }),
    login: (userData) => set({ user: userData }),
    logout: () => set({ user: null }),
  })),
);

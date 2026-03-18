import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist((set) => ({
    user: null,
    register: () => set({ user: {} }),
    login: () => set({ user: {} }),
  })),
);

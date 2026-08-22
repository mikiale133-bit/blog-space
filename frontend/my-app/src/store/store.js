import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSelectStore = create(
  persist(
    (set) => ({
      selectedSubject: null,
      setSubject: (sub) => set({ selectedSubject: sub }),

      selectedClass: null,
      setClass: (c) => set({ selectedClass: c }),
    }),
    { name: "dashboard-storage" },
  ),
);

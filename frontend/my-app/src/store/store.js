import { create } from "zustand";

export const useSelectStore = create((set) => ({
  selectedSubject: null,
  setSubject: (sub) => set({ selectedSubject: sub }),

  selectedClass: null,
  setClass: (c) => set({ selectedClass: c }),
}));

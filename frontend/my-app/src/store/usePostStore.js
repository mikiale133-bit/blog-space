import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePostStore = create(
  persist((set) => ({
    posts: [],
    addPost: () =>
      set((state) => ({
        posts: [...state.posts],
      })),
  })),
);

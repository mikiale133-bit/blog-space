import { create } from "zustand";

export const useToggleStore = create((set) => ({
  sidebarOpen: window.innerWidth < 600 ? false : true,
  openSidebar: () => set({ sidebarOpen: true }),
  closeSidebar: () => set({ sidebarOpen: false }),
}));

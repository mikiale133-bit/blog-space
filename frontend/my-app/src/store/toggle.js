import { create } from "zustand";

export const useToggleStore = create((set) => ({
  sidebarOpen: window.innerWidth < 600 ? false : true,
  openSidebar: () => set({ sidebarOpen: true }),
  closeSidebar: () => set({ sidebarOpen: false }),

  teacherSidebarOpened: window.innerWidth < 600 ? false : true,
  openTeacherSidebar: () => set({ teacherSidebarOpened: true }),
  closeTeacherSidebar: () => set({ teacherSidebarOpened: false }),

  studentSidebarOpened: window.innerWidth < 600 ? false : true,
  openStudentSidebar: () => set({ studentSidebarOpened: true }),
  closeStudentSidebar: () => set({ studentSidebarOpened: false }),
}));

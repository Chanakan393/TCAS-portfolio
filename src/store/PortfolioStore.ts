import { create } from "zustand";
import { Portfolio } from "@/types/portfolio";

interface PortfolioState {
  students: Portfolio[];
  addStudent: (student: Portfolio) => void;
  removeStudent: (id: string) => void;
  updateStudent: (id: string, updated: Partial<Portfolio>) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  students: [],
  addStudent: (student) =>
    set((state) => ({ students: [...state.students, student] })),
  removeStudent: (id) =>
    set((state) => ({ students: state.students.filter(s => s.id !== id) })),
  updateStudent: (id, updated) =>
    set((state) => ({
      students: state.students.map(s => s.id === id ? { ...s, ...updated } : s)
    })),
}));

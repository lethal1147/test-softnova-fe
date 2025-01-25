import { create } from "zustand";

interface LoaderStore {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

export const useLoaderStore = create<LoaderStore>((set) => ({
  isLoading: false,
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
}));

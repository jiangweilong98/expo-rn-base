import { create } from 'zustand';

type GlobalStore = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useGlobalStore = create<GlobalStore>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

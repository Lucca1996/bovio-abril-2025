import { create } from 'zustand';

interface FavoriteStore {
  favoritesCount: number;
  setFavoritesCount: (count: number) => void;
  updateFavoritesCount: (increment: boolean) => void;
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
  favoritesCount: 0,
  setFavoritesCount: (count) => set({ favoritesCount: count }),
  updateFavoritesCount: (increment) => 
    set((state) => ({ 
      favoritesCount: increment ? state.favoritesCount + 1 : state.favoritesCount - 1 
    })),
})); 
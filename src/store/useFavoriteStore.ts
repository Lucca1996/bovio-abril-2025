import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect, useState } from 'react';

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface FavoriteStore {
  items: FavoriteItem[];
  favoritesCount: number;
  addItem: (item: FavoriteItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  updateFavoritesCount: () => void;
}

export const useFavoriteStore = create<FavoriteStore>()(persist(
  (set, get) => ({
    items: [],
    favoritesCount: 0,
    
    addItem: (item) => {
      const items = get().items;
      const exists = items.find(i => i.id === item.id);
      
      if (!exists) {
        set({
          items: [...items, item],
          favoritesCount: get().favoritesCount + 1
        });
      }
    },
    
    removeItem: (id) => {
      const items = get().items;
      const exists = items.find(i => i.id === id);
      
      if (exists) {
        set({
          items: items.filter(i => i.id !== id),
          favoritesCount: Math.max(0, get().favoritesCount - 1)
        });
      }
    },
    
    toggleItem: (item) => {
      const items = get().items;
      const exists = items.find(i => i.id === item.id);
      
      if (exists) {
        get().removeItem(item.id);
      } else {
        get().addItem(item);
      }
    },
    
    isFavorite: (id) => {
      return get().items.some(item => item.id === id);
    },
    
    clearFavorites: () => set({ items: [], favoritesCount: 0 }),
    
    updateFavoritesCount: () => {
      const items = get().items;
      set({ favoritesCount: items.length });
    }
  }),
  {
    name: 'favorites-storage',
    skipHydration: false,
  }
));

// Hook personalizado para manejar la hidratación
export const useHydratedFavoriteStore = () => {
  const [hydrated, setHydrated] = useState(false);
  const store = useFavoriteStore();

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? store : { ...store, items: [], isFavorite: () => false };
};
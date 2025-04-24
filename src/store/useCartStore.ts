import { create } from 'zustand';

interface CartStore {
    cartCount: number;
  setCartCount: (count: number) => void;
  updateCartCount: (increment: boolean) => void;
}

export const useCartStore = create<CartStore>((set) => ({
    cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  updateCartCount: (increment) => 
    set((state) => ({ 
        cartCount: increment ? state.cartCount + 1 : state.cartCount - 1 
    })),
})); 
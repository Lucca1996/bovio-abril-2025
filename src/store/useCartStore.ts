import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  cartCount: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  updateCartCount: () => void;
}

export const useCartStore = create<CartStore>()(persist(
  (set, get) => ({
    items: [],
    cartCount: 0,
    
    addItem: (item) => {
      const items = get().items;
      const existingItem = items.find(i => i.id === item.id);
      
      if (existingItem) {
        set({
          items: items.map(i => 
            i.id === item.id 
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          cartCount: get().cartCount + 1
        });
      } else {
        set({
          items: [...items, { ...item, quantity: 1 }],
          cartCount: get().cartCount + 1
        });
      }
    },
    
    removeItem: (id) => {
      const items = get().items;
      const item = items.find(i => i.id === id);
      if (item) {
        set({
          items: items.filter(i => i.id !== id),
          cartCount: get().cartCount - item.quantity
        });
      }
    },
    
    updateQuantity: (id, quantity) => {
      if (quantity <= 0) {
        get().removeItem(id);
        return;
      }
      
      const items = get().items;
      const oldItem = items.find(i => i.id === id);
      if (oldItem) {
        const quantityDiff = quantity - oldItem.quantity;
        set({
          items: items.map(i => 
            i.id === id 
              ? { ...i, quantity }
              : i
          ),
          cartCount: get().cartCount + quantityDiff
        });
      }
    },
    
    clearCart: () => set({ items: [], cartCount: 0 }),
    
    getTotalPrice: () => {
      return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    updateCartCount: () => {
      const items = get().items;
      const totalCount = items.reduce((count, item) => count + item.quantity, 0);
      set({ cartCount: totalCount });
    }
  }),
  {
    name: 'cart-storage',
  }
));
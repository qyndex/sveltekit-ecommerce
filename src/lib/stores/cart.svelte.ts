// Cart store using Svelte 5 runes (module-level reactive state)
import { browser } from "$app/environment";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const STORAGE_KEY = "sveltekit-ecommerce-cart";

function loadFromStorage(): CartItem[] {
  if (!browser) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function createCart() {
  let items = $state<CartItem[]>(loadFromStorage());

  function persist() {
    if (browser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }

  return {
    get items() {
      return items;
    },
    get total() {
      return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },
    get count() {
      return items.reduce((sum, i) => sum + i.quantity, 0);
    },
    get isEmpty() {
      return items.length === 0;
    },

    add(product: Omit<CartItem, "quantity">) {
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        items.push({ ...product, quantity: 1 });
      }
      persist();
    },

    remove(id: string) {
      const idx = items.findIndex((i) => i.id === id);
      if (idx !== -1) items.splice(idx, 1);
      persist();
    },

    updateQty(id: string, qty: number) {
      if (qty <= 0) {
        this.remove(id);
        return;
      }
      const item = items.find((i) => i.id === id);
      if (item) {
        item.quantity = qty;
        persist();
      }
    },

    clear() {
      items = [];
      persist();
    },

    /** Seed cart from an array (e.g. after DB sync) */
    hydrate(newItems: CartItem[]) {
      items = newItems;
      persist();
    },
  };
}

export const cart = createCart();

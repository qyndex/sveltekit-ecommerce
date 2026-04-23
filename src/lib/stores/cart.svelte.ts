// Cart store using Svelte 5 runes (module-level state)
import { browser } from "$app/environment";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

function createCart() {
  const stored = browser ? localStorage.getItem("cart") : null;
  let items = $state<CartItem[]>(stored ? JSON.parse(stored) : []);

  function persist() {
    if (browser) localStorage.setItem("cart", JSON.stringify(items));
  }

  return {
    get items() { return items; },
    get total() { return items.reduce((sum, i) => sum + i.price * i.quantity, 0); },
    get count() { return items.reduce((sum, i) => sum + i.quantity, 0); },

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
      const item = items.find((i) => i.id === id);
      if (item) { item.quantity = Math.max(0, qty); if (item.quantity === 0) this.remove(id); }
      persist();
    },

    clear() { items = []; persist(); },
  };
}

export const cart = createCart();

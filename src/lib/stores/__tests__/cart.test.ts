import { describe, it, expect, vi, beforeEach } from "vitest";
import type { CartItem } from "../cart.svelte";

// Mock browser environment
vi.mock("$app/environment", () => ({
  browser: false,
}));

describe("Cart store", () => {
  it("exports cart functionality", async () => {
    const cartModule = await import("../cart.svelte");
    expect(cartModule).toBeDefined();
  });

  it("exports CartItem type via cart object", async () => {
    const { cart } = await import("../cart.svelte");
    expect(cart).toBeDefined();
  });

  it("cart has expected methods", async () => {
    const { cart } = await import("../cart.svelte");
    expect(typeof cart.add).toBe("function");
    expect(typeof cart.remove).toBe("function");
    expect(typeof cart.updateQty).toBe("function");
    expect(typeof cart.clear).toBe("function");
    expect(typeof cart.hydrate).toBe("function");
  });

  it("cart has reactive getters", async () => {
    const { cart } = await import("../cart.svelte");
    // These getters should be accessible (may throw in SSR context but exist)
    expect("items" in cart).toBe(true);
    expect("total" in cart).toBe(true);
    expect("count" in cart).toBe(true);
    expect("isEmpty" in cart).toBe(true);
  });
});

describe("CartItem interface", () => {
  it("satisfies the CartItem shape", () => {
    const item: CartItem = {
      id: "prod-1",
      name: "Test Product",
      price: 29.99,
      quantity: 2,
      image: "/images/test.jpg",
    };
    expect(item.id).toBe("prod-1");
    expect(item.name).toBe("Test Product");
    expect(item.price).toBe(29.99);
    expect(item.quantity).toBe(2);
    expect(item.image).toBe("/images/test.jpg");
  });
});

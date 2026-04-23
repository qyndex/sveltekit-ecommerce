import { describe, it, expect } from "vitest";

describe("Auth store", () => {
  it("exports authStore", async () => {
    const mod = await import("../auth.svelte");
    expect(mod.authStore).toBeDefined();
  });

  it("authStore has setUser method", async () => {
    const { authStore } = await import("../auth.svelte");
    expect(typeof authStore.setUser).toBe("function");
  });

  it("authStore has isLoggedIn getter", async () => {
    const { authStore } = await import("../auth.svelte");
    expect("isLoggedIn" in authStore).toBe(true);
  });

  it("authStore has user getter", async () => {
    const { authStore } = await import("../auth.svelte");
    expect("user" in authStore).toBe(true);
  });

  it("user is null by default", async () => {
    const { authStore } = await import("../auth.svelte");
    expect(authStore.user).toBeNull();
  });

  it("isLoggedIn is false when user is null", async () => {
    const { authStore } = await import("../auth.svelte");
    expect(authStore.isLoggedIn).toBe(false);
  });
});

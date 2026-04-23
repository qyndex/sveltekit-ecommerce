import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the SvelteKit env modules before importing supabase
vi.mock("$env/dynamic/public", () => ({
  env: {
    PUBLIC_SUPABASE_URL: "http://localhost:54321",
    PUBLIC_SUPABASE_ANON_KEY: "test-anon-key",
  },
}));

vi.mock("$env/dynamic/private", () => ({
  env: {
    SUPABASE_SERVICE_ROLE_KEY: "test-service-role-key",
  },
}));

describe("Supabase browser client", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("exports a supabase client instance", async () => {
    const mod = await import("../supabase");
    expect(mod.supabase).toBeDefined();
  });

  it("supabase client has auth methods", async () => {
    const mod = await import("../supabase");
    expect(typeof mod.supabase.auth.signInWithPassword).toBe("function");
    expect(typeof mod.supabase.auth.signUp).toBe("function");
    expect(typeof mod.supabase.auth.signOut).toBe("function");
  });

  it("supabase client has from method for queries", async () => {
    const mod = await import("../supabase");
    expect(typeof mod.supabase.from).toBe("function");
  });
});

describe("Supabase server client", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("exports supabaseAdmin client", async () => {
    const mod = await import("../supabase.server");
    expect(mod.supabaseAdmin).toBeDefined();
  });

  it("exports createServerClient function", async () => {
    const mod = await import("../supabase.server");
    expect(typeof mod.createServerClient).toBe("function");
  });

  it("createServerClient returns a client without access token", async () => {
    const mod = await import("../supabase.server");
    const client = mod.createServerClient();
    expect(client).toBeDefined();
    expect(typeof client.from).toBe("function");
  });

  it("createServerClient returns a client with access token", async () => {
    const mod = await import("../supabase.server");
    const client = mod.createServerClient("test-access-token");
    expect(client).toBeDefined();
    expect(typeof client.from).toBe("function");
  });
});

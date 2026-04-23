// Auth state using Svelte 5 runes
import type { User } from "@supabase/supabase-js";

function createAuthStore() {
  let user = $state<User | null>(null);

  return {
    get user() {
      return user;
    },
    get isLoggedIn() {
      return user !== null;
    },
    setUser(u: User | null) {
      user = u;
    },
  };
}

export const authStore = createAuthStore();

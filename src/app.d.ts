import type { User, Session } from "@supabase/supabase-js";

declare global {
  namespace App {
    interface Locals {
      user: User | null;
      session: Session | null;
    }
    interface PageData {
      user?: User | null;
    }
    // interface Error {}
    // interface Platform {}
  }
}

export {};

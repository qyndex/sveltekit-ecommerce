import { createClient } from "@supabase/supabase-js";
import { env } from "$env/dynamic/public";
import type { Database } from "./types/database";

export const supabase = createClient<Database>(
  env.PUBLIC_SUPABASE_URL || "http://localhost:54321",
  env.PUBLIC_SUPABASE_ANON_KEY || "placeholder"
);

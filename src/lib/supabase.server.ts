import { createClient } from "@supabase/supabase-js";
import { env as publicEnv } from "$env/dynamic/public";
import { env as privateEnv } from "$env/dynamic/private";
import type { Database } from "./types/database";

const supabaseUrl = publicEnv.PUBLIC_SUPABASE_URL || "http://localhost:54321";
const serviceRoleKey = privateEnv.SUPABASE_SERVICE_ROLE_KEY || "placeholder";
const anonKey = publicEnv.PUBLIC_SUPABASE_ANON_KEY || "placeholder";

/** Client for server-side operations with service role (bypasses RLS where needed) */
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  serviceRoleKey,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

/** Create a Supabase client authenticated with the user's session */
export function createServerClient(accessToken?: string) {
  return createClient<Database>(supabaseUrl, anonKey, {
    global: accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined,
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

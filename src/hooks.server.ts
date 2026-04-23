import type { Handle } from "@sveltejs/kit";
import { createServerClient } from "$lib/supabase.server";

export const handle: Handle = async ({ event, resolve }) => {
  const accessToken = event.cookies.get("sb-access-token");
  const refreshToken = event.cookies.get("sb-refresh-token");

  const client = createServerClient(accessToken);

  if (accessToken && refreshToken) {
    const { data } = await client.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    event.locals.user = data.user ?? null;
    event.locals.session = data.session ?? null;

    // Refresh cookies if session was refreshed
    if (data.session && data.session.access_token !== accessToken) {
      event.cookies.set("sb-access-token", data.session.access_token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
      event.cookies.set("sb-refresh-token", data.session.refresh_token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
  } else {
    event.locals.user = null;
    event.locals.session = null;
  }

  return resolve(event);
};

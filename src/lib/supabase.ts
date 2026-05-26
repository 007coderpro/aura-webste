import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://wgyvupsfbabmcumfbejz.supabase.co";
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_g_ZgKfjp5q01GqT2QUMogQ_ZMjPzdlA";

export function createSupabaseBrowserClient() {
  return createClient(supabaseUrl, supabasePublishableKey);
}

export function createSupabaseServerClient() {
  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://auravpn.net";

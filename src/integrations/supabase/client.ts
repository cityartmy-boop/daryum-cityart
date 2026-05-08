import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase environment variables!");
  console.log("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl);
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "exists" : "missing");
  throw new Error("Missing Supabase environment variables. Please check .env.local file.");
}

console.log("✅ Supabase URL:", supabaseUrl);
console.log("✅ Supabase Key:", supabaseAnonKey.substring(0, 20) + "...");

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Test connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error("❌ Supabase connection error:", error);
  } else {
    console.log("✅ Supabase connected successfully!");
    console.log("Session:", data.session ? "Active" : "No session");
  }
});
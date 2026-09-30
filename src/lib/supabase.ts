import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://not-configured.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "not-configured";

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY &&
  !import.meta.env.VITE_SUPABASE_URL.includes("YOUR_") &&
  !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY.includes("YOUR_")
);

export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from "@supabase/supabase-js";

const supaUrl = process.env.NEXT_PUBLIC_supabaseUrl;
const supaKey = process.env.NEXT_PUBLIC_supabaseKeySecret;

export const supabase = createClient(supaUrl, supaKey);

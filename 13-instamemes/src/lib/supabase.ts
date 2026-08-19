import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabaseStorageBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || "instamemes";
export const supabaseStorageMaxPhotoSizeMb = import.meta.env.VITE_SUPABASE_STORAGE_MAX_PHOTO_SIZE_MB || "2";

if (!supabaseUrl || !supabasePublishableKey) {
	throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey);

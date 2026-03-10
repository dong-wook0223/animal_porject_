import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseUrl = "https://fblhpysfqmepadjmqufi.supabase.co"
const supabaseAnonKey = "sb_publishable_qw0frVOFgl1YSdfO5pQRNQ_mVV4B1Gv"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
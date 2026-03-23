import { createClient } from '@supabase/supabase-js'

// 배포용 코드(Vercel 환경변수 적용 버전)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
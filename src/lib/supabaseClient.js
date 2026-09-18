import { createClient } from '@supabase/supabase-js'

// [원래 코드 보존] 추후 실제 Supabase 세팅 완료 시 아래 주석을 사용하세요.
/*
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
*/

// 임시 안전 모드: 환경변수가 없어도 브라우저가 흰 화면(크래시)으로 뻗지 않도록 방어값 적용
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 
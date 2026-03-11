import { createClient } from '@supabase/supabase-js'

// 배포용 코드(Vercel 환경변수 적용 버전)
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 로컬 개발용 코드(직접 키 입력 버전) !!!반드시 배포 시에는 위의 배포용 코드로 변경할 것!!!
const supabaseUrl = "https://fblhpysfqmepadjmqufi.supabase.co"
const supabaseAnonKey = "sb_publishable_qw0frVOFgl1YSdfO5pQRNQ_mVV4B1Gv"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
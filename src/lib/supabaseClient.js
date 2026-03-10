import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

function UsersCounter() {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCountViaRPC = async () => {
    setLoading(true);
    
    // 생성한 PL/pgSQL 함수 'get_users_count'를 호출합니다.
    const { data, error } = await supabase
      .rpc('get_users_count');

    if (error) {
      console.error('함수 호출 에러:', error);
    } else {
      setUserCount(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCountViaRPC();
  }, []);

  return (userCount);
}

export default UserCounter;
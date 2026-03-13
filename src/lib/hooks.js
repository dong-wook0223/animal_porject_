import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export function UsersCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function loadCount() {
      const { data } = await supabase.rpc('get_users_count');
      setCount(data || 0);
    }
    loadCount();
  }, []);

  return count;
}

export function register() {
  useEffect(() => {  
    const initializeUser = async () => {
        const existingId = localStorage.getItem('supabase_user_id');
        if (existingId) {
          console.log('이미 등록된 사용자:', existingId);
          return;
        }

        const { data, error } = await supabase.rpc('register_new_user');

        if (error) {
          console.error('사용자 등록 실패:', error.message);
        } else {
          localStorage.setItem('supabase_user_id', data);
          console.log('사용자 등록 완료 ID:', data);
        }
      };

    initializeUser();
  }, []);

  return
}
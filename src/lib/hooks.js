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
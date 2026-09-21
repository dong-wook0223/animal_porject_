import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// 1. Users 테이블에 저장된 유저 수 집계하기
export function useUsersCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function loadCount() {
      const { data, error } = await supabase.rpc('get_users_count');
      if (error) {
        console.error("카운트 불러오기 실패:", error);
      } else {
        setCount(data || -1);
      }
    }
    loadCount();
  }, []);

  return count;
}

// 2. 새로운 유저 진입 시 Users 테이블에 아이디 저장하기
export function register() {
  useEffect(() => {  
    async function initializeUser() {
        const existingId = localStorage.getItem('supabase_user_id');
        if (existingId) return;

        const { data, error } = await supabase.rpc('register_new_user');
        if (!error && data) {
          localStorage.setItem('supabase_user_id', data);
        }
    };
    initializeUser();
  }, []);
  return;
}

// 3. UserResults 테이블에 설문 결과 저장하기
export async function saveResults(userResponses, analysisData) { 
  const userId = localStorage.getItem('supabase_user_id');
  if (!userId || userResponses.length < 13) return;

  const { error } = await supabase.rpc('save_user_results', {
    _id: userId,
    _d1: userResponses[0], _d2: userResponses[1], _d3: userResponses[2],
    _d4: userResponses[3], _d5: userResponses[4], _d6: userResponses[5],
    _d7: userResponses[6], _d8: userResponses[7], _d9: userResponses[8],
    _d10: userResponses[9], _d11: userResponses[10], _d12: userResponses[11],
    _d13: userResponses[12],
    _sim1: analysisData.sim1,
    _sim1p: analysisData.sim1p,
    _sim2: analysisData.sim2,
    _sim2p: analysisData.sim2p,
    _dif1: analysisData.dif1,
    _dif2: analysisData.dif2
  });
  if (error) console.error("결과 저장 실패:", error);
}

// 4. 가장 많이 선택된 강아지 비율 집계
export function useStatsData(targetName) {
  const [statsData, setStatsData] = useState([
    { name: "나와 같은 결과", value: 35, color: "#6B8F71" },
    { name: "다른 강아지들", value: 65, color: "#E8E6E1" },
  ]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.rpc('get_sim1_ratio', { _dog_name: targetName });
      if (!error && data !== null && data !== undefined) {
        setStatsData([
          { name: "나와 같은 결과", value: data, color: "#6B8F71" },
          { name: "다른 강아지들", value: 100 - data, color: "#E8E6E1" },
        ]);
      }
    }
    fetchData();
  }, [targetName]);

  return statsData;
}

// 5. 평가 내용 저장하기
export async function saveCritics(rating) {
  const userId = localStorage.getItem('supabase_user_id');
  if (!userId || rating == null) return;
  
  const { error } = await supabase.rpc('save_user_critic', {
    _id: userId,
    _rating: rating,
    _comment: null
  });
  if (error) console.error("평가 저장 실패:", error);
}

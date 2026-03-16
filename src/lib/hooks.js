import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { a } from 'framer-motion/client';

//Users 테이블에 저장된 유저 수 집계하기
export function useUsersCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function loadCount() {
      const { data } = await supabase.rpc('get_users_count');
      setCount(data || -1);
    }
    loadCount();
  }, []);

  return count;
}

//새로운 유저 진입 시 Users 테이블에 아이디 저장하기
export function register() {
  useEffect(() => {  
    async function initializeUser() {
        const existingId = localStorage.getItem('supabase_user_id');
        if (existingId) {
          console.log('이미 등록된 사용자:', existingId);
          return;
        }

        const { data, error } = await supabase.rpc('register_new_user');

        if (error) {
          //console.error('사용자 등록 실패:', error.message);
        } else {
          localStorage.setItem('supabase_user_id', data);
          //console.log('사용자 등록 완료 ID:', data);
        }
      };
    initializeUser();
  }, []);

  return
}

//UserResults 테이블에 설문 결과 저장하기
export function saveResults(userResponses, analysisData) { 
  const userId = localStorage.getItem('supabase_user_id');
  if (!userId) {
    console.error("유저 ID를 찾을 수 없습니다.");
    return;
  }
  if(userResponses.length < 13) { 
    console.error("사용자 응답이 완전하지 않습니다.");
    return;
  }
  // RPC 함수 호출 (파라미터 전달)
  const { error } = supabase.rpc('save_user_results', {
    _id: userId,
    // 선택지
    _d1: userResponses[0], _d2: userResponses[1], _d3: userResponses[2],
    _d4: userResponses[3], _d5: userResponses[4], _d6: userResponses[5],
    _d7: userResponses[6], _d8: userResponses[7], _d9: userResponses[8],
    _d10: userResponses[9], _d11: userResponses[10], _d12: userResponses[11],
    _d13: userResponses[12],
    // 결과
    _sim1: analysisData.sim1,
    _sim1p: analysisData.sim1p,
    _sim2: analysisData.sim2,
    _sim2p: analysisData.sim2p,
    _dif1: analysisData.dif1,
    _dif2: analysisData.dif2
  });
  if (error) console.error("결과 저장 실패:", error.message);
  else console.log("모든 데이터가 안전하게 저장되었습니다.");
};

export function useStatsData(targetName) {
  const [statsData, setStatsData] = useState([
    { name: "나와 같은 결과", value: 35, color: "#6B8F71" },
    { name: "다른 강아지들", value: 65, color: "#E8E6E1" },
  ]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.rpc('get_sim1_ratio', { _dog_name: targetName });
      console.log("RPC 호출 결과:", { data, error });
      setStatsData([
        { name: "나와 같은 결과", value: data, color: "#6B8F71" },
        { name: "다른 강아지들", value: 100 - data, color: "#E8E6E1" },
      ]);
    }
    fetchData();
  }, [targetName]);

  return statsData;
};
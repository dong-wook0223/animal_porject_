import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

//Users 테이블에 저장된 유저 수 집계하기
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

//새로운 유저 진입 시 Users 테이블에 아이디 저장하기
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

//UserResults 테이블에 설문 결과 저장하기
export const saveResults = async (userResponses, analysisData) => {
  // 로컬 스토리지에서 저장된 유저 ID 가져오기
  const userId = localStorage.getItem('supabase_user_id');

  if (!userId) {
    console.error("유저 ID를 찾을 수 없습니다.");
    return;
  }

  // RPC 함수 호출 (파라미터 전달)
  const { error } = await supabase.rpc('save_user_results', {
    _user_id: userId,
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

  if (error) {
    console.error("결과 저장 실패:", error.message);
    alert("데이터 저장 중 오류가 발생했습니다.");
  } else {
    console.log("모든 데이터가 안전하게 저장되었습니다.");
  }
};
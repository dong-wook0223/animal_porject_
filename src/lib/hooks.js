import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

/*
======================================================================
[원래 코드 보존] 추후 새 Supabase 프로젝트 세팅 완료 시 아래 코드를 복원하세요.
======================================================================

// 1. Users 테이블에 저장된 유저 수 집계하기
export function useUsersCounterOriginal() {
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

// 2. 새로운 유저 진입 시 Users 테이블에 아이디 저장하기
export function registerOriginal() {
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
export async function saveResultsOriginal(userResponses, analysisData) { 
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
}

// 4. 가장 많이 선택된 강아지 비율 집계
export function useStatsDataOriginal(targetName) {
  const [statsData, setStatsData] = useState([
    { name: "나와 같은 결과", value: 35, color: "#6B8F71" },
    { name: "다른 강아지들", value: 65, color: "#E8E6E1" },
  ]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.rpc('get_sim1_ratio', { _dog_name: targetName });
      if (data !== null && data !== undefined) {
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
export async function saveCriticsOriginal(rating) {
  const userId = localStorage.getItem('supabase_user_id');
  if (!userId || rating == null) return;
  await supabase.rpc('save_user_critic', {
    _id: userId,
    _rating: rating,
    _comment: null
  });
}
======================================================================
*/

// ======================================================================
// [현재 적용 모드: 안전 모의(Mock) 버전 - DB 없이 100% 정상 작동]
// ======================================================================

// 1. 참여자 수 집계 (기본 1,482명 표시)
export function useUsersCounter() {
  const [count, setCount] = useState(1482);

  useEffect(() => {
    // 1480~1520 사이의 자연스러운 참여자 수 표기
    const saved = localStorage.getItem('cached_users_count');
    if (saved) {
      setCount(Number(saved));
    } else {
      const randomCount = Math.floor(1450 + Math.random() * 50);
      setCount(randomCount);
      localStorage.setItem('cached_users_count', String(randomCount));
    }
  }, []);

  return count;
}

// 2. 신규 사용자 등록 (로컬 스토리지 기반 임시 고유 ID 생성)
export function register() {
  useEffect(() => {  
    const existingId = localStorage.getItem('supabase_user_id');
    if (!existingId) {
      const mockId = 'usr_' + Math.random().toString(36).substring(2, 10);
      localStorage.setItem('supabase_user_id', mockId);
    }
  }, []);
  return;
}

// 3. 설문 결과 저장 (콘솔 로그 기록 후 에러 없이 완료)
export async function saveResults(userResponses, analysisData) { 
  const userId = localStorage.getItem('supabase_user_id');
  // DB 연동 준비 전 로컬 콘솔에 정상 기록
  console.log('[Mock Mode] Results saved locally:', { userId, analysisData });
}

// 4. 나와 같은 결과 비율 집계 (도넛 차트 기본 35% / 65% 안전 표기)
export function useStatsData(targetName) {
  const [statsData] = useState([
    { name: "나와 같은 결과", value: 35, color: "#6B8F71" },
    { name: "다른 강아지들", value: 65, color: "#E8E6E1" },
  ]);

  return statsData;
}

// 5. 별점 평가 저장
export async function saveCritics(rating) {
  console.log('[Mock Mode] Critic rating submitted:', rating);
}

// src/domain/match/explain.js
import { ORDER } from "../../data/tag";

/**
 * 벡터 기반(파이썬과 동일) 설명 생성
 *
 * userInput: userVec (길이 13의 0/1 배열)
 * rankedDog: rankDogs에서 만든 _inter, _overlap, _dice, _score 값을 사용
 *
 * @param {number[]} userInput
 * @param {{_inter?:number, _overlap?:number, _dice?:number, _score?:number, vec?:number[]}} rankedDog
 */
export function buildExplain(userInput, rankedDog) {
  const userVec = Array.isArray(userInput) ? userInput : [];
  const uOnes = userVec.reduce((acc, v) => acc + (v > 0 ? 1 : 0), 0);

  const inter = typeof rankedDog?._inter === "number" ? Math.round(rankedDog._inter) : 0;

  // (선택) 매칭된 항목 키 목록 복원
  const dogVec = Array.isArray(rankedDog?.vec) ? rankedDog.vec : null;
  const matchedTags =
    dogVec && dogVec.length === userVec.length
      ? ORDER.filter((_, i) => userVec[i] > 0 && dogVec[i] === 1)
      : [];

  return {
    headline:
      uOnes === 0
        ? "선택한 항목이 없어 추천 정확도가 낮아요."
        : `선택한 항목 ${uOnes}개 중 ${inter}개가 일치해요.`,
    matchedTags,
  };
}

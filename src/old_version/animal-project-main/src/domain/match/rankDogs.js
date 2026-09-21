// src/domain/match/rankDogs.js
import { scoreVectors } from "./score";

/**
 * 파이썬(13차원 0/1 벡터)과 동일한 방식으로 매칭 점수 계산
 *
 * - userVec: 길이 13의 0/1 배열
 * - dog.vec: 길이 13의 0/1 배열 (dog_char.js에 추가 필요)
 *
 * @param {number[]} userVec
 * @param {Array<any>} dogs
 * @param {number} alpha
 */
export function rankDogs(userVec, dogs, alpha = 0.6) {
  // 입력 방어
  if (!Array.isArray(userVec) || userVec.length === 0) return [];
  if (!Array.isArray(dogs) || dogs.length === 0) return [];

  return dogs
    .map((dog, index) => {
      const dogVec = Array.isArray(dog?.vec) ? dog.vec : [];

      // vec가 없거나 길이가 다르면 계산이 의미 없으니 0점 처리
      if (dogVec.length !== userVec.length) {
        return {
          ...dog,
          _score: 0,
          _dice: 0,
          _overlap: 0,
          _inter: 0,
          _matchedTags: [],
        };
      }

      const s = scoreVectors(userVec, dogVec, alpha, dog.id, index);

      return {
        ...dog,
        _score: s.score,
        _dice: s.dice,
        _overlap: s.overlap,
        _inter: s.inter,
        _matchedTags: [],
      };
    })
    .sort((a, b) => (b._score ?? 0) - (a._score ?? 0));
}

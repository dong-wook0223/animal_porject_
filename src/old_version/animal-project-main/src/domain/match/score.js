// src/domain/match/score.js

/**
 * 13문항 대칭 구조하에서의 미세 편차를 해결하기 위한 견종별 초정밀 옵셋
 */
const CALIBRATION = {
  "maltese": 0.8,
  "rough_collie": 0.7,
  "chihuahua": 0.7,
  "doberman_pinscher": 0.6,
  "miniature_schnauzer": 0.6,
  "golden_retriever": 0.5,
  "beagle": 0.5,
  "japanese_spitz": 0.4,
  "siberian_husky": 0.4,
  "border_collie": 0.4,
  "dachshund": 0.3,
  "yorkshire_terrier": 0.3,
  "shiba_inu": 0.2,
  "pekingese": 0.2,
  "french_bulldog": 0.1,
  "samoyed": 0.0,
  "rottweiler": 0.0,
  "american_cocker_spaniel": -0.1,
  "shih_tzu": -0.2,
  "toy_poodle": -0.3,
  "welsh_corgi": -0.4,
  "german_shepherd": -0.5,
  "pomeranian": -0.6,
  "alaskan_malamute": -0.7
};


export function scoreVectors(userVec, dogVec, alpha = 0.6, dogId = "", dogIndex = 0) {
  const n = Math.min(userVec.length, dogVec.length);
  let earnedScore = 0;

  for (let i = 0; i < n; i++) {
    const userWeight = userVec[i];
    const d = dogVec[i] === 1 ? 1 : 0;
    if (userWeight > 0 && d === 1) {
      // [연속 가중치] 상위 성향뿐 아니라 13가지 성향의 실제 점수를 위치별로 합산
      earnedScore += userWeight;
    }
  }

  let finalScore = earnedScore;

  // 견종별 보정치 적용 (대중성/희귀도 등 고려)
  if (dogId && CALIBRATION[dogId]) {
    finalScore += CALIBRATION[dogId];
  }

  // [결정론적 타이브레이커] 소수점 4~5째 자리에서 순위를 갈라주어 
  // 똑같은 답변을 했을 때 항상 동일한 순위가 나오도록 보장합니다.
  finalScore += (dogIndex * 0.00001);

  return {
    score: Math.max(0, finalScore),
    dice: finalScore,
    overlap: finalScore,
    inter: earnedScore
  };
}


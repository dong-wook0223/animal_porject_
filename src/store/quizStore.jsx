import React, { createContext, useContext, useMemo, useState } from "react";

const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  // scoresMap: { [questionIndex]: { [traitName]: number } }
  // 예: { 0: { outgoing: 2 }, 1: { friendly: 1 } }
  const [scoresMap, setScoresMap] = useState({});

  // 특정 문항의 점수를 저장 (기존 해당 문항 점수는 덮어씀)
  const addScore = (index, answerScores) => {
    setScoresMap((prev) => ({
      ...prev,
      [index]: answerScores,
    }));
  };

  const resetScores = () => setScoresMap({});

  // 모든 문항의 점수를 합산하여 최종 scores 객체 생성
  const scores = useMemo(() => {
    const total = {};
    Object.values(scoresMap).forEach((answerScores) => {
      Object.entries(answerScores).forEach(([trait, value]) => {
        total[trait] = (total[trait] || 0) + value;
      });
    });
    return total;
  }, [scoresMap]);

  const value = useMemo(
    () => ({ scores, addScore, resetScores }),
    [scores]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}

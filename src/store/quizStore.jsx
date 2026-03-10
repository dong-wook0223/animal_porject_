import React, { createContext, useContext, useMemo, useState } from "react";

const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  // scores: { [traitName]: number }
  // 예: { outgoing: 5, playful: 2, ... }
  const [scores, setScores] = useState({});

  // 답변 선택 시 점수 누적
  // answerScores 예: { outgoing: 2, activitylevel: 2 }
  const addScore = (answerScores) => {
    setScores((prev) => {
      const next = { ...prev };
      Object.entries(answerScores).forEach(([trait, value]) => {
        next[trait] = (next[trait] || 0) + value;
      });
      return next;
    });
  };

  const resetScores = () => setScores({});

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

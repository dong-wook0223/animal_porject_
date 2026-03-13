import React, { createContext, useContext, useMemo, useState } from "react";

const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  // scoresMap: { [questionIndex]: { [traitName]: number } }
  // 예: { 0: { outgoing: 2 }, 1: { friendly: 1 } }
  const [scoresMap, setScoresMap] = useState({});
  // database 저장용 State
  // userResponses: { int2 }
  const [userResponses, setUserResponses] = useState([]);

  // 특정 문항의 점수를 저장 (기존 해당 문항 점수는 덮어씀) + 답변 번호도 같이 저장~
  const addScore = (index, answerScores, choice) => {
    setScoresMap((prev) => ({
      ...prev,
      [index]: answerScores,
    }));
    setUserResponses((prev) => {
      const nextResponses = [...prev];
      nextResponses[index] = choice;
      return nextResponses;
    });
  };

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

  const resetScores = () => {
    setScoresMap({});
    setUserResponses([]);
  }

  const value = useMemo(
    () => ({ scores, userResponses, addScore, resetScores }),
    [scores, userResponses]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}

import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// --- B버전 (현재 최신 세트) ---
import { Landing as CurrentLanding, Quiz as CurrentQuiz, Result as CurrentResult } from "../pages";
import { QuizProvider as CurrentQuizProvider } from "../store/quizStore";

// --- A버전 (과거 수동 복사 세트) ---
import { Landing as OldLanding, Quiz as OldQuiz, Result as OldResult } from "../old_version/animal-project-main/src/pages";
import { QuizProvider as OldQuizProvider } from "../old_version/animal-project-main/src/store/quizStore";

import Footer from "../components/Footer";
import "./App.css";

function AnimatedRoutes({ variant }) {
  const location = useLocation();

  // 유저의 A/B 배정에 따른 화면 통째로 교체
  const Landing = variant === "A" ? OldLanding : CurrentLanding;
  const Quiz = variant === "A" ? OldQuiz : CurrentQuiz;
  const Result = variant === "A" ? OldResult : CurrentResult;

  return (
    <main className="min-h-screen page-bg flex flex-col items-center justify-center">
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </main>
  );
}

export default function App() {
  const [variant, setVariant] = useState("B"); // 기본값 B로 폴백
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 기존 카카오 SDK 초기화 유지
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY || '내_자바스크립트_키');
      console.log('카카오 SDK 준비 완료:', window.Kakao.isInitialized());
    }

    // A/B 테스트 할당 로직
    let storedVariant = localStorage.getItem("ab_variant");
    if (!storedVariant) {
      storedVariant = Math.random() < 0.5 ? "A" : "B";
      localStorage.setItem("ab_variant", storedVariant);
    }
    setVariant(storedVariant);
    setIsReady(true);
    
    console.log(`[A/B Test] 유저가 할당된 버전: ${storedVariant}`);
  }, []);

  if (!isReady) return null; // 로컬 스토리지 확인 전 렌더링 방지

  // 상태 관리(데이터 저장소) 통째로 교체
  const Provider = variant === "A" ? OldQuizProvider : CurrentQuizProvider;

  return (
    <BrowserRouter>
      <Provider>
        <AnimatedRoutes variant={variant} />
      </Provider>
    </BrowserRouter>
  );
}

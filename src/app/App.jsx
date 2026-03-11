import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Landing, Quiz, Result } from "../pages";
import Footer from "../components/Footer";

import { QuizProvider } from "../store/quizStore";
import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <main className="min-h-screen page-bg flex flex-col items-center justify-center">
      {/* ✅ path 바뀔 때 이전 화면 exit → 다음 화면 enter */}
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
  return (
    <BrowserRouter>
      <QuizProvider>
        <AnimatedRoutes />
      </QuizProvider>
    </BrowserRouter>
  );
}

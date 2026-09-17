import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUsersCounter, register } from "../lib/hooks";

function Landing() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  register() /*supabase 사용자 등록 함수*/
  const usersCount = useUsersCounter() /*현재 참여자 수 집계 함수*/

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="w-full flex flex-col justify-center items-center" style={{ backgroundColor: "var(--color-bg)", minHeight: "100dvh" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center w-64 px-4"
        >
          <p className="font-bold tracking-tight mb-4 text-center" style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
            나와 잘 맞는 강아지가<br />기다리는 중...
          </p>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-border)" }}>
            <motion.div
              className="h-full"
              style={{ backgroundColor: "var(--color-accent)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <motion.main
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{ backgroundColor: "var(--color-bg)", minHeight: "100dvh" }}
      className="w-full h-full flex flex-col"
    >
      <div
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem 1.5rem 2.5rem",
          margin: "0 auto",
          width: "100%",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Background Decorations */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        {/* ─── Top Logo ─── */}
        <div className="flex justify-center pt-2 pb-3">
          <span
            className="text-sm font-bold tracking-widest uppercase"
            style={{ color: "var(--color-accent)" }}
          >
            너의 댕댕이는
          </span>
        </div>

        {/* ─── Title ─── */}
        <div className="text-center mb-3">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: "var(--color-text-muted)" }}
          >
            나와 어울리는 강아지 찾기 TEST
          </p>
          <h1
            className="font-extrabold leading-tight"
            style={{ color: "var(--color-text-primary)", fontSize: "1.6rem" }}
          >
            나와 찰떡궁합
            <br />
            <span style={{ color: "var(--color-accent)" }}>댕댕이는 누구?</span>
          </h1>
        </div>

        {/* ─── Image Container Wrapper ─── */}
        <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[200px] pb-4">
          <div
            className="w-full max-w-[310px] mx-auto rounded-[2.5rem] overflow-hidden flex items-center justify-center relative group flex-shrink-0"
            style={{
              backgroundColor: "white",
              border: "1.5px solid var(--color-border)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            {/* Decorative Ring */}
            <div className="absolute inset-3 border-2 border-dashed border-accent/20 rounded-[2rem] pointer-events-none" />

            <img
              src="/강아지/랜딩이미지.png"
              alt="intro"
              className="w-full h-auto object-contain p-4 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* ─── Bottom Section (Text & Button) ─── */}
        <div className="w-full mt-auto flex flex-col gap-8 pb-2">
          {/* ─── Test Description & Source Credit ─── */}
          <div className="px-2 flex flex-col gap-3">
            <p className="text-center font-medium leading-relaxed" style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
              나의 성향과 딱 맞는 운명의 댕댕이는 누구일까요? 🐾<br />
              간단한 질문으로 반려견 소울메이트를 찾아보세요!
            </p>
            <p className="text-center text-[10px]" style={{ color: "var(--color-text-muted)" }}>
              * '한국애견협회-KKC 매거진-견종표준-견종 소개' 데이터를 기반으로 제작된 테스트입니다.
            </p>
          </div>

          {/* ─── Participant Count (Hooking) ─── */}
          <div className="flex justify-center mt-2">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-1.5 px-5 rounded-full text-xs font-semibold shadow-sm"
              style={{
                backgroundColor: "var(--color-accent-light)",
                color: "var(--color-accent-hover)",
                border: "1px solid var(--color-accent)",
              }}
            >
              🔥 지금 이 순간에도 <span className="font-extrabold">{usersCount}</span>명이 찾는 중!
            </motion.div>
          </div>

          {/* ─── CTA Button & Time Hook ─── */}
          <div className="relative w-full flex flex-col items-center mt-4">
            {/* 말풍선 느낌의 시간 강조 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-7 text-[11px] font-bold px-3 py-1 rounded-full z-10"
              style={{ backgroundColor: "var(--color-accent)", color: "white" }}
            >
              ⏱️ 단 2분 컷! 13개의 간단한 질문
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45" style={{ backgroundColor: "var(--color-accent)" }}></div>
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="btn-primary w-full mb-3 relative overflow-hidden"
              style={{ padding: "1rem", fontSize: "1.1rem", fontWeight: "800" }}
              onClick={() => navigate("/quiz")}
            >
              테스트 시작하기 →
            </motion.button>
          </div>
        </div>


      </div>
    </motion.main>
  );
}

export default Landing;

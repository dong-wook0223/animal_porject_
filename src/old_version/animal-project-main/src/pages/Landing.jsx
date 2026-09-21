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
            나와 잘 맞는 강아지가<br/>기다리는 중...
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

        <div
          className="flex-[1.5] rounded-[2.5rem] overflow-hidden flex items-center justify-center mb-6 relative group"
          style={{
            backgroundColor: "white",
            border: "1.5px solid var(--color-border)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            minHeight: 0,
          }}
        >
          {/* Decorative Ring */}
          <div className="absolute inset-4 border-2 border-dashed border-accent/20 rounded-[2rem] pointer-events-none" />

          <img
            src="/강아지/랜딩이미지.png"
            alt="intro"
            className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
          />
        </div>        {/* ─── Source Credit ─── */}
        <div className="px-2 mb-4">
          <p
            className="text-[10px] leading-relaxed text-center"
            style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}
          >
            본 프로젝트는 국립축산과학원의 '국내 친숙 반려견' 24종과 '한국애견협회-KKC 매거진-견종표준-견종 소개'데이터를 활용하여 제작되었습니다. 각각의 강이지의 성격은 환경과 개체에 따라 차이가 있을 수 있으니, 본 결과는 가벼운 마음으로 재미있게 즐겨주세요.
          </p>
        </div>

        {/* ─── Participant Count ─── */}
        <div className="flex justify-center mb-4">
          <div
            className="py-1.5 px-4 rounded-full text-xs font-medium"
            style={{
              backgroundColor: "var(--color-accent-light)",
              color: "var(--color-text-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            현재 총{" "}
            <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>
              {usersCount}
            </span>{" "}
            명이 참여했습니다
          </div>
        </div>

        {/* ─── CTA Button ─── */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="btn-primary w-full mb-3"
          style={{ padding: "0.9rem", fontSize: "1rem" }}
          onClick={() => navigate("/quiz")}
        >
          테스트 시작하기 →
        </motion.button>


      </div>
    </motion.main>
  );
}

export default Landing;

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { supabase } from "../lib/supabaseClient";

function Landing() {
  const navigate = useNavigate();

  const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  //TEST: Supabase에서 데이터 개수 가져오기************
  const [count, setCount] = useState(0);
  const getCount = async () => {
    const { count: rowCount, error } = await supabase
      .from('Users')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('데이터 가져오기 실패: ', error);
    } else {
      setCount(rowCount);
    }
  };
  useEffect(() => {
    getCount();
  }, []);
  //************************************************


  return (
    <motion.main
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{ backgroundColor: "var(--color-bg)", height: "100dvh" }}
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
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-accent/5 rounded-full blur-3xl" />
        {/* ─── Top Logo ─── */}
        <div className="flex justify-center pt-2 pb-3">
          <span
            className="text-sm font-bold tracking-widest uppercase"
            style={{ color: "var(--color-accent)" }}
          >
            멍BTI
          </span>
        </div>

        {/* ─── Title ─── */}
        <div className="text-center mb-3">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: "var(--color-text-muted)" }}
          >
            나와 어울리는 반려견 찾기 TEST
          </p>
          <h1
            className="font-extrabold leading-tight"
            style={{ color: "var(--color-text-primary)", fontSize: "1.6rem" }}
          >
            나의 취향저격
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
        </div>

        {/* ─── Source & Disclaimer ─── */}
        <div className="px-2 mb-4">
          <p
            className="text-[10px] leading-relaxed text-center"
            style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}
          >
            본 프로젝트는 국립축산과학원의 '국내 친숙 반려견' 24종과 한국애견연맹의 품종 정보를 바탕으로 제작되었습니다. 개별 반려견의 성격은 환경과 개체에 따라 차이가 있을 수 있으니, 본 결과는 가벼운 마음으로 재미있게 즐겨주세요.
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
              {count}
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

        {/* ─── Share Buttons ─── */}
        <div className="flex justify-center gap-3">
          {["카", "링", "트", "인"].map((label, i) => (
            <button
              key={i}
              className="w-9 h-9 rounded-full text-xs flex items-center justify-center"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1.5px solid var(--color-border)",
                color: "var(--color-text-muted)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </motion.main>
  );
}

export default Landing;

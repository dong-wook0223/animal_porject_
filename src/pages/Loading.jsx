import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DELAY_MS = 1000;

export default function Loading() {
  const navigate = useNavigate();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const t = setTimeout(() => navigate("/result", { replace: true }), DELAY_MS);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div
        className="animate-spin h-10 w-10 rounded-full border-4"
        style={{
          borderColor: "var(--color-border)",
          borderTopColor: "var(--color-accent)",
        }}
      />
      <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
        결과를 분석 중입니다...
      </p>
    </motion.main>
  );
}

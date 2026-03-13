import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "../store/quizStore";
import { QUESTIONS } from "../data/questions";

export default function Quiz() {
    const navigate = useNavigate();
    const { addScore } = useQuiz();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const currentQuestion = QUESTIONS[currentStepIndex];
    const totalSteps = QUESTIONS.length;
    const progress = ((currentStepIndex + 1) / totalSteps) * 100;

    const handleAnswer = (answerScores, choice) => {
        addScore(currentStepIndex, answerScores, choice);
        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            navigate("/result");
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prev) => prev - 1);
        } else {
            navigate("/");
        }
    };

    const pageVariants = {
        initial: { opacity: 0, x: 16 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -16 },
    };



    return (
        <div
            style={{
                height: "100dvh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "var(--color-bg)",
                margin: "0 auto",
                width: "100%",
                overflow: "hidden",
            }}
        >
            {/* ─── Top Navigation (고정) ─── */}
            <header
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem 1.25rem 0.75rem",
                    flexShrink: 0,
                }}
            >
                <button
                    onClick={handleBack}
                    style={{
                        width: "2.6rem",
                        height: "2.6rem",
                        borderRadius: "50%",
                        backgroundColor: "#FFFFFF",
                        border: "1.5px solid #E8E6E1",
                        color: "#2C2C2C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        cursor: "pointer",
                        padding: 0,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        zIndex: 10,
                    }}
                    aria-label="뒤로 가기"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>

                {/* Progress Bar */}
                <div
                    style={{
                        flex: 1,
                        height: "0.5rem",
                        borderRadius: "99px",
                        backgroundColor: "var(--color-border)",
                        overflow: "hidden",
                    }}
                >
                    <motion.div
                        style={{ backgroundColor: "var(--color-accent)", height: "100%", borderRadius: "99px" }}
                        initial={false}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>

                <span
                    style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "var(--color-text-muted)",
                        flexShrink: 0,
                        fontVariantNumeric: "tabular-nums",
                    }}
                >
                    {currentStepIndex + 1}/{totalSteps}
                </span>
            </header>

            {/* ─── Content (AnimatePresence) ─── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStepIndex}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.22 }}
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        padding: "0.5rem 1.25rem 1.25rem",
                        minHeight: 0,
                        overflow: "hidden",
                    }}
                >
                    {/* Category Tag */}
                    <span
                        className="tag-chip"
                        style={{ alignSelf: "flex-start", marginBottom: "0.6rem" }}
                    >
                        {currentQuestion.title}
                    </span>

                    {/* Question Text */}
                    <h1
                        style={{
                            color: "var(--color-text-primary)",
                            fontSize: "1.1rem",
                            fontWeight: 800,
                            lineHeight: 1.4,
                            marginBottom: "0.75rem",
                            whiteSpace: "pre-wrap",
                            flexShrink: 0,
                        }}
                    >
                        {currentQuestion.question}
                    </h1>

                    {/* Illustration (flex-1 = 남은 공간 차지) */}
                    <div
                        style={{
                            flex: 1,
                            borderRadius: "1.25rem",
                            backgroundColor: "var(--color-surface)",
                            border: "1.5px solid var(--color-border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "0.75rem",
                            minHeight: 0,
                        }}
                    >
                        <span style={{ fontSize: "4rem" }}>
                            {currentQuestion.emoji ?? "🐶"}
                        </span>
                    </div>

                    {/* Answer Buttons */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flexShrink: 0 }}>
                        {currentQuestion.answers.map((ans, idx) => (
                            <motion.button
                                key={idx}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleAnswer(ans.scores, idx)}
                                className="answer-btn"
                                style={{ padding: "0.8rem 1rem", fontSize: "0.875rem" }}
                            >
                                <span>{ans.text}</span>
                                <div
                                    style={{
                                        width: "1.1rem",
                                        height: "1.1rem",
                                        borderRadius: "50%",
                                        border: "1.5px solid var(--color-border)",
                                        flexShrink: 0,
                                    }}
                                />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

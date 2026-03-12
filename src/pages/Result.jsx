// Leaflet
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

import { ORDER } from "../data/tag";
import { DOGS } from "../data/dog_char";
import { CENTERS } from "../data/centers";
import { rankDogs, buildExplain } from "../domain";
import { useQuiz } from "../store/quizStore";

// Fix for default marker icon in Leaflet + Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const ALPHA = 0.6;

const pageVariants = {
  initial: { opacity: 0, y: 14, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.995 },
};

const tapMotion = {
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 420, damping: 26 },
  style: { WebkitTapHighlightColor: "transparent" },
};

// Mock Stats Data - sage green palette
const STATS_DATA = [
  { name: "나와 같은 결과", value: 35, color: "#6B8F71" },
  { name: "다른 강아지들", value: 65, color: "#E8E6E1" },
];

const TAG_TRANSLATIONS = {
  "playful": "장난꾸러기",
  "confident": "자신감 뿜뿜",
  "jealous": "질투쟁이",
  "quickWitted": "눈치백단",
  "fearless": "용감무쌍",
  "independent": "마이웨이",
  "lifelongFriend": "평생친구",
  "gentle": "순둥이",
  "friendly": "인싸력 폭발",
  "outgoing": "외향적",
  "activitylevel": "무한동력",
  "size": "체격",
  "cheerful": "해피바이러스"
};

export default function Result() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);
  const cardRefs = useRef({});
  const { scores, resetScores } = useQuiz();
  const isResetting = useRef(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll into view when activeId changes
  useEffect(() => {
    if (activeId && cardRefs.current[activeId]) {
      // Small delay to allow layout reordering to finish
      const timer = setTimeout(() => {
        cardRefs.current[activeId].scrollIntoView({
          behavior: 'smooth',
          block: 'center', // Use center for more balanced view
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [activeId]);

  const { userVec, topTraits } = useMemo(() => {
    const sortedEntries = Object.entries(scores).sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    });
    // 사용자의 상위 6개 성향만 추출 (동물들의 성향 개수와 맞춤)
    const traits = sortedEntries.slice(0, 6).map((e) => e[0]);
    const topSet = new Set(traits);
    
    return {
      // 상위 6개에 포함된 성향만 점수를 유지하고 나머지는 0으로 처리 (위치 기반 매칭)
      userVec: ORDER.map((key) => (topSet.has(key) ? (scores[key] || 0) : 0)),
      topTraits: traits
    };
  }, [scores]);

  const isEmpty = useMemo(() => Object.keys(scores).length === 0, [scores]);

  const ranked = useMemo(() => {
    if (isEmpty) return [];
    return rankDogs(userVec, DOGS, ALPHA);
  }, [userVec, isEmpty]);

  const topScore = ranked[0]?._score ?? 0;
  // 점수 기반 랭킹 및 1위/2위 그룹 분리 (임계값 0.0001)
  const topMatches = useMemo(() => ranked.filter(dog => Math.abs((dog._score ?? 0) - topScore) < 0.0001), [ranked, topScore]);
  const otherMatches = useMemo(() => ranked.filter(dog => (topScore - (dog._score ?? 0)) >= 0.0001), [ranked, topScore]);
  const worstMatches = useMemo(() => ranked.slice(-2).reverse(), [ranked]);

  const top1 = topMatches[0];
  const explain = useMemo(() => (top1 ? buildExplain(userVec, top1) : null), [userVec, top1]);


  const getNickname = () => {
    // [리뉴얼] 5대 카테고리 점수 합산 로직 (평균치 사용)
    const categoryScores = [
      { id: 'energy', name: '무한동력', score: ((scores['activitylevel'] || 0) + (scores['playful'] || 0) + (scores['confident'] || 0) + (scores['outgoing'] || 0)) / 4 },
      { id: 'mental', name: '강철멘탈', score: ((scores['fearless'] || 0) + (scores['independent'] || 0) + (scores['gentle'] || 0) + (scores['size'] || 0)) / 4 },
      { id: 'sense', name: '눈치만렙', score: ((scores['quickWitted'] || 0) + (scores['jealous'] || 0) + (scores['cheerful'] || 0)) / 3 },
      { id: 'love', name: '사랑둥이', score: ((scores['lifelongFriend'] || 0) + (scores['friendly'] || 0) + (scores['gentle'] || 0)) / 3 },
      { id: 'clingy', name: '껌딱지', score: ((scores['jealous'] || 0) + (scores['outgoing'] || 0) + (scores['playful'] || 0) + (scores['cheerful'] || 0)) / 4 },
    ];

    // 점수 순 정렬
    const sortedCategories = categoryScores.sort((a, b) => b.score - a.score);
    const top1Category = sortedCategories[0];
    const top2Category = sortedCategories[1];

    // 명사 세트 (1위 카테고리 기준)
    const TITLES = {
      'energy': ['우리 집 무파사', '에너자이저', '인싸댕'],
      'mental': ['동네 대장님', '평화주의 군자', '시크방패'],
      'sense': ['여우 탈을 쓴 강아지', '눈치백단', '간식천재 전략가'],
      'love': ['영원한 내 편', '천사견', '따뜻한 위로자'],
      'clingy': ['주인 바라기 껌딱지', '24시간 밀착형', '잔망댕이 사랑꾼'],
    };

    // 형용사 세트 (2위 카테고리 기준)
    const ADJECTIVES = {
      'energy': ['무한동력의', '세상 모든 게 궁금한', '앞만 보고 달리는', '축제 분위기인'],
      'mental': ['위풍당당한', '득도한 선비 같은', '나만의 길을 걷는', '바위처럼 든든한'],
      'sense': ['머릿속에 계산기 두드리는', '사랑받을 줄 아는', '분위기 메이커인', '천재견 지망생인'],
      'love': ['뿌리 깊은 나무 같은', '솜사탕처럼 부드러운', '모두의 단짝 친구인', '마음 온도가 높은'],
      'clingy': ['그림자처럼 맴도는', '그대밖에 모르는', '스킨십 중독자인', '관심이 고픈']
    };

    const variantIndexModifier = Math.abs((top1?.id?.length || 0) + 1);
    const variantIndexTitle = Math.abs((top1?.id?.length || 0) + 2);

    // 2등 카테고리에 해당하는 형용사 배열
    const modifiers = ADJECTIVES[top2Category.id] || ['매력적인'];
    const randomModifier = modifiers[variantIndexModifier % modifiers.length];

    // 1등 카테고리에 해당하는 명사(타이틀) 배열
    const nounTitles = TITLES[top1Category.id] || ['강아지'];
    const randomNounTitle = nounTitles[variantIndexTitle % nounTitles.length];

    // 최종 결과 반환 (형용사 + 명사)
    return `${randomModifier} ${randomNounTitle}`;
  };

  const radarData = useMemo(() => {
    if (isEmpty) return [];

    // [리뉴얼] 13개 성향을 새로운 5개의 감성 카테고리로 재그룹화 (평균점수를 4배수로 스케일링하여 시각적 공정성 확보)
    return [
      {
        subject: '🔥 무한동력',
        A: (((scores['activitylevel'] || 0) + (scores['playful'] || 0) + (scores['confident'] || 0) + (scores['outgoing'] || 0)) / 4) * 4,
        fullMark: 8
      },
      {
        subject: '🛡️ 강철멘탈',
        A: (((scores['fearless'] || 0) + (scores['independent'] || 0) + (scores['gentle'] || 0) + (scores['size'] || 0)) / 4) * 4,
        fullMark: 8
      },
      {
        subject: '🐾 껌딱지',
        A: (((scores['jealous'] || 0) + (scores['outgoing'] || 0) + (scores['playful'] || 0) + (scores['cheerful'] || 0)) / 4) * 4,
        fullMark: 8
      },
      {
        subject: '🌻 사랑둥이',
        A: (((scores['lifelongFriend'] || 0) + (scores['friendly'] || 0) + (scores['gentle'] || 0)) / 3) * 4,
        fullMark: 8
      },
      {
        subject: '🦊 눈치만렙',
        A: (((scores['quickWitted'] || 0) + (scores['jealous'] || 0) + (scores['cheerful'] || 0)) / 3) * 4,
        fullMark: 8
      },
    ];
  }, [scores, isEmpty]);


  const handleHome = () => {
    isResetting.current = true;
    window.scrollTo(0, 0);
    navigate("/", { replace: true });
    // 페이지 이동 후 상태 초기화 (플리커링 방지)
    setTimeout(() => {
      resetScores();
    }, 50);
  };

  if (isEmpty && !isResetting.current) {
    return (
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen p-6 max-w-md mx-auto flex flex-col justify-center gap-4"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <p style={{ color: "var(--color-text-secondary)" }} className="text-center">
          결과 데이터가 없습니다.
        </p>
        <motion.button
          {...tapMotion}
          className="btn-primary w-full py-4"
          onClick={handleHome}
        >
          처음으로
        </motion.button>
      </motion.main>
    );
  }

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="min-h-screen w-full flex flex-col pb-12"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* ─── Header ─── */}
      <header
        className="p-5 text-center sticky top-0 z-[100]"
        style={{
          backgroundColor: "var(--color-surface)",
          borderBottom: "1.5px solid var(--color-border)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}
      >
        <h1
          className="text-base font-bold"
          style={{ color: "var(--color-text-primary)" }}
        >
          분석 결과
        </h1>
      </header>

      <div className="p-5 space-y-8">

        {/* ─── TITLE & NICKNAME ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-3 py-4 rounded-3xl"
          style={{
            background: "linear-gradient(180deg, rgba(107, 143, 113, 0.05) 0%, rgba(255, 255, 255, 0) 100%)",
            border: "1px solid rgba(107, 143, 113, 0.1)"
          }}
        >
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>
            MY SOUL PET COMPATIBILITY TITLE
          </p>
          <h2 className="text-2xl font-black px-4 break-keep" style={{ color: "var(--color-accent)" }}>
            "{getNickname()}"
          </h2>
          <div className="flex justify-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]"></span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]"></span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]"></span>
          </div>
        </motion.div>

        {/* ─── Section 1: Best Match (Hero or Tie Grid) ─── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="tag-chip">{topMatches.length > 1 ? "공동 1위" : "찰떡궁합 1위"}</span>
          </div>

          <div className={topMatches.length > 1 ? "grid grid-cols-1 gap-6 md:grid-cols-2" : "space-y-4"}>
            {topMatches.map((dog) => {
              const dogExplain = buildExplain(userVec, dog);
              const translatedTags = dogExplain?.matchedTags ? dogExplain.matchedTags.map(tag => TAG_TRANSLATIONS[tag] || tag) : [];

              return (
                <div key={dog.id} className="flex flex-col gap-3">
                  <div
                    className="rounded-3xl overflow-hidden flex flex-col h-full"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      border: "2px solid var(--color-accent)",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Dog Image */}
                    <div
                      className="w-full flex items-center justify-center py-6"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <img
                        src={dog.image}
                        alt={dog.name}
                        className={`${topMatches.length > 1 ? "w-32 h-32" : "w-40 h-40"} object-contain`}
                      />
                    </div>

                    <div className="p-4 pt-0 flex-grow">
                      <div className="flex items-baseline justify-between mb-1">
                        <h2
                          className={`${topMatches.length > 1 ? "text-lg" : "text-xl"} font-extrabold`}
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {dog.name}
                        </h2>
                        <span
                          className="text-[10px] font-bold"
                          style={{ color: "var(--color-accent)" }}
                        >
                          닮음 지수 {Math.min(100, Math.sqrt(Math.max(0, dog._score ?? 0) / 22.85) * 100).toFixed(2)}점
                        </span>
                      </div>

                      <p
                        className={`${topMatches.length > 1 ? "text-xs" : "text-sm"} leading-relaxed mb-3`}
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {dog.desc}
                      </p>

                      {/* Explanation for this specific dog (Only show mini-version in tie-grid) */}
                      {topMatches.length > 1 && translatedTags.length > 0 && (
                        <div className="mt-3 pt-3" style={{ borderTop: "1px dashed var(--color-border)" }}>
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {translatedTags.map((tag) => (
                              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                            <strong style={{ color: "var(--color-accent)" }}>이 강아지와 닮은 점: </strong>
                            당신이 퀴즈에서 선택하신 <strong>{translatedTags.join(", ")}</strong> 성향이 잘 맞아요!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explanation (Big unified message when there is a clear single winner) */}
          {topMatches.length === 1 && explain?.matchedTags && explain.matchedTags.length > 0 && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {explain.matchedTags.map(tag => TAG_TRANSLATIONS[tag] || tag).map((tag) => (
                  <span key={tag} className="tag-chip">#{tag}</span>
                ))}
              </div>
              <div
                className="rounded-xl p-4 text-sm leading-relaxed"
                style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text-secondary)" }}
              >
                <p>
                  <strong style={{ color: "var(--color-accent)", display: "block", marginBottom: "4px" }}>이 강아지와 닮은 점</strong>
                  당신이 선택하신 <strong>{explain.matchedTags.map(tag => TAG_TRANSLATIONS[tag] || tag).join(", ")}</strong> 성향이 이 강아지와 매칭되는 핵심 포인트예요!<br />
                  이런 비슷한 점들 덕분에 서로를 더 잘 이해하고 편안하게 함께할 수 있을 거예요.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ─── NEW Section: Radar Chart (User Personality Profile) ─── */}
        {
          !isEmpty && (
            <section className="mt-8 rounded-3xl p-6" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <h3 className="text-lg font-bold text-center mb-1" style={{ color: "var(--color-text-primary)" }}>
                멍생 성향 분석표
              </h3>
              <p className="text-xs text-center mb-6" style={{ color: "var(--color-text-muted)" }}>
                내가 문항에서 선택한 성향들의 밸런스예요
              </p>

              <div className="w-full h-64 -ml-1 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                    <PolarGrid stroke="var(--color-border)" strokeWidth={0.5} />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "var(--color-text-secondary)", fontSize: 10, fontWeight: 700 }}
                    />
                    <PolarRadiusAxis domain={[0, 8]} tick={false} axisLine={false} />
                    <Radar
                      name="성향 분석"
                      dataKey="A"
                      stroke="var(--color-accent)"
                      strokeWidth={3}
                      fill="var(--color-accent)"
                      fillOpacity={0.25}
                      animationBegin={300}
                      animationDuration={1500}
                    />
                    {/* Subtle Glow Effect via another Radar layer */}
                    <Radar
                      dataKey="A"
                      stroke="none"
                      fill="var(--color-accent)"
                      fillOpacity={0.1}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 p-3 rounded-xl text-center" style={{ backgroundColor: "var(--color-bg)" }}>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  가장 뾰족하게 튀어나온 부분이<br />
                  나를 대표하는 가장 강력한 특징입니다!
                </p>
              </div>
            </section>
          )
        }

        {/* ─── Section 2: Best Match #2 (Next unique match) ─── */}
        {
          otherMatches[0] && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-bold"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {topMatches.length > 1 ? "아쉽게 놓친 공동 2위" : "아쉽게 놓친 2위"}
                </span>
              </div>

              <div
                className="rounded-2xl p-4 flex items-center gap-4"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1.5px solid var(--color-accent)",
                }}
              >
                <div
                  className="w-20 h-20 flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: "transparent" }}
                >
                  <img
                    src={otherMatches[0]?.image}
                    alt={otherMatches[0]?.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className="font-bold mb-1"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {otherMatches[0]?.name}
                  </h4>
                  <p
                    className="text-sm line-clamp-2"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {otherMatches[0]?.desc}
                  </p>
                  <span
                    className="text-xs font-bold mt-1 inline-block"
                    style={{ color: "var(--color-accent)" }}
                  >
                    닮음 지수 {Math.min(100, Math.sqrt(Math.max(0, otherMatches[0]?._score ?? 0) / 22.85) * 100).toFixed(2)}점
                  </span>
                </div>
              </div>
            </section>
          )
        }

        {/* ─── Section 3: Worst Matches ─── */}
        {
          worstMatches.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-bold"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  나와 궁합도가 낮은 강아지
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {worstMatches.map((dog, idx) => (
                  <div
                    key={dog.id}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      border: "1.5px solid var(--color-border)",
                      opacity: 1,
                    }}
                  >
                    <div
                      className="w-full aspect-square flex items-center justify-center py-2"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <img
                        src={dog.image}
                        alt={dog.name}
                        className="w-full h-full object-contain p-3"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <h4
                          className="text-sm font-bold"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {dog.name}
                        </h4>
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: "var(--color-contrast-light)",
                            color: "var(--color-contrast)",
                          }}
                        >
                          반대 {idx + 1}위
                        </span>
                      </div>
                      <p
                        className="text-xs line-clamp-2"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {dog.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        }

        {/* ─── Section 4: Stats (Pie Chart) ─── */}
        <section
          className="rounded-3xl p-6"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1.5px solid var(--color-border)",
          }}
        >
          <h3
            className="text-base font-bold text-center mb-1"
            style={{ color: "var(--color-text-primary)" }}
          >
            이 강아지는 얼마나 있을까?
          </h3>
          <p
            className="text-xs text-center mb-6"
            style={{ color: "var(--color-text-muted)" }}
          >
            전체 참여자 중 나와 같은 결과가 나온 비율
          </p>

          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={STATS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={76}
                  paddingAngle={4}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {STATS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value) => [`${value}%`, ""]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1.5px solid var(--color-border)",
                    fontSize: "0.8rem",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span style={{ color: "var(--color-text-secondary)", fontSize: "0.75rem" }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
              <span
                className="block text-2xl font-extrabold"
                style={{ color: "var(--color-accent)" }}
              >
                35%
              </span>
              <span
                className="block text-[10px]"
                style={{ color: "var(--color-text-muted)" }}
              >
                나와 동일
              </span>
            </div>
          </div>
        </section>

        {/* ─── Section 5: Volunteer & Adoption Map ─── */}
        <section
          className="rounded-3xl p-6"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1.5px solid var(--color-border)",
          }}
        >
          <div className="flex flex-col gap-5">
            <div className="text-center">
              <span className="text-3xl mb-2 block">🐶</span>
              <h3
                className="text-lg font-extrabold mb-1"
                style={{ color: "var(--color-text-primary)" }}
              >
                가까운 곳에서 사랑을 나눠주세요!
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                나와 찰떡인 강아지를 현실에서도 만나볼까요?<br />
                다양한 지역의 보호소와 카페들이 기다리고 있어요.
              </p>
            </div>

            {/* Real Interactive Map (Leaflet) - Minimal Style */}
            <div
              className="w-full h-80 rounded-2xl relative overflow-hidden shadow-inner border"
              style={{ backgroundColor: "#f8f9fa", borderColor: "var(--color-border)", zIndex: 0 }}
            >
              <MapContainer
                center={[37.5665, 126.9780]}
                zoom={10}
                style={{ width: '100%', height: '100%' }}
                scrollWheelZoom={true}
                dragging={true}
                touchZoom={true}
                doubleClickZoom={true}
              >
                {/* Minimalist CartoDB Positron Tiles */}
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {/* HDS Area Shading for all subLocations */}
                {CENTERS.find(c => c.id === 3)?.subLocations.map((loc, idx) => (
                  <Circle
                    key={`hds-circle-${idx}`}
                    center={[loc.lat, loc.lng]}
                    radius={6000} // Moderate size as requested
                    pathOptions={{
                      fillColor: '#9C6644',
                      fillOpacity: 0.25, // Higher opacity for visibility
                      color: '#9C6644',
                      weight: 1,
                      dashArray: '3, 6'
                    }}
                  />
                ))}

                {CENTERS.flatMap(org =>
                  org.subLocations.map((loc, idx) => (
                    <Marker
                      key={`${org.id}-${idx}`}
                      position={[loc.lat, loc.lng]}
                      icon={L.divIcon({
                        className: 'custom-div-icon',
                        html: `
                          <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%);">
                            <div style="
                              width: 10px; 
                              height: 10px; 
                              background-color: ${org.color}; 
                              border: 2px solid white; 
                              border-radius: 50%; 
                              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                            "></div>
                            <div style="
                              margin-top: 4px; 
                              background-color: white; 
                              padding: 2px 6px; 
                              border-radius: 4px; 
                              font-size: 9px; 
                              font-weight: bold; 
                              color: #333;
                              box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                              white-space: nowrap;
                              border: 1px solid ${org.color}44;
                            ">${org.shortName} - ${loc.name}</div>
                          </div>
                        `,
                        iconSize: [0, 0],
                        iconAnchor: [0, 0]
                      })}
                    >
                      <Popup>
                        <div className="p-1">
                          <strong style={{ display: 'block', marginBottom: '2px' }}>{org.name}</strong>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: org.color }}>{loc.name}</span>
                          <p style={{ margin: '4px 0 0', fontSize: '10px', color: '#666' }}>{loc.addr}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))
                )}
              </MapContainer>
              <div className="absolute bottom-2 left-2 text-[10px] pointer-events-none z-[1000] px-2 py-1 bg-white/80 rounded" style={{ color: "var(--color-text-muted)" }}>
                * 마우스 휠 또는 두 손가락으로 확대 가능
              </div>
            </div>

            {/* Organization Cards List - Reordered Grid */}
            <div className="grid grid-cols-2 gap-3 items-start relative">
              {(() => {
                // Reorder centers: active card goes first
                let displayCenters = [...CENTERS];
                if (activeId) {
                  const activeIndex = displayCenters.findIndex(c => c.id === activeId);
                  if (activeIndex > -1) {
                    const [activeCard] = displayCenters.splice(activeIndex, 1);
                    displayCenters = [activeCard, ...displayCenters];
                  }
                }

                return displayCenters.map((center) => (
                  <motion.div
                    key={center.id}
                    ref={el => cardRefs.current[center.id] = el}
                    layout
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setActiveId(activeId === center.id ? null : center.id)}
                    className={`rounded-3xl p-5 border transition-all flex flex-col overflow-hidden relative ${activeId === center.id ? 'z-20 shadow-xl' : 'z-10 shadow-sm'}`}
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: center.id === activeId ? "var(--color-accent)" : "var(--color-border)",
                      cursor: "pointer",
                      gridColumn: activeId === center.id ? "span 2" : "span 1"
                    }}
                  >
                    <div className="mb-2">
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded font-bold text-white mb-1 inline-block"
                        style={{ backgroundColor: center.color }}
                      >
                        {center.activities.split(',')[0]}
                      </span>
                      <h4 className="font-extrabold text-sm" style={{ color: "var(--color-text-primary)" }}>
                        {center.name}
                      </h4>
                    </div>

                    <p className={`text-[10px] leading-snug mb-3 flex-1 overflow-hidden ${activeId === center.id ? '' : 'line-clamp-3'}`} style={{ color: "var(--color-text-secondary)" }}>
                      {center.desc}
                    </p>

                    <AnimatePresence>
                      {activeId === center.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3 border-t pt-3"
                          style={{ borderColor: "var(--color-border)" }}
                        >
                          {center.details && (
                            <div className="space-y-1">
                              {center.details.map((detail, i) => (
                                <p key={i} className="text-[10px] font-medium" style={{ color: "var(--color-text-muted)" }}>• {detail}</p>
                              ))}
                            </div>
                          )}
                          <div className="grid grid-cols-1 gap-2">
                            <a
                              href={center.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between w-full p-2.5 rounded-xl text-[10px] font-bold transition-all hover:brightness-95"
                              style={{ backgroundColor: "var(--color-accent)", color: "white" }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              공식 홈페이지 바로가기
                              <span>→</span>
                            </a>
                            {center.links?.map((link, i) => (
                              <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full p-2.5 rounded-xl text-[10px] font-bold transition-all hover:bg-gray-50 bg-white border"
                                style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {link.label}
                                <span>→</span>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!activeId && (
                      <div className="text-[9px] mt-auto font-bold opacity-50" style={{ color: "var(--color-text-muted)" }}>
                        클릭하여 정보 더보기
                      </div>
                    )}
                  </motion.div>
                ))
              })()}
            </div>
          </div>


        </section>

        {/* ─── Footer Actions ─── */}
        <footer className="space-y-3">
          <motion.button
            {...tapMotion}
            className="btn-primary w-full py-4"
            onClick={handleHome}
          >
            다시 테스트하기
          </motion.button>
          <button
            className="w-full py-4 rounded-2xl text-sm font-bold"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1.5px solid var(--color-border)",
              color: "var(--color-text-secondary)",
            }}
          >
            친구에게 결과 공유하기
          </button>
        </footer>

      </div >
    </motion.main >
  );
}

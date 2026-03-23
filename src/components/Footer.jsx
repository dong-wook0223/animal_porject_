import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const FooterSection = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <div className="border-t border-[var(--color-border)] first:border-t-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-3 px-4 flex items-center justify-between text-left transition-colors hover:bg-black/5"
            >
                <span className="text-[10px] font-medium text-[var(--color-text-muted)] leading-relaxed flex-1 pr-4">
                    {title}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="text-[var(--color-text-muted)] text-[10px]"
                >
                    ▼
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-[var(--color-accent-light)]/30"
                    >
                        <div className="p-4 pt-1 text-[10px] leading-relaxed text-[var(--color-text-secondary)] whitespace-pre-wrap">
                            {content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function Footer() {
    const GA_CONTENT = `[개인정보 처리방침 및 분석 안내]
본 서비스는 비영리 포트폴리오 목적으로 운영되며, 서비스 개선 및 이용자 분석을 위해 **Google Analytics(GA4)**를 사용하고 있습니다.

1. 수집하는 정보

서비스 이용 기록: 페이지 방문, 버튼 클릭(성향 테스트 시작 및 완료), 기기 정보(OS, 브라우저), 접속 지역(시 단위).

성향 테스트 데이터: 사용자가 선택한 답변 데이터 및 도출된 강아지 품종 결과값.

Google 신호 데이터: 구글 계정 로그인 및 광고 최적화에 동의한 사용자에 한해 익명화된 인구통계 정보(연령, 성별) 및 관심분야가 포함될 수 있습니다.

(중요) 본 서비스는 성함, 연락처, 이메일 등 개인을 식별할 수 있는 정보를 일절 수집하지 않습니다.

2. 정보 수집의 목적

성향 테스트의 응답 분포 통계 확인 및 서비스 UI/UX 개선.

다양한 기기에서의 접속 환경 최적화

3. 데이터 처리 및 보호 (법적/라이선스 준수)

데이터 익명화: 수집되는 모든 IP 주소는 즉시 익명화 처리되며, 특정 개인을 추적할 수 없는 상태로 저장됩니다.

라이선스 준수: 본 서비스는 Google Analytics의 이용 약관을 준수하며, 수집된 데이터를 상업적으로 활용하거나 제3자에게 판매하지 않습니다.

투명성: 수집된 통계 데이터는 오직 서비스 운영 및 기술적 분석 목적으로만 활용됩니다.

4. 데이터 수집 제어
사용자는 원치 않을 경우 데이터 수집을 차단할 수 있습니다.

브라우저 설정: 쿠키 차단을 통해 데이터 전송을 거부할 수 있습니다.

차단 도구: Google Analytics 차단 브라우저 부가 기능을 설치하여 이용할 수 있습니다.`;

    const NON_PROFIT_CONTENT = `[안내] 본 서비스는 유기동물 입양 및 봉사문화를 응원하기 위한 비영리 프로젝트입니다. 
제공되는 정보는 각 단체의 공식 안내를 참조하였으나 실시간으로 변경될 수 있습니다. 
봉사 및 입양 참여 전 반드시 해당 단체 홈페이지에서 최신 공고를 확인해주세요. 
본 프로젝트는 해당 단체들과 공식 제휴 관계가 없으며, 관련 활동으로 발생하는 문제에 대해 책임을 지지 않습니다.`;

    const DATA_SOURCE_CONTENT = `본 프로젝트는 국립축산과학원의 '국내 친숙 반려견' 24종과 '한국애견협회-KKC 매거진-견종표준-견종 소개'데이터를 활용하여 제작되었습니다. 각각의 강이지의 성격은 환경과 개체에 따라 차이가 있을 수 있으니, 본 결과는 가벼운 마음으로 재미있게 즐겨주세요.`;


    return (
        <footer className="w-full mt-auto bg-[var(--color-surface)] border-t border-[var(--color-border)]">
            <FooterSection
                title="본 프로젝트는 '한국애견협회-KKC 매거진-견종표준-견종 소개'데이터를 활용하여 제작되었습니다."
                content={DATA_SOURCE_CONTENT}
            />
            <FooterSection
                title="본 서비스는 유기동물 입양 및 봉사문화를 응원하기 위한 비영리 프로젝트입니다."
                content={NON_PROFIT_CONTENT}
            />
            <FooterSection
                title="본 서비스는 원활한 서비스 분석 및 개선을 위해 Google Analytics(GA4)를 사용하고 있습니다."
                content={GA_CONTENT}
            />
            <div className="py-4 px-4 text-center">
                <p className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-widest">
                    © 2026 Animal Personality Test Project_DwBy
                </p>
            </div>
        </footer>
    );
}

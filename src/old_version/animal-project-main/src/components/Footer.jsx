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
    const GA_CONTENT = `[개인정보 처리방침 및 데이터 수집 안내]
본 서비스는 비영리 프로젝트 및 포트폴리오 목적으로 운영되며, 이용자의 개인정보를 최우선으로 보호합니다. 서비스 개선 및 데이터 분석을 위해 **Google Analytics 4(GA4)**를 활용하며, 관련 법령 및 구글의 최신 데이터 보안 정책을 준수합니다.

1. 수집하는 정보 및 기술적 항목
이벤트 데이터: 페이지 조회, 버튼 클릭(테스트 시작/완료), 특정 결과 도출 값.

기기 및 환경 정보: 브라우저 유형, 운영체제(OS), 접속 지역(시/군/구 단위의 비식별 지역 정보).

트래픽 유입 경로: 사용자가 서비스를 방문하게 된 소스(예: 커뮤니티, SNS) 및 캠페인 정보(UTM 파라미터).

Google 신호 데이터: 구글 계정 설정에서 광고 최적화에 동의한 사용자에 한해 익명화된 인구통계(연령, 성별) 및 관심분야 데이터가 포함될 수 있습니다.

중요: 본 서비스는 성명, 연락처, 이메일, 주소 등 개인 식별 정보를 일절 수집하거나 저장하지 않습니다.

2. 데이터 수집 및 활용 목적
서비스 최적화: 성향 테스트 응답 분포 분석을 통한 결과 및 UI/UX 개선.

트래픽 분석: 매체별 유입 효율 측정 및 서비스 활성화 정도 파악.

기술적 대응: 다양한 접속 환경(모바일/데스크톱)에서의 안정적인 서비스 제공.

3. 데이터 보호 및 정책 준수 (Compliance)
IP 익명화: GA4의 기본 정책에 따라 모든 접속 IP는 즉시 익명화 처리되어 전송되며, 특정 개인을 추적할 수 없습니다.

동의 모드 v2 준수: 본 서비스는 구글의 최신 Consent Mode v2 프레임워크를 적용하여 운영됩니다. 수집된 데이터는 구글의 데이터 보호 약관을 엄격히 준수하며, 제3자에게 판매하거나 상업적으로 오용하지 않습니다.

데이터 보존 기간: 수집된 분석 데이터는 서비스 운영 및 포트폴리오 검토 목적 달성 후 지체 없이 파기됩니다.

4. 이용자의 권리 및 데이터 수집 제어
사용자는 언제든지 자신의 데이터가 수집되는 것을 거부할 권리가 있습니다.

쿠키 설정: 브라우저 설정을 통해 쿠키 수집을 거부할 수 있습니다.

차단 도구 활용: Google Analytics 차단 브라우저 부가 기능을 설치하여 모든 데이터 전송을 원천 차단할 수 있습니다.`;

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

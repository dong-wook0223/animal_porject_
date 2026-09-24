export const QUESTIONS = [
    {
        id: 1,
        title: "사회생활",
        question: "옆 부서 사람이 내 강아지 사진을 보더니 자기도 키우고 싶다며 이것저것 묻기 시작한다.",
        emoji: "🐶",
        answers: [
            { text: "아, 넵 근데 강아지마다 달라서 글쎄요.. ", scores: { independent: 1.32 } },
            { text: "정말요? 저희 애가 좀 귀엽긴 하죠! 궁금한 거 다 물어보세요!", scores: { friendly: 1.68 } },
        ],
    },
    {
        id: 2,
        title: "인간관계",
        question: "연락이 잘되는 지인에게 꼭 필요한 연락을 남겼는데 답장이 안온다면?",
        emoji: "💌",
        answers: [
            { text: "혹시 내가 뭐 실수했나? 기분 상했나? (오만가지 생각 중)", scores: { jealous: 1.47 } },
            { text: "바쁜가 보네 뭐. 나중에 알아서 연락 오겠지.", scores: { fearless: 1.13 } },
        ],
    },
    {
        id: 3,
        title: "문제해결",
        question: "주말이라 카트로 북적이는 대형 마트! 내가 찾고 있는 물건의 위치가 보이지 않는다면?",
        emoji: "🛒",
        answers: [
            { text: "저기요! 이거 어디 있어요? 지나가는 직원분께 바로 물어본다.", scores: { outgoing: 2.15 } },
            { text: "천장 안내 표지판과 진열대 번호를 슥 보고 위치를 단번에 알아챈다.", scores: { quickWitted: 1.85 } },
        ],
    },
    {
        id: 4,
        title: "데이트",
        question: "지인들과 처음 가본 식당. 메뉴판에 '셰프 강력 추천 미스터리 메뉴'가 있다.",
        emoji: "❓",
        answers: [
            { text: "인생은 모험이지! 미스터리 메뉴 한번 시켜보자!", scores: { playful: 1.29 } },
            { text: "괜히 모험하지 말고 가장 인기 있는 검증된 메뉴로 먹자.", scores: { gentle: 1.71 } },
        ],
    },
    {
        id: 5,
        title: "생존력",
        question: "상상도 못한 좀비 아포칼립스! 높은 선반 위 마지막 식량 발견.",
        emoji: "🧟",
        answers: [
            { text: "위험해도 무조건 올라가서 쟁취한다 ", scores: { size: 2.42 } },
            { text: "일단 주변 지형지물 이용해 안전하게 ", scores: { activitylevel: 1.58 } },
        ],
    },
    {
        id: 6,
        title: "공유",
        question: "오랫동안 바라던 큰 목표를 마침내 이루었다! 가장 먼저 이 기쁜 소식을 알릴 곳은?",
        emoji: "🔗",
        answers: [
            { text: "모두가 알 수 있게 단체방이나 모임에 자랑한다! 파티 열자!", scores: { cheerful: 1.63 } },
            { text: "가장 소중하고 가까운 가족이나 지인 몇 명에게만 은밀히 연락한다.", scores: { lifelongFriend: 2.37 } },
        ],
    },
    {
        id: 7,
        title: "노래방",
        question: "노래방에서 첫 곡을 고르는 순간!",
        emoji: "🎤",
        answers: [
            { text: "분위기 살리려고 내가 먼저 노래를 시작한다.", scores: { confident: 1.94 } },
            { text: "분위기 보고 딱 맞는 노래를 고른다.", scores: { quickWitted: 2.15 } },
        ],
    },
    {
        id: 8,
        title: "모험",
        question: "지도에도 없는 낯선 무인도에 떨어졌다. 나의 행동은?",
        emoji: "🏝️",
        answers: [
            { text: "구조고 뭐고 일단 섬부터 탐험해 본다 ", scores: { fearless: 2.87 } },
            { text: "SOS 신호 보내고 사람부터 찾는다 ", scores: { outgoing: 1.85 } },
        ],
    },
    {
        id: 9,
        title: "자기계발",
        question: "모처럼 일찍 눈이 떠진 상쾌한 휴일 아침! 나에게 자유시간이 주어졌다면?",
        emoji: "🌅",
        answers: [
            { text: "일단 밖으로 나가서 활기차게 산책이나 가벼운 운동을 한다.", scores: { activitylevel: 2.42 } },
            { text: "따뜻한 차를 마시며 집에서 여유롭게 책을 읽거나 명상을 한다.", scores: { gentle: 2.29 } },
        ],
    },
    {
        id: 10,
        title: "취향",
        question: "당신이 가장 선호하는 모임 장소의 분위기는?",
        emoji: "☕",
        answers: [
            { text: "시끌벅적하고 활기찬 에너지가 넘치는 인기 명소", scores: { friendly: 2.32 } },
            { text: "조용하게 서로의 대화에 집중할 수 있는 나만의 아지트", scores: { independent: 2.68 } },
        ],
    },
    {
        id: 11,
        title: "인간관계",
        question: "친하다고 생각한 지인이 말도 없이 나도 아는 사람들과 즐거운 주말 모임을 가진걸 우연히 알게된다면?",
        emoji: "🧐",
        answers: [
            { text: "장난스럽게 \"나 빼고 재미있었냐?\" 하면서 쿨하게 넘긴다.", scores: { playful: 2.71 } },
            { text: "왜 나한테는 말 안 했는지 은근히 서운해서 슬쩍 물어본다.", scores: { jealous: 2.53 } },
        ],
    },
    {
        id: 12,
        title: "여행",
        question: "친구들과 여행을 갔을 때 나는?",
        emoji: "📸",
        answers: [
            { text: "분위기 띄우며 다 같이 웃고 노는 시간을 만든다.", scores: { cheerful: 2.37 } },
            { text: "여행 계획을 정리하고 일정을 리드한다.", scores: { confident: 2.06 } },
        ],
    },
    {
        id: 13,
        title: "도움",
        question: "높은 선반 위에 있는 무거운 짐을 내려야 하는 난처한 상황이라면?",
        emoji: "📦",
        answers: [
            { text: "까치발 들 필요 없어. 내가 팔만 뻗어서 슥- 내려줄게 ", scores: { size: 1.58 } },
            { text: "조심해! 내가 옆에서 단단히 붙잡아 줄 테니 같이 내려보자. ", scores: { lifelongFriend: 1.63 } },
        ],
    },
];

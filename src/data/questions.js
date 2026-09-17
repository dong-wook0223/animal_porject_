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
        question: "짝사랑하던 이성에게 '자니?'라고 보냈는데 1시간째 안 읽음!",
        emoji: "💌",
        answers: [
            { text: "설마 나 차단했나? (오만가지 생각 중)", scores: { jealous: 1.47 } },
            { text: "자나 보네 뭐. 꿀잠 자라 ", scores: { fearless: 1.13 } },
        ],
    },
    {
        id: 3,
        title: "문제해결",
        question: "인파로 북적이는 팝업스토어! 한정판 굿즈 위치를 찾기 어렵다면?",
        emoji: "🥳",
        answers: [
            { text: "직원에게 다가가 웃으며 '굿즈 어디서 찾나요?'라고 물어본다.", scores: { outgoing: 2.15 } },
            { text: "사람들의 동선과 푯말을 슥 보고 위치를 단번에 알아챈다.", scores: { quickWitted: 1.85 } },
        ],
    },
    {
        id: 4,
        title: "데이트",
        question: "애인과 처음 온 맛집. 메뉴판에 '셰프 추천 미스터리 메뉴'가 있다.",
        emoji: "❓",
        answers: [
            { text: "인생은 모험! 미스터리 메뉴 고! ", scores: { playful: 1.29 } },
            { text: "괜히 망치지 말고 검증된 거 먹자", scores: { gentle: 1.71 } },
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
        question: "정말 가고 싶던 곳에 합격했다! 가장 먼저 이 소식을 전달 받을 사람은?",
        emoji: "🔗",
        answers: [
            { text: "SNS에 바로 업로드! 성대한 파티각 ", scores: { cheerful: 1.63 } },
            { text: "제일 가까운 친구 몇 명에게만 알려주기", scores: { lifelongFriend: 2.37 } },
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
        question: "갓생 살기 도전! 새벽 5시 알람이 울린다면?",
        emoji: "🌅",
        answers: [
            { text: "일단 뛰쳐나가서 공원 10바퀴 런닝", scores: { activitylevel: 2.42 } },
            { text: "따뜻한 차 마시며 명상과 일기 쓰기", scores: { gentle: 2.29 } },
        ],
    },
    {
        id: 10,
        title: "취향",
        question: "당신이 가장 선호하는 카페 분위기는?",
        emoji: "☕",
        answers: [
            { text: "사람 구경하며 떠들썩한 힙한 카페 ", scores: { friendly: 2.32 } },
            { text: "숨겨진 뒷골목 나만 아는 아지트 ", scores: { independent: 2.68 } },
        ],
    },
    {
        id: 11,
        title: "연애",
        question: "애인의 SNS에 모르는 사람이 하트를 엄청 눌렀다면?",
        emoji: "🧐",
        answers: [
            { text: "장난스럽게 '어? 인기 많네?' 하며 슬쩍 놀린다.", scores: { playful: 2.71 } },
            { text: "누군지 은근히 신경 쓰여서 슬쩍 물어본다.", scores: { jealous: 2.53 } },
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

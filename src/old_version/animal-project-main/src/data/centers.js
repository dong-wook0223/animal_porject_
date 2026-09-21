export const CENTERS = [
    {
        id: 1,
        name: "다시사랑받개",
        shortName: "사랑받개",
        activities: "봉사활동, 입양",
        location: "서울특별시 중랑구 용마산로 529, 4층",
        desc: "안락사 위기 유기견을 보호하고 새로운 가족을 찾아주는 보호소 겸 애견카페입니다.",
        website: "https://www.dasadog.com/",
        color: "#6B8F71",
        details: [
            "입장료: 8000원 (12세 이상부터 입장가능)",
            "입양문의 및 상담: 평일만 가능",
            "운영시간: 13:00 ~ 21:00 (월, 화 휴관)"
        ],
        subLocations: [
            { name: "다시사랑받개", addr: "서울특별시 중랑구 용마산로 529", lat: 37.595, lng: 127.098 }
        ]
    },
    {
        id: 2,
        name: "동물권행동 카라",
        shortName: "카라",
        activities: "봉사활동, 임시보호, 입양",
        location: "서울 마포, 경기 파주",
        desc: "동물의 권리와 복지를 증진하는 시민단체로, 체계적인 입양 절차를 운영합니다.",
        website: "https://www.ekara.org/",
        color: "#D4A373",
        links: [
            { label: "봉사활동 상세보기", url: "https://www.karadoing.org/" },
            { label: "입양 상세보기", url: "https://www.ekara.org/kams/adopt?status=%EC%9E%85%EC%96%91%EA%B0%80%EB%8A%A5" }
        ],
        subLocations: [
            { name: "아름품(마포)", addr: "서울시 마포구 잔다리로 122", lat: 37.5558, lng: 126.9158 },
            { name: "더봄센터(파주)", addr: "경기도 파주시 법원읍 술이홀로 1409", lat: 37.848, lng: 126.862 }
        ]
    },
    {
        id: 3,
        name: "행동하는 동물사랑",
        shortName: "행동사",
        activities: "봉사활동, 임시보호, 입양",
        location: "파주, 일산, 신림",
        desc: "시민들이 자발적으로 참여하는 단체로, 보호와 입양 캠페인을 진행합니다.",
        website: "https://cafe.naver.com/pajupetlove?iframe_url=/ArticleList.nhn%3Fsearch.clubid=24693721%26search.menuid=12%26search.boardtype=L",
        color: "#9C6644",
        links: [
            { label: "봉사/임보 신청방법", url: "https://cafe.naver.com/f-e/cafes/24693721/menus/293?viewType=L" }
        ],
        subLocations: [
            { name: "쉼터(파주)", addr: "파주", lat: 37.885, lng: 126.732 },
            { name: "쉼뜰(일산)", addr: "일산", lat: 37.658, lng: 126.832 },
            { name: "입양뜰(신림)", addr: "서울시 관악구 신림", lat: 37.485, lng: 126.929 }
        ]
    },
    {
        id: 4,
        name: "구리시 반려돌봄센터",
        shortName: "구리센터",
        activities: "봉사활동, 입양",
        location: "경기도 구리시 동구릉로 136번길 57",
        desc: "구리시에서 운영하는 공공 시설로, 올바른 반려 문화 교육을 제공합니다.",
        website: "https://www.guri.go.kr/animal/index.do",
        color: "#4A7C59",
        subLocations: [
            { name: "구리반려돌봄센터", addr: "경기도 구리시 동구릉로 136번길 57", lat: 37.620, lng: 127.135 }
        ]
    },
    {
        id: 5,
        name: "서울시립동물복지지원센터",
        shortName: "시립센터",
        activities: "봉사활동, 입양, 카페",
        location: "마포, 구로, 동대문",
        desc: "서울시 공공 시설로, 동물 구조와 치료 및 교육을 제공합니다.",
        website: "https://cafe.naver.com/seoulanimalcare",
        color: "#2D4A53",
        subLocations: [
            { name: "마포센터", addr: "서울시 마포구 매봉산로 31", lat: 37.581, lng: 126.890 },
            { name: "구로센터", addr: "서울시 구로구 경인로 472", lat: 37.498, lng: 126.873 },
            { name: "동대문센터", addr: "서울시 동대문구 무학로 201", lat: 37.581, lng: 127.034 }
        ]
    }
];

export interface Venue {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  description: string;
  priceKRW: number;
  location: string;
  address: string;
  openHours: string;
  closedDay: string;
  emoji: string;
  phase: 1 | 2 | 3;
  highlights: string[];
}

export const VENUES: Venue[] = [
  {
    id: "gyeongbokgung",
    name: "경복궁",
    nameEn: "Gyeongbokgung Palace",
    category: "궁궐",
    description:
      "조선 왕조의 법궁으로, 1395년 창건된 서울의 대표적인 궁궐입니다. 근정전, 경회루 등 국보급 건축물을 감상할 수 있습니다.",
    priceKRW: 3000,
    location: "서울 종로구",
    address: "서울특별시 종로구 사직로 161",
    openHours: "09:00 ~ 18:00 (동절기 17:00)",
    closedDay: "화요일",
    emoji: "🏯",
    phase: 1,
    highlights: ["근정전 (국보)", "경회루 (국보)", "수문장 교대식", "왕궁 수문장"],
  },
  {
    id: "changdeokgung",
    name: "창덕궁",
    nameEn: "Changdeokgung Palace",
    category: "궁궐 · UNESCO 세계문화유산",
    description:
      "1405년 창건된 조선의 이궁으로 1997년 UNESCO 세계문화유산으로 등재되었습니다. 후원(비원)의 아름다운 정원이 유명합니다.",
    priceKRW: 3000,
    location: "서울 종로구",
    address: "서울특별시 종로구 율곡로 99",
    openHours: "09:00 ~ 17:30 (계절별 상이)",
    closedDay: "월요일",
    emoji: "🏰",
    phase: 1,
    highlights: ["UNESCO 세계문화유산", "후원(비원) 정원", "인정전 (국보)", "부용정"],
  },
  {
    id: "deoksugung",
    name: "덕수궁",
    nameEn: "Deoksugung Palace",
    category: "궁궐",
    description:
      "조선 말기~대한제국 시기의 궁궐로, 전통 목조 건축과 서양식 건축이 공존하는 독특한 공간입니다. 국립현대미술관 덕수궁관이 있습니다.",
    priceKRW: 1000,
    location: "서울 중구",
    address: "서울특별시 중구 세종대로 99",
    openHours: "09:00 ~ 21:00",
    closedDay: "월요일",
    emoji: "🏛️",
    phase: 1,
    highlights: ["석조전 (서양식 건축)", "대한문 수문장 교대", "국립현대미술관", "중화전"],
  },
];

export function getVenue(id: string): Venue | undefined {
  return VENUES.find((v) => v.id === id);
}

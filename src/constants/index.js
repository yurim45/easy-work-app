export const MENU_LIST = [
  { id: 1, value: 'Day Off', url: '/day-off' },
  { id: 2, value: 'ATNP Point', url: '/point' },
  { id: 3, value: 'Supply', url: '/item' },
  // { id: 4, value: 'Voting', url: '/voting' },
  // { id: 5, value: 'Gacha!', url: '/gacha' },
  // { id: 6, value: 'Board', url: '/board' },
  // { id: 7, value: 'Daily menu', url: '/daily-menu' },
];

// 포인트
export const ITEM_CODE = {
  Together: '회식',
  ExceedMeal: '식대초과',
  Snacks: '식음료',
  Culture: '문화',
  Item: '물품',
  Publish: '포인트 발급',
  Send: '포인트 선물',
  Receive: '포인트 선물',
};

// 연차
export const DAYOFF_LIST = [
  { id: 1, name: '연차', value: 'FullOff' },
  { id: 2, name: '연말정산 특별휴가', value: 'Refresh' },
  { id: 3, name: '여름휴가', value: 'Summer' },
  { id: 4, name: '멍떠', value: 'Mung' },
  { id: 5, name: 'Apple Vacation', value: 'Apple' },
  { id: 7, name: '연초 정산', value: 'adjust' },
  // { id: 6, name: '공가', value: 'OfficialEvent' },
  // { id: 7, name: '출산 휴가', value: 'Childbirth' },
  // { id: 8, name: '배우자 출산휴가', value: 'SpouseChildbirth' },
  // { id: 9, name: '가족 돌봄 휴가', value: 'FamilyCare' },
  // { id: 10, name: '보건 휴가', value: 'Health' },
];

export const DAYOFF_CODE = [
  { id: 1, name: '연차', value: 'FullOff' },
  { id: 2, name: '오전 반차', value: 'HalfOffAM' },
  { id: 3, name: '오후 반차', value: 'HalfOffPM' },
];

export const _DAYOFF_CODE = {
  FullOff: '연차',
  HalfOffAM: '오전 반차',
  HalfOffPM: '오후 반차',
  Refresh: '연말정산 특별휴가',
  Summer: '여름휴가',
  Mung: '멍떠',
  Apple: 'Apple Vacation',
  OfficialEvent: '공가',
  Childbirth: '출산 휴가',
  SpouseChildbirth: '배우자 출산휴가',
  FamilyCare: '가족 돌봄 휴가',
  Health: '보건 휴가',
  System: '관리자 연차 발급',
};

export const OTHER_DAYOFF_LIST = [
  { id: 1, name: '경조 휴가', url: 'FamilyEvent' },
  { id: 2, name: '공가', url: 'OfficialEvent' },
  { id: 3, name: '출산 휴가', url: 'Childbirth' },
  { id: 4, name: '배우자 출산휴가', url: 'SpouseChildbirth' },
  { id: 5, name: '가족 돌봄 휴가', url: 'FamilyCare' },
  { id: 6, name: '보건 휴가', url: 'Health' },
];

// 물품 구매 신청
export const SUPPLY_CODE = {
  Snacks: '식품',
  Item: '물품',
  Books: '도서',
  Etc: '기타',
};

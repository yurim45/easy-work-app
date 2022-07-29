export const ITEM_LIST = [
  { value: '식대초과', label: '식대초과', icon: '🍚' },
  { value: '식음료', label: '식음료', icon: '🍻' },
  { value: '문화', label: '문화', icon: '🎪' },
  { value: '물품', label: '물품', icon: '🛍' },
];

export const ANNUAL_LIST = [
  { value: 'annual', label: '연차' },
  { value: 'special', label: '연말정산 특별휴가' },
  { value: 'summer', label: '여름휴가' },
  { value: 'alone', label: '혼떠' },
  { value: 'apple', label: 'Apple vacation' },
  { value: 'cc', label: '경조휴가' },
  { value: 'official', label: '공가' },
  { value: 'maternity', label: '출산휴가' },
  { value: 'paternity', label: '배우자 출산휴가' },
  { value: 'family', label: '가족 돌봄 휴가' },
  { value: 'physiological', label: '보건휴가' },
];

export const HARF_ANNUAL_LIST = [
  { value: 'annual', label: '종일' },
  { value: 'morningAnnual', label: '오전반차' },
  { value: 'afternoonAnnual', label: '오후반차' },
];

// 삭제 예정
export const MY_INFO = {
  nick: 'with',
  EnNick: '위드',
  name: '예상기',
  title: 'Developer',
  point: { totalPoint: 350000, usePoint: 304410 },
  dayOff: 8.5,
  specialVacation: {
    status: true,
    special: 0,
    summer: 3,
    alone: 1,
    apple: 0,
  },
};

// 삭제 예정
export const ME_DAYOFF = {
  dayOff: 8.5,
  specialVacation: {
    status: true,
    special: 5,
    summer: 3,
    alone: 1,
    apple: 0,
  },
};

// 삭제 예정
export const USER_LIST = [
  {
    value: 'Warren',
    label: '워렌',
    totalPoint: 350000,
    usePoint: 304410,
    name: '원정연',
  },
  {
    value: 'Kevin',
    label: '케빈',
    totalPoint: 350000,
    usePoint: 226118,
    name: '차영민',
  },
  {
    value: 'With',
    label: '위드',
    totalPoint: 350000,
    usePoint: 269245,
    name: '예상기',
  },
  {
    value: 'Sera',
    label: '세라',
    totalPoint: 350000,
    usePoint: 327336,
    name: '신새나',
  },
  {
    value: 'Anna',
    label: '안나',
    totalPoint: 350000,
    usePoint: 235418,
    name: '조현정',
  },
  {
    value: 'Rooney',
    label: '루니',
    totalPoint: 350000,
    usePoint: 218832,
    name: '이기태',
  },
  {
    value: 'Charles',
    label: '찰스',
    totalPoint: 350000,
    usePoint: 204178,
    name: '이창희',
  },
  {
    value: 'Jude',
    label: '주드',
    totalPoint: 350000,
    usePoint: 325055,
    name: '양주엽',
  },
  {
    value: 'Henry',
    label: '헨리',
    totalPoint: 350000,
    usePoint: 279765,
    name: '황규영',
  },
  {
    value: 'James',
    label: '제임스',
    totalPoint: 350000,
    usePoint: 266159,
    name: '오태석',
  },
  {
    value: 'Roy',
    label: '로이',
    totalPoint: 26672,
    usePoint: 77585,
    name: '김석호',
  },
  {
    value: 'April',
    label: '프릴',
    totalPoint: 263336,
    usePoint: 296021,
    name: '김유림',
  },
];

// 삭제 예정
export const POINT_HISTORY = [
  {
    id: 1,
    writer: 'April',
    date: '2022-04-05',
    useItem: '식대초과',
    usePlace: '꼬기파티',
    content: '밥 많이 먹었어요',
    targets: ['프릴', '워렌', '위드', '제임스', '주드'],
    excludedTargets: ['대표님'],
    amount: -3000,
  },
  {
    id: 2,
    writer: 'With',
    date: '2022-04-06',
    useItem: '식음료',
    usePlace: '치킨앤맥주',
    content: '',
    targets: ['제임스', '루니', '위드'],
    excludedTargets: [],
    amount: -3000,
  },
  {
    id: 3,
    writer: 'April',
    date: '2022-04-07',
    useItem: '문화',
    usePlace: '탑건',
    content: '영화봤어요',
    targets: ['케빈', '찰스', '프릴', '제임스', '주드', '위드'],
    excludedTargets: ['하울'],
    amount: -4000,
  },
  {
    id: 4,
    writer: 'With',
    date: '2022-04-10',
    useItem: '물품',
    content: '00 샀어요~',
    usePlace: '물품 샀어요',
    targets: ['주드', '로이'],
    excludedTargets: [],
    amount: -4000,
  },
  {
    id: 5,
    writer: 'April',
    date: '2022-04-11',
    useItem: '보내기',
    usePlace: '',
    content: '00 샀어요~',
    targets: ['주드'],
    amount: -5000,
  },
  {
    id: 6,
    writer: 'Jude',
    date: '2022-04-20',
    useItem: '받기',
    usePlace: '',
    targets: ['헨리'],
    content: '00 샀어요~',
    amount: 5000,
  },
];

// 삭제 예정
export const ADMIN_POINT_HISTORY = [
  {
    id: 2,
    date: '2022-04-06',
    useItem: '식음료',
    usePlace: '치킨앤맥주',
    content: '',
    targets: ['제임스', '루니', '위드'],
    excludedTargets: [],
    amount: -3000,
  },
  {
    id: 3,
    date: '2022-04-07',
    useItem: '문화',
    usePlace: '탑건',
    content: '영화봤어요',
    targets: ['케빈', '찰스', '프릴', '제임스', '주드', '위드'],
    excludedTargets: [],
    amount: -4000,
  },
  {
    id: 4,
    date: '2022-04-10',
    useItem: '물품',
    content: '00 샀어요~',
    usePlace: '물품 샀어요',
    targets: ['주드', '로이'],
    excludedTargets: ['하울'],
    amount: -4000,
  },
];

// 삭제 예정
export const DAY_OFF_DATA = [
  {
    user: '프릴',
    dayOffItem: '오후반차',
    startDate: '2022-07-20',
    endDate: '2022-07-20',
  },
];

// 삭제 예정
export const USER_ANNUAL_LIST = [
  {
    id: 1,
    user: 'april',
    dayOffItem: '오후반차',
    useYear: '2021',
    startDate: '2021-12-26',
    endDate: '2021-12-26',
    isApprove: true,
  },
  {
    id: 2,
    user: 'april',
    dayOffItem: '연차',
    useYear: '2022',
    startDate: '2022-03-20',
    endDate: '2022-03-20',
    isApprove: true,
  },
  {
    id: 3,
    user: 'april',
    dayOffItem: '오후반차',
    useYear: '2022',
    startDate: '2022-07-20',
    endDate: '2022-07-20',
    isApprove: true,
  },
  {
    id: 4,
    user: 'april',
    useYear: '2022',
    dayOffItem: '여름휴가',
    startDate: '2022-08-20',
    endDate: '2022-08-20',
    isApprove: false,
  },
];

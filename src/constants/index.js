export const ITEM_LIST = [
  { value: '식대초과', label: '식대초과', icon: '🍚' },
  { value: '식음료', label: '식음료', icon: '🍻' },
  { value: '문화', label: '문화', icon: '🎪' },
  { value: '물품', label: '물품', icon: '🛍' },
];

export const USER_LIST = [
  { value: 'Warren', label: '워렌', point: 1945, name: '원정연' },
  { value: 'Kevin', label: '케빈', point: 1945, name: '차영민' },
  { value: 'With', label: '위드', point: 1945, name: '예상기' },
  { value: 'Sera', label: '세라', point: 1945, name: '신새나' },
  { value: 'Anna', label: '안나', point: 1945, name: '조현정' },
  { value: 'Rooney', label: '루니', point: 1945, name: '이기태' },
  { value: 'Charles', label: '찰스', point: 1945, name: '이창희' },
  { value: 'Henry', label: '헨리', point: 1945, name: '황규영' },
  { value: 'James', label: '제임스', point: 1945, name: '오태석' },
  { value: 'Roy', label: '로이', point: 1945, name: '김석호' },
  { value: 'April', label: '프릴', point: 1945, name: '김유림' },
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
    excludedTargets: [],
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
    excludedTargets: [],
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

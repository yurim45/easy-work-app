// 천단위 생성
const getNumFormat = (data) => {
  if (!data) return 0;

  return Math.round(data)
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 천단위 제거
const removeNumFormat = (data) => {
  if (!data) return 0;

  return +String(data)?.replaceAll(/,/g, '');
};

// 이름 앞글자 대문자로 변경
const handleNametoUpperCase = (data) => {
  if (!data) return;

  return [...data]
    ?.map((text, i) => {
      if (i === 0) return text.toUpperCase();
      return text;
    })
    .join('');
};

const dateFormatFull = (value) => {
  return value?.replace('T', ' ').substring(0, 19).replaceAll('-', '.');
};

const dateFormat = (value) => {
  return value?.substring(5, 10).replaceAll('-', '.');
};

const dateFormatYear = (value) => {
  return value?.replace('T', ' ').substring(0, 10).replaceAll('-', '.');
};

// nickname 기준으로 중복 제거
const getFilterdArray = (array) => {
  return array.filter(
    (v, i, self) => i === self.findIndex((t) => t.nickname === v.nickname)
  );
};

// nickname 기준으로 중복 제거
const getNicknameArray = (array) => {
  return array.map((user) => {
    return { nickname: user.nickname };
  });
};

export {
  getNumFormat,
  removeNumFormat,
  handleNametoUpperCase,
  dateFormat,
  dateFormatYear,
  dateFormatFull,
  getFilterdArray,
  getNicknameArray,
};

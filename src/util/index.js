// 천단위 생성
const getNumFormat = (data) => {
  return data?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

// 천단위 제거
const removeNumFormat = (data) => {
  if (data) {
    return +String(data)?.replaceAll(/,/g, '');
  }
  return 0;
};

export { getNumFormat, removeNumFormat };

<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.42857 12.7515C10.4939 12.0139 12 9.71802 12 7C12 3.68629 9.76142 1 7 1C4.23858 1 2 3.68629 2 7C2 9.68658 3.47145 11.9608 5.5 12.7253V22.5357C5.5 23.3444 6.15558 24 6.96429 24C7.77299 24 8.42857 23.3444 8.42857 22.5357V12.7515Z"
      fill="#ffffff"
    />
    <rect x="14.5" y="1" width="2.5" height="23" rx="1.25" fill="#ffffff" />
    <rect x="19" y="1" width="2.5" height="23" rx="1.25" fill="#ffffff" />
  </svg>
</template>

<script>
export default {
  name: 'IconFoodWhite',
  props: {
    code: {
      type: String,
      default: null,
    },
  },
};
</script>

<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle v-if="isDisabled" cx="10" cy="10" r="10" fill=" #0069E3 " />
    <circle v-if="!isDisabled" cx="10" cy="10" r="10" fill="#C5C5C5" />
    <path
      d="M5.5 10.5L7.79289 12.7929C8.18342 13.1834 8.81658 13.1834 9.20711 12.7929L14.5 7.5"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconCheckBlue',
  props: {
    isDisabled: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

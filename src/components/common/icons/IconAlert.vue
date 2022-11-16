<template>
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="29.5" r="3.25" stroke="black" stroke-width="2.5" />
    <mask id="path-2-inside-1_137_470" fill="white">
      <path
        d="M2 19C2 13.4772 6.47715 9 12 9C17.5228 9 22 13.4772 22 19V27C22 28.1046 21.1046 29 20 29H4C2.89543 29 2 28.1046 2 27V19Z"
      />
    </mask>
    <path
      d="M2 19C2 13.4772 6.47715 9 12 9C17.5228 9 22 13.4772 22 19V27C22 28.1046 21.1046 29 20 29H4C2.89543 29 2 28.1046 2 27V19Z"
      fill="white"
      stroke="black"
      stroke-width="5"
      mask="url(#path-2-inside-1_137_470)"
    />
    <circle v-if="isOn" cx="19.5" cy="12.5" r="4.5" fill="#FF0000" />
  </svg>
</template>

<script>
export default {
  name: 'IconAlert',
  props: {
    isOn: Boolean,
  },
};
</script>

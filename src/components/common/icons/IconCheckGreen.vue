<template>
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle v-if="isDisabled" cx="14" cy="14" r="14" fill="#00C092" />
    <circle v-if="!isDisabled" cx="14" cy="14" r="14" fill="#EAEAEA" />
    <!-- {`var(--${color})`} -->
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20.6727 9.26007C21.0813 9.63157 21.1114 10.264 20.7399 10.6727L12.7399 19.4727C12.556 19.675 12.2972 19.7932 12.0238 19.7997C11.7504 19.8062 11.4863 19.7005 11.2929 19.5071L7.29289 15.5071C6.90237 15.1166 6.90237 14.4834 7.29289 14.0929C7.68342 13.7024 8.31658 13.7024 8.70711 14.0929L11.9655 17.3513L19.2601 9.32733C19.6316 8.91868 20.264 8.88856 20.6727 9.26007Z"
      fill="white"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconCheckGreen',
  props: {
    isDisabled: Boolean,
  },
};
</script>

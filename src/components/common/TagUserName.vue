<template>
  <span class="tag">
    {{ user }}
    <span v-if="isView">
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 1L1 9M1 1L9 9"
          stroke="#5087BF"
          stroke-linecap="round"
          stroke-linejoin="round"
        /></svg
    ></span>
  </span>
</template>

<script>
import { onMounted } from 'vue';

export default {
  name: 'TagUserName',
  props: {
    user: String,
    isView: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    onMounted(() => {});
  },
};
</script>

<style lang="scss" scoped>
.tag {
  @include stTag;
}
</style>

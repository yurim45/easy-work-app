<template>
  <div class="inner">
    <strong>{{ title }}</strong>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  name: 'MessageInner',
  props: {
    title: {
      type: String,
      default: '요청에 실패했습니다.',
    },
    message: String,
  },
  setup() {
    onMounted(() => {});
  },
};
</script>

<style lang="scss" scoped>
.inner {
  text-align: center;

  strong {
    @include title700_17;
  }

  p {
    margin-top: 14px;
    @include body400_14;
  }
}
</style>

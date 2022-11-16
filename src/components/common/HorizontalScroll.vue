<template>
  <section class="horizontal">
    <slot></slot>
  </section>
</template>

<script>
import { onMounted } from 'vue';
export default {
  name: 'HorizontalScroll',
  components: {},
  setup() {
    onMounted(() => {});
  },
};
</script>

<style lang="scss" scoped>
.horizontal {
  @include flex(flex-start);
  margin: auto;
  overflow: auto;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }
}
</style>

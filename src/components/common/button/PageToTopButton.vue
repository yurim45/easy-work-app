<template>
  <button v-if="isView" type="button" class="button" @click="toTop">
    <icon-to-top />
  </button>
</template>

<script>
import { onUnmounted, onMounted, ref } from 'vue';
import { IconToTop } from '@/components/common/icons/index';
import { throttle } from 'lodash';

export default {
  name: 'PageToTopButton',
  components: { IconToTop },
  setup() {
    const isView = ref(false);
    const toTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    const handleScroll = throttle(() => {
      const { scrollY } = window;
      if (scrollY > 70) {
        isView.value = true;
      } else {
        isView.value = false;
      }
    }, [500]);

    onMounted(() => window.addEventListener('scroll', handleScroll));

    onUnmounted(() => window.removeEventListener('scroll', handleScroll));

    return { toTop, isView };
  },
};
</script>

<style lang="scss" scoped>
button {
  position: fixed;
  right: 10px;
  bottom: 0px;
}
</style>

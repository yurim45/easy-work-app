<template>
  <header class="header">
    <button type="button" @click="onClick">
      <icon-close />
    </button>
  </header>
  <div class="empty" />
  <div v-if="isView" class="line"></div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import router from '@/router/index';
import { throttle } from 'lodash';
import { ID_TOKEN_KEY } from '@/common/token';
import { IconClose } from '../icons/index.js';

export default {
  name: 'CloseHeader',
  components: { IconClose },
  props: {
    onClick: {
      type: Function,
    },
  },
  setup() {
    const isView = ref(false);
    onMounted(() => {
      const token = window.localStorage.getItem(ID_TOKEN_KEY);
      if (!token) {
        alert('로그인을 해주세요');
        router.push('/login');
      }

      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => window.removeEventListener('scroll', handleScroll));

    const handleScroll = throttle(() => {
      const { scrollY } = window;
      if (scrollY > 5) {
        isView.value = true;
      } else {
        isView.value = false;
      }
    }, [300]);

    return { isView };
  },
};
</script>

<style lang="scss" scoped>
.header {
  @include flex(flex-start);
  @include stHeader;

  button {
    height: 40px;
  }
}

.empty {
  height: 60px;
}

.line {
  position: fixed;
  width: 100%;
  height: 1px;
  background: var(--dim);
}
</style>

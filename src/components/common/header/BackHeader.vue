<template>
  <header class="header" :class="{ hasBg: hasBg }">
    <button type="button" @click="onClick">
      <icon-back />
    </button>
    <div>
      <button
        v-if="hasDelete"
        class="text red"
        type="button"
        @click="onClickDeleteText"
      >
        {{ deleteText }}
      </button>
      <button class="text" type="button" @click="onClickText">
        {{ text }}
      </button>
    </div>
  </header>
  <div class="empty" />
  <div v-if="isView" class="line"></div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import router from '@/router/index';
import { throttle } from 'lodash';
import { ID_TOKEN_KEY } from '@/common/token';
import { IconBack } from '../icons/index.js';

export default {
  name: 'BackHeader',
  components: { IconBack },
  props: {
    onClick: {
      type: Function,
    },
    onClickText: {
      type: Function,
    },
    onClickDeleteText: {
      type: Function,
    },
    text: {
      type: String,
    },
    deleteText: {
      type: String,
      default: '삭제',
    },
    hasBg: {
      type: Boolean,
      default: false,
    },
    hasDelete: {
      type: Boolean,
      default: false,
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
  @include flex(space-between);
  @include stHeader;

  button {
    height: 40px;
  }
}

.text {
  color: var(--blue500);
}

.red {
  margin-right: 22px;
  color: var(--red-txt);
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

.hasBg {
  max-width: 600px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfbfb 100%);
}
</style>

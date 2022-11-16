<template>
  <header class="header">
    <button type="button" @click="onClickAdmin">
      <icon-back v-if="isAdmin" />
      <icon-alert v-if="!isAdmin" :isOn="isAlertOn" @click="goToNewsPage" />
    </button>
    <button type="button" @click="goToMenu">
      <icon-menu />
    </button>
  </header>
  <div class="empty" />
  <div v-if="isView" class="line"></div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';
import { throttle } from 'lodash';
import router from '@/router/index';
import { ID_TOKEN_KEY } from '@/common/token';
import { IconMenu, IconAlert, IconBack } from '@/components/common/icons/index';
import { MENU_LIST } from '@/constants/index.js';

export default {
  name: 'BasicHeader',
  components: { IconMenu, IconAlert, IconBack },
  props: {
    isAdmin: {
      type: Boolean,
      default: true,
    },
    isAlertOn: Boolean,
    onClickAdmin: Function,
  },
  setup(props) {
    const store = useStore();

    const isView = ref(false);
    const menuList = ref(MENU_LIST);

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

    const goToMenu = () => {
      if (props.isAdmin) {
        router.push('/admin');
      } else {
        router.push('/menu');
      }
    };

    const goToPage = (url) => {
      if (url === '/') {
        router.push(url);
      }
      router.push(url);
    };

    const goToNewsPage = () => {
      router.push('/news');
    };

    return {
      store,
      isView,
      goToPage,
      goToNewsPage,
      menuList,
      goToMenu,
    };
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

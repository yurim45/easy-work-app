<template>
  <div class="menu">
    <div class="close">
      <button type="button" @click="handleMenu">
        <icon-close />
      </button>
    </div>
    <h2>MENU</h2>
    <ul class="menuList">
      <li @click="goToPage('/')">Home</li>
      <li v-for="menu in menuList" :key="menu.id" @click="goToPage(menu.url)">
        {{ menu.value }}
      </li>
      <div class="line" />
      <li class="sub" @click="goToPage('/mypage')">Password</li>
      <li
        class="sub"
        v-if="store.getters.me.role !== 'User'"
        @click="goToPage('/admin')"
      >
        Admin
      </li>
      <li class="sub" @click="logout">Logout</li>
    </ul>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import store from '@/store/index';
import { IconClose } from '@/components/common/icons/index';
import { MENU_LIST } from '@/constants/index.js';
import router from '@/router';

export default {
  name: 'MenuView',
  components: { IconClose },
  setup() {
    const menuList = ref(MENU_LIST);

    onMounted(() => {});

    const goToPage = (url) => {
      if (url === '/') {
        router.push(url);
      }
      router.push(url);
    };

    const handleMenu = () => {
      router.push('/');
    };

    const logout = () => {
      console.log('logout');
      router.push('/login');
    };

    return { store, menuList, goToPage, handleMenu, logout };
  },
};
</script>

<style lang="scss" scoped>
.close {
  @include stHeader;
}

.menu {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: var(--white);
  z-index: 200;

  h2 {
    @include stLayout;
    @include stPageTitle;
    margin: 65px 0 30px;
  }

  a {
    cursor: pointer;
  }
}

.menuList {
  padding: 0 30px;

  li {
    margin: 28px 0;
    @include title800_20;
    cursor: pointer;
  }

  .sub {
    @include title700_17;
  }
}

.line {
  width: 20px;
  height: 3px;
  margin: 10px 0;
  background: var(--black);
}
</style>

<template>
  <section class="section">
    <button type="button" @click="handleMenu"><icon-menu /></button>

    <div class="user">
      <div class="userNick">{{ userInfo.nick }}</div>
      <strong>{{ userInfo.name }}</strong>
      <p>{{ userInfo.title }}</p>
    </div>
  </section>
  <div v-if="isMenuOpen" class="menu">
    <button type="button" @click="handleMenu" class="close">
      <icon-close />
    </button>
    <gnb />
  </div>
</template>

<script>
import { IconMenu, IconClose } from '@/components/icons/index';
import Gnb from '../common/Gnb.vue';
import { MY_INFO } from '@/constants';

export default {
  name: 'UserInfo',
  components: { IconMenu, IconClose, Gnb },
  data() {
    return {
      isMenuOpen: false,
      userInfo: MY_INFO,
    };
  },
  methods: {
    handleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  padding: 22px 20px;
}

.user {
  margin: 34px auto 120px;

  strong {
    display: inline-block;
    margin: 7px auto 15px;
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    color: var(--text-555);
  }
}

.userNick {
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  color: var(--emerald);
}

.menu {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  padding: 80px 30px;
  background: var(--white);
  z-index: 100;
}

.close {
  position: fixed;
  top: 40px;
  right: 40px;
  z-index: 200;
}
</style>

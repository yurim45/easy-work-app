<template>
  <div class="layout">
    <section class="section">
      <button type="button" @click="handleMenu"><icon-menu /></button>
      <div class="user">
        <div class="userNick">{{ userInfo.nick }}</div>
        <strong>{{ userInfo.name }}</strong>
        <p>{{ userInfo.title }}</p>
      </div>
      <ul class="menuList">
        <li>
          <button
            type="button"
            :class="{ active: isActive }"
            @click="handleIsActive"
          >
            연차
            <div class="line" v-if="isActive" />
          </button>
        </li>
        <li>
          <button
            type="button"
            :class="{ active: !isActive }"
            @click="handleIsActive"
          >
            포인트
            <div class="line" v-if="!isActive" />
          </button>
        </li>
      </ul>
      <router-link to="/admin" class="adminMenu">관리자</router-link>
    </section>

    <home-day-off v-if="isActive" />
    <home-point v-if="!isActive" />
  </div>
  <footer-view />
  <div v-if="isMenuOpen" class="openMenu">
    <button type="button" @click="handleMenu" class="close">
      <icon-close />
    </button>
    <gnb />
  </div>
</template>

<script>
import { IconMenu, IconClose } from '@/components/icons/index';
import { MY_INFO } from '@/constants';
import { Gnb, FooterView } from '@/components/common/index';
import HomeDayOff from '@/components/home/HomeDayOff.vue';
import HomePoint from '@/components/home/HomePoint.vue';

export default {
  components: { Gnb, FooterView, IconMenu, IconClose, HomeDayOff, HomePoint },
  name: 'HomeView',
  data() {
    return {
      isMenuOpen: false,
      userInfo: MY_INFO,
      isActive: true,
    };
  },
  methods: {
    handleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleIsActive() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped lang="scss">
.layout {
  @include flex(space-between, cetner);
}

.section {
  padding: 22px 40px 22px 20px;
  height: 100vh;
  overflow: hidden;
}

.user {
  margin: 34px auto 120px;

  strong {
    display: inline-block;
    width: 100px;
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

.menuList {
  li {
    height: 30px;
    margin-bottom: 28px;
  }

  button {
    color: var(--text-999);
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;

    div {
      display: inline-block;
      position: relative;
    }
  }

  .active {
    color: var(--black);
  }
}

.line {
  position: absolute;
  top: -16px;
  width: 100%;
  height: 8px;
  background: #1ad3a7;
  opacity: 0.34;
}

.adminMenu {
  position: absolute;
  bottom: 28px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: var(--emerald);
  text-decoration-line: underline;
}

.openMenu {
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

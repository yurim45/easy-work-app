<template>
  <home-header />
  <main>
    <h1>Hello! {{ userName }} 👋</h1>
    <img alt="logo" src="../assets/logo.png" />
    <h2>새로운 BUSINESS의 시작, <br /><strong>Easy Work</strong></h2>

    <gnb />
  </main>
  <footer-view />
</template>

<script>
import HomeHeader from '@/components/common/header/HomeHeader.vue';
import { Gnb, FooterView } from '@/components/common/index';

export default {
  components: { HomeHeader, Gnb, FooterView },
  name: 'HomeView',
  data() {
    return {
      userName: 'April',
    };
  },
};
</script>

<style scoped lang="scss">
main {
  text-align: center;
}

h1 {
  padding: 30px;
  font-size: 28px;
  font-weight: 600;
}

h2 {
  padding: 30px;
  font-size: 18px;
  font-weight: 600;
}

img {
  width: 100px;
  border-radius: 50%;
}

strong {
  color: var(--primary);
  font-size: 24px;
}
</style>

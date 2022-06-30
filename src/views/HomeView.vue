<template>
  <home-header />
  <main>
    <h1>Hello! {{ userName }} 👋</h1>
    <img alt="logo" src="../assets/logo.png" />
    <h2>새로운 BUSINESS의 시작, <br /><strong>Easy Work</strong></h2>

    <nav class="gnb">
      <router-link to="/">HOME</router-link>
      <router-link to="/point">POINT</router-link>
    </nav>
  </main>
</template>

<script>
import HomeHeader from '@/components/common/header/HomeHeader.vue';

export default {
  components: { HomeHeader },
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

a {
  margin: 0 5px;
  font-weight: bold;
  text-decoration: none;
}

a:visited {
  color: #42b983;
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

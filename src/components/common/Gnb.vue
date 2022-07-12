<template>
  <nav class="gnb">
    <router-link to="/">🏡 HOME</router-link>
    <router-link to="/point">💎 ATNP 포인트</router-link>
    <router-link to="/day-off">🏖 휴가/휴직 관리</router-link>
    <router-link to="/admin">💡 관리자</router-link>
  </nav>
</template>

<script>
export default { name: 'GnbView' };
</script>

<style scoped lang="scss">
.gnb {
  @include flex(flex-start, center, column);
}

a {
  margin: 20px;
  font-weight: bold;
  text-decoration: none;
}

a:visited {
  color: #42b983;
}
</style>

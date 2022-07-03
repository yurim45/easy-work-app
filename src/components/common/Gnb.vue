<template>
  <nav class="gnb">
    <router-link to="/">HOME</router-link>
    <router-link to="/point">POINT</router-link>
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

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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 52px;
  width: 100%;
  height: calc(100% - 52px);
  padding: 80px 30px;
  background: var(--white);
  z-index: 100;
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

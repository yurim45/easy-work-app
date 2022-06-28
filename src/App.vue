<template>
  <header>
    <div class="logo">
      <img alt="logo" src="./assets/logo.png" /><strong>Easy Work</strong>
    </div>
    <nav class="gnb">
      <router-link to="/">Home</router-link> |
      <router-link to="/point">point</router-link>
    </nav>
  </header>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 30px;
  box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 2.6px;
}

.logo {
  display: flex;
  align-items: center;

  img {
    width: 30px;
    margin-right: 10px;
    border-radius: 50%;
  }

  strong {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.5px;
  }
}

a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

a:visited {
  color: #42b983;
}
</style>

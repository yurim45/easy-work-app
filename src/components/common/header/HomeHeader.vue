<template>
  <header>
    <section>
      <div class="logo">
        <img alt="logo" src="../../../assets/logo.png" /><strong
          >Easy Work</strong
        >
      </div>
    </section>
  </header>
</template>

<script>
export default {
  name: 'HomeHeader',
};
</script>

<style scoped lang="scss">
header {
  box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 2.6px;

  section {
    margin: auto;
    padding: 25px 20px;
    max-width: 1200px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.5px;
  }
}

a {
  margin: 0 5px;
  font-weight: bold;
  text-decoration: none;
}

a:visited {
  color: #42b983;
}
</style>

<template>
  <div>
    <h1>Hello! {{ userName }} 👋</h1>
    <img alt="logo" src="../assets/logo.png" />
    <h2>새로운 BUSINESS의 시작, <br /><strong>Easy Work</strong></h2>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      userName: 'April',
    };
  },
};
</script>

<style scoped lang="scss">
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

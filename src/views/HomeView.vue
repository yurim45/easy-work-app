<template>
  <div class="home">
    <h1>Hello! {{ userName }} 👋</h1>
    <img alt="logo" src="../assets/logo.png" />
    <h2>새로운 BUSINESS의 시작, <strong>Easy Work</strong></h2>
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

<style scoped>
.home {
  color: var(--text-primary);
}

h1 {
  padding: 30px;
  font-size: 36px;
  font-weight: 600;
}

h2 {
  padding: 30px;
  font-size: 28px;
  font-weight: 600;
}

img {
  border-radius: 50%;
}

strong {
  color: var(--primary);
}
</style>

<template>
  <button type="버튼" @click="onClick">버튼</button>
</template>

<script>
export default {
  name: 'ButtonView',
  methods: {
    onClick() {
      console.log('===== onClick');
    },
  },
};
</script>

<style scoped>
button {
  width: 100px;
  height: 50px;
  background: var(--primary);
  color: var(--white);
  border-radius: 10px;
}
</style>

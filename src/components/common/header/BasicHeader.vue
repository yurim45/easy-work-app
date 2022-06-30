<template>
  <header class="header">
    <router-link to="/"><icon-home /></router-link>
    <div>{{ title }}</div>
    <button><icon-hamberger /></button>
  </header>
</template>

<script>
import { IconHamberger, IconHome } from '@/components/icons/index';

export default {
  name: 'BasicHeader',
  components: { IconHamberger, IconHome },
  props: {
    title: String,
  },
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  padding: 0 20px;
  background-color: var(--white);
  font-weight: 600;
  border-bottom: 1px solid #f5f5f5;
}
</style>

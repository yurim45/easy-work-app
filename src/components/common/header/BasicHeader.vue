<template>
  <header class="header">
    <router-link to="/"><icon-home /></router-link>
    <div>{{ title }}</div>
    <button type="button" @click="handleMenu"><icon-hamberger /></button>
  </header>
  <div v-if="isMenuOpen" class="menu">
    <button type="button" @click="handleMenu" class="close">
      <icon-close />
    </button>
    <gnb />
  </div>
</template>

<script>
import { IconHamberger, IconHome, IconClose } from '@/components/icons/index';
import { Gnb } from '@/components/common/index';

export default {
  name: 'BasicHeader',
  components: { IconHamberger, IconHome, Gnb, IconClose },
  props: {
    title: String,
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    handleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
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
  background: var(--white);
  font-weight: 600;
  border-bottom: 1px solid #f5f5f5;
}

.menu {
}

.close {
  position: fixed;
  top: 80px;
  right: 40px;
  z-index: 200;
}
</style>

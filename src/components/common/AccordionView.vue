<template>
  <h3 @click="handleMenuOpen">
    {{ title }}
    <span v-if="isOpen"><icon-open-arrow /></span>
    <span v-if="!isOpen"><icon-close-arrow /></span>
  </h3>
  <slot v-if="isOpen"></slot>
</template>

<script>
import IconCloseArrow from '../icons/IconCloseArrow.vue';
import IconOpenArrow from '../icons/IconOpenArrow.vue';
export default {
  components: { IconCloseArrow, IconOpenArrow },
  name: 'AccordionView',
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    title: String,
  },
  methods: {
    handleMenuOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped lang="scss">
h3 {
  @include flex(space-between);
  padding: 20px 30px;
  background: var(--lightGrey);
  font-size: 18px;
  font-weight: 600;
  border-bottom: 0.5px solid var(--line);
}
</style>

<template>
  <button :type="type" class="button" @click="$emit('onClick')">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'ButtonView',
  props: {
    label: {
      type: String,
      default: '버튼',
    },
    type: {
      type: String,
      default: 'button',
    },
    bgcolor: {
      type: String,
      default: 'primary',
    },
    onClick: {
      type: Function,
    },
  },
};
</script>

<style scoped lang="scss">
.button {
  min-width: 120px;
  height: 40px;
  background: var(--primary);
  color: var(--white);
  border-radius: 10px;
}
</style>

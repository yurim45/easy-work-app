<template>
  <button
    :type="type"
    class="button"
    @click="$emit('onClick')"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'ButtonView',
  props: {
    label: {
      type: String,
      default: '확인',
    },
    type: {
      type: String,
      default: 'button',
    },
    onClick: {
      type: Function,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.button {
  @include stButton();
}
</style>

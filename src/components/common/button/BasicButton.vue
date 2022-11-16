<template>
  <button
    class="button"
    :type="type"
    @click="$emit('onClick')"
    :disabled="isDisabled"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'BasicButton',
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
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  @include stButton;
  @include body600_14;
  color: var(--blue500);
}
</style>

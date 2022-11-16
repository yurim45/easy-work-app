<template>
  <footer>
    <div><slot></slot></div>
    <submit-button
      :type="type"
      :label="buttonLabel"
      @onClick="$emit('onClick')"
    />
  </footer>
  <div class="iphone" v-if="isView"></div>
</template>

<script>
import { ref } from '@vue/reactivity';
import SubmitButton from './button/SubmitButton.vue';
import { onMounted } from '@vue/runtime-core';

export default {
  components: { SubmitButton },
  name: 'SubmitFooter',
  props: {
    buttonLabel: {
      type: String,
    },
    onClick: {
      type: Function,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
  setup() {
    const isView = ref(false);

    onMounted(() => {
      isView.value = navigator.userAgent.toLowerCase()?.includes('iphone');
    });

    return { isView };
  },
};
</script>

<style lang="scss" scoped>
footer {
  @include stFooter;
  background: var(--blue100);

  div {
    margin-bottom: 24px;
  }
}

.iphone {
  width: 100%;
  height: 20px;
  background: var(--blue100);
}
</style>

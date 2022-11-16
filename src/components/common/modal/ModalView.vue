<template>
  <div class="modalBg">
    <div class="inner">
      <slot></slot>
    </div>
    <footer>
      <button type="button" class="cancel" @click="onClcikCancel">
        {{ cancelLabel }}
      </button>
      <button type="button" class="check" @click="onClcik">
        {{ checkLabel }}
      </button>
    </footer>
  </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  name: 'ModalView',
  props: {
    onClcikCancel: Function,
    onClcik: Function,
    checkLabel: {
      type: String,
      default: '확인',
    },
    cancelLabel: {
      type: String,
      default: '취소',
    },
  },
  setup() {
    onMounted(() => {});
  },
};
</script>

<style lang="scss" scoped>
.modalBg {
  @include flex(center, center, column);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 30px;
  background: rgba(0, 0, 0, 0.7);
  z-index: 200;
}

@media screen and (max-width: 400px) {
  .modalBg {
    padding: 30px 30px 100px;
  }
}

.inner {
  @include flex;
  padding: 25px;
  width: 100%;
  max-width: 500px;
  background: var(--white);
  border-radius: 20px 20px 0px 0px;
}

footer {
  width: 100%;
  max-width: 500px;
  @include flex;
}

button {
  width: 100%;
  height: 54px;
  background: var(--gray999);
  color: var(--white);
  @include title700_17;
}

.cancel {
  background: var(--gray999);
  border-radius: 0px 0px 0px 20px;
}

.check {
  background: var(--blue500);
  border-radius: 0px 0px 20px 0px;
}
</style>

<template>
  <div class="modalBg" @click.self="$emit('closePage')">
    <main>
      <h3>{{ title }}</h3>
      <form>
        <radio-view />
        <input-view label="금액" />

        <div class="btnWrapper">
          <button-view label="닫기" @onClick="$emit('closePage')" />
          <button-view
            type="submit"
            label="보내기"
            @onClick="$emit('sendPoint')"
          />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import InputView from '@/components/InputView.vue';
import ButtonView from '@/components/ButtonView.vue';
import RadioView from './RadioView.vue';

export default {
  name: 'sendPointModal',
  components: { InputView, ButtonView, RadioView },
  data() {
    return {
      users: [
        { id: 1, value: 1, text: '프릴' },
        { id: 2, value: 2, text: '제임스' },
        { id: 3, value: 3, text: '위드' },
        { id: 4, value: 4, text: '주드' },
        { id: 5, value: 5, text: '워렌' },
      ],
    };
  },
  props: {
    title: {
      type: String,
      default: '타이틀',
    },
    closePage: {
      type: Function,
    },
    sendPoint: {
      type: Function,
    },
  },
};
</script>

<style scoped lang="scss">
.modalBg {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 25px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
}

main {
  width: 100%;
  padding: 30px 20px;
  background: var(--white);
  border-radius: 10px;
}

h3 {
  margin-bottom: 20px;
  font-size: 22px;
}

.btnWrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 50px 0;
}
</style>

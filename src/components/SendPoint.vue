<template>
  <div class="modalBg" @click.self="$emit('closePage')">
    <main>
      <h3>포인트 보내기</h3>
      <form>
        <div class="inputRadio">
          <label
            v-for="user in users"
            v-bind:key="user.id"
            @change="handleValue"
          >
            <input type="radio" :value="user.text" v-model="target" />{{
              user.text
            }}</label
          >
        </div>
        <input-view
          label="금액"
          name="amount"
          :inputValue="amount"
          @handleValue="handleValue($event)"
        />

        <div class="btnWrapper">
          <button-view label="닫기" @onClick="$emit('closePage')" />
          <button-view label="보내기" @onClick="onSubmitSendPoints" />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { ButtonView, InputView } from '@/components/common/index';

export default {
  name: 'SendPointModal',
  components: { ButtonView, InputView },
  data() {
    return {
      users: [
        { id: 1, value: 1, text: '프릴' },
        { id: 2, value: 2, text: '제임스' },
        { id: 3, value: 3, text: '위드' },
        { id: 4, value: 4, text: '주드' },
        { id: 5, value: 5, text: '워렌' },
      ],
      target: '',
      amount: '',
    };
  },
  props: {
    closePage: {
      type: Function,
    },
  },
  methods: {
    handleValue(value) {
      this.amount = value.name === 'amount' ? value.value : '';
    },
    onSubmitSendPoints() {
      console.log(this.amount);
      this.$emit('closePage');
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

  :first-child {
    background: var(--deepGrey);
  }
}
</style>

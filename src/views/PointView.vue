<template>
  <div class="point">
    <h1>ATNP 포인트</h1>
    <h2>Hello! {{ userName }} 👋</h2>
    <button-view /><button-view />
    <select-view />
    <input-view />
    <check-box-view />
  </div>
</template>

<script>
import InputView from '@/components/InputView.vue';
import SelectView from '@/components/SelectView.vue';
import CheckBoxView from '@/components/CheckBoxView.vue';
import ButtonView from '@/components/ButtonView.vue';

export default {
  name: 'PointView',
  components: { InputView, SelectView, CheckBoxView, ButtonView },
  data() {
    return {
      userName: 'April',
    };
  },
};
</script>

<style scoped lang="scss">
h1 {
  padding: 30px;
  font-size: 36px;
  font-weight: 600;
}

h2 {
  padding: 30px;
  font-size: 28px;
  font-weight: 600;
}
</style>

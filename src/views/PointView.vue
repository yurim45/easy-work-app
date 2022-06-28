<template>
  <div class="point">
    <h1>ATNP 포인트</h1>
    <select-view />
    <input-view />
    <check-box-view />
  </div>
</template>

<script>
import InputView from '@/components/InputView.vue';
import SelectView from '@/components/SelectView.vue';
import CheckBoxView from '@/components/CheckBoxView.vue';

export default {
  name: 'PointView',
  components: { InputView, SelectView, CheckBoxView },
  data() {
    return {
      userName: 'April',
    };
  },
};
</script>

<style scoped>
h1 {
  padding: 30px;
  font-size: 36px;
  font-weight: 600;
}
</style>

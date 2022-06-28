<template>
  <div class="point">
    <h1>ATNP 포인트</h1>
    <input-view />
  </div>
</template>

<script>
import InputView from '@/components/InputView.vue';

export default {
  name: 'PointView',
  components: { InputView },
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

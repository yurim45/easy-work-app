<template>
  <section>
    <img
      v-if="num === 1"
      alt="물품 구매신청"
      src="@/assets/images/item/Group545.png"
      @click="goToPage"
    />
    <img
      v-if="num === 2"
      alt="물품 구매신청"
      src="@/assets/images/item/Group546.png"
      @click="goToPage"
    />
    <img
      v-if="num === 3"
      alt="물품 구매신청"
      src="@/assets/images/item/Group547.png"
      @click="goToPage"
    />
  </section>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';

export default {
  name: 'HomeItem',
  components: {},
  setup() {
    const store = useStore();
    const num = ref(null);

    onMounted(() => {
      randomNum();
    });

    const randomNum = () => {
      num.value = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    };

    const goToPage = () => {
      router.push('/item');
    };

    return { store, goToPage, num };
  },
};
</script>

<style lang="scss" scoped>
section {
  overflow: hidden;
}

img {
  margin-top: 50px;
  width: 110%;
  cursor: pointer;
}
</style>

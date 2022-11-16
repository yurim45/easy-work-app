<template>
  <section>
    <sub-title subTitle="Gacha!" url="/" />
    <img alt="vote" src="@/assets/images/homeGacha.png" />
  </section>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { SubTitle } from '@/components/common/index';

export default {
  name: 'HomeGacha',
  components: { SubTitle },
  setup() {
    const store = useStore();
    onMounted(() => {});

    return { store };
  },
};
</script>

<style lang="scss" scoped>
img {
  /* @include stLayout; */
  padding: 0 15px;
  width: 100%;
}
</style>

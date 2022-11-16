<template>
  <section>
    <sub-title subTitle="Board" url="/" />
    <img alt="board" src="@/assets/images/homeBoard.png" />
  </section>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { SubTitle } from '@/components/common/index';

export default {
  name: 'HomeBoard',
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
  @include stLayout;
  width: 100%;
}
</style>

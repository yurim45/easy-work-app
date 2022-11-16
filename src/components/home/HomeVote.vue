<template>
  <section>
    <sub-title subTitle="Voting" url="/" />
    <img alt="vote" src="@/assets/images/homeVote.png" />
  </section>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { SubTitle } from '@/components/common/index';

export default {
  name: 'HomeVote',
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

<template>
  <section>
    <sub-title subTitle="Daily Menu" url="/" />
    <!-- /daily-menu -->
    <img alt="menu1" src="@/assets/images/homeDailyMenu.png" />
  </section>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { SubTitle } from '@/components/common/index';

export default {
  name: 'HomeDailyMenu',
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
  padding-left: 30px;
  width: 100%;
}
</style>

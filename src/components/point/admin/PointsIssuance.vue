<template>
  <basic-header title="포인트 발급" />
  <main>포인트 발급</main>
</template>

<script>
import BasicHeader from '@/components/common/header/BasicHeader.vue';
export default {
  components: { BasicHeader },
  name: 'PointsIssuance',
};
</script>

<style lang="scss" scoped>
main {
  @include stLayout;
}
</style>

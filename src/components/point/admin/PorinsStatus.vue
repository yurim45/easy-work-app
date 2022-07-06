<template>
  <basic-header title="포인트 현황" />
  <main>
    <h3>누적(연간) 발행 포인트</h3>
    {{ totalIssuance }}
    <h3>누적(연간) 사용 포인트</h3>
    {{ totalUsed }}
    <h3>현재 잔여 포인트</h3>

    <h3>인별 포인트 현황</h3>

    <h3>포인트 사용내역</h3>

    <h3>항목별 사용내역</h3>
  </main>
</template>

<script>
import BasicHeader from '@/components/common/header/BasicHeader.vue';
import { USER_LIST } from '@/constants';
import { getNumFormat } from '@/util';

export default {
  components: { BasicHeader },
  name: 'PorinsStatus',
  data() {
    return {};
  },
  computed: {
    totalIssuance() {
      return getNumFormat(USER_LIST.length * 50000);
    },
    totalUsed() {
      return getNumFormat(USER_LIST.length * 30000);
    },
  },
};
</script>

<style scoped lang="scss">
main {
  @include stLayout;
}

h3 {
  font-size: 18px;
  font-weight: 600;
}
</style>

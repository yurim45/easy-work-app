<template>
  <basic-header title="포인트 현황" />
  <main>
    <h3>누적(연간) 발행 포인트</h3>
    <div class="value">{{ totalIssuance }}</div>
    <h3>누적(연간) 사용 포인트</h3>
    <div class="value">{{ totalUsed }}</div>
    <h3>현재 잔여 포인트</h3>
    <div class="value">{{ totalUsed }}</div>
    <user-point />
    <admin-point-history />
    <use-item-status />
  </main>
</template>

<script>
import BasicHeader from '@/components/common/header/BasicHeader.vue';
import { USER_LIST } from '@/constants';
import { getNumFormat } from '@/util';
import UserPoint from './UserPoint.vue';
import AdminPointHistory from './AdminPointHistory.vue';
import UseItemStatus from './UseItemStatus.vue';

export default {
  components: {
    BasicHeader,
    UserPoint,
    AdminPointHistory,
    UseItemStatus,
  },
  name: 'PorinsStatus',
  date() {
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
}

h3 {
  padding: 20px 30px;
  background: var(--lightGrey);
  font-size: 18px;
  font-weight: 600;
  border-bottom: 0.5px solid var(--line);
}

.value {
  padding: 20px 30px;
}
</style>

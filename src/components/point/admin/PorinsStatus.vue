<template>
  <basic-header title="포인트 현황" />
  <main>
    <h3>누적(연간) 발행 포인트</h3>
    <div class="value">{{ totalIssuance }} P</div>
    <h3>누적(연간) 사용 포인트</h3>
    <div class="value">{{ totalUsed }} P</div>
    <h3>현재 잔여 포인트</h3>
    <div class="value">{{ remainingPoints }} P</div>
    <user-point-status />
    <admin-point-history />
    <use-item-status />
  </main>
</template>

<script>
import BasicHeader from '@/components/common/header/BasicHeader.vue';
import { USER_LIST } from '@/constants';
import { getNumFormat } from '@/util';
import UserPointStatus from './UserPointStatus.vue';
import AdminPointHistory from './AdminPointHistory.vue';
import UseItemStatus from './UseItemStatus.vue';

export default {
  components: {
    BasicHeader,
    UserPointStatus,
    AdminPointHistory,
    UseItemStatus,
  },
  name: 'PorinsStatus',
  date() {
    return {};
  },
  computed: {
    totalIssuance() {
      return getNumFormat(
        USER_LIST.map((user) => user.totalPoint).reduce(
          (prev, curr) => prev + curr
        )
      );
    },
    totalUsed() {
      return getNumFormat(
        USER_LIST.map((user) => user.usePoint).reduce(
          (prev, curr) => prev + curr
        )
      );
    },
    remainingPoints() {
      return getNumFormat(
        USER_LIST.map((user) => user.totalPoint - user.usePoint).reduce(
          (prev, curr) => prev + curr
        )
      );
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

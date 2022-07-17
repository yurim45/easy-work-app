<template>
  <basic-header title="Day Off" />
  <main>
    <user-status />
    <special-vacation />
    <other-vacation />
    <leave-history />
  </main>
</template>

<script>
import BasicHeader from '@/components/common/header/BasicHeader.vue';
import {
  UserStatus,
  SpecialVacation,
  OtherVacation,
  LeaveHistory,
} from '@/components/day-off/main/index';

export default {
  name: 'DayOff',
  components: {
    BasicHeader,
    UserStatus,
    SpecialVacation,
    OtherVacation,
    LeaveHistory,
  },
};
</script>

<style scoped lang="scss">
main {
  padding: 13px 16px 30px;
  background: var(--back);
}
</style>

<template>
  <basic-header title="Day Off" />
  <main>
    <user-status />
    <special-vacation />
  </main>
</template>

<script>
import BasicHeader from '@/components/common/header/BasicHeader.vue';
import { UserStatus, SpecialVacation } from '@/components/day-off/main/index';

export default {
  name: 'DayOff',
  components: { BasicHeader, UserStatus, SpecialVacation },
};
</script>

<style scoped lang="scss">
main {
  padding: 13px 16px;
  height: 100vh;
  background: var(--back);
}
</style>

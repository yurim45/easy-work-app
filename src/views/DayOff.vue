<template>
  <basic-header title="휴가/휴직 현황" />
  <main>
    <calender-view />
  </main>
</template>

<script>
import BasicHeader from '@/components/common/header/BasicHeader.vue';
import CalenderView from '@/components/day-off/calender/CalenderView.vue';

export default {
  name: 'DayOff',
  components: { BasicHeader, CalenderView },
};
</script>

<style scoped lang="scss"></style>

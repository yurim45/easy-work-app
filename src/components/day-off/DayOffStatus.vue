<template>
  <basic-header title="Day Off" />
  <main>
    <calender-view />
  </main>
</template>

<script>
import BasicHeader from '@/components/common/header/BasicHeader.vue';
import CalenderView from '@/components/day-off/calender/CalenderView.vue';

export default {
  name: 'DayOffStatus',
  components: { BasicHeader, CalenderView },
};
</script>

<style scoped lang="scss"></style>

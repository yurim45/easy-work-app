<template>
  <section>
    <line-view /><special-day-off /> <other-day-off /><line-view />
  </section>
</template>

<script>
import { onMounted } from 'vue';
import SpecialDayOff from './SpecialDayOff.vue';
import OtherDayOff from './OtherDayOff.vue';
import LineView from '@/components/common/LineView.vue';

export default {
  name: 'DayOffList',
  components: { SpecialDayOff, OtherDayOff, LineView },
  setup() {
    onMounted(() => {});
  },
};
</script>

<style lang="scss" scoped>
section {
  margin: 34px 0 33px;
}
</style>

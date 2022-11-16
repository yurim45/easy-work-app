<template>
  <point-summary :isImgView="isImgView" />
  <use-item-history :isTitle="true" />
  <status-user-point />
</template>

<script>
import { onMounted } from 'vue';
import { PointSummary, UseItemHistory, StatusUserPoint } from './index';

export default {
  name: 'AdminAtnpPoint',
  components: { PointSummary, UseItemHistory, StatusUserPoint },
  props: {
    isImgView: Boolean,
  },
  setup() {
    onMounted(() => {});
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <point-summary :isImgView="isImgView" :type="type" />
  <use-item-history :isTitle="true" :type="type" />
  <status-user-point :type="type" />
</template>

<script>
import { onMounted } from 'vue';
import { PointSummary, UseItemHistory, StatusUserPoint } from './index';

export default {
  name: 'AdminSpPoint',
  components: { PointSummary, UseItemHistory, StatusUserPoint },
  props: {
    isImgView: Boolean,
    type: String,
  },
  setup() {
    onMounted(() => {});
  },
};
</script>

<style lang="scss" scoped></style>

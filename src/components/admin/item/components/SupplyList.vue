<template>
  <section>
    <div class="line" />
    <item-history :data="data" :isAdmin="true" v-if="data?.length > 0" />
    <empty-view v-else text="물품신청 내역이 없습니다" />
  </section>
</template>

<script>
import { onMounted } from 'vue';
import { EmptyView } from '@/components/common/index.js';
import ItemHistory from '@/components/item/components/ItemHistory.vue';

export default {
  components: { ItemHistory, EmptyView },
  name: 'SupplyList',
  props: {
    data: Array,
  },
  setup() {
    onMounted(() => {});
  },
};
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 50px;
}

.line {
  margin: auto;
  width: calc(100% - 60px);
  height: 1px;
  background: var(--black);
}
</style>

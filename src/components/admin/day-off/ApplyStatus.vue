<template>
  <section class="section">
    <ul v-if="data?.length > 0">
      <apply-status-list
        v-for="(item, i) in data"
        :key="item.id"
        :selectItem="selectItem"
        :data="item"
        :length="data?.length"
        :i="i"
      />
    </ul>
    <empty-view v-else text="휴가신청 내역이 없습니다" />
  </section>
  <infinite-scroll
    :page="page"
    :take="take"
    :handleData="handleData"
    :handlePage="handlePage"
  />
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { QUERY_DAYOFF_LIST } from '@/graphql/dayOff.js';
import { InfiniteScroll, EmptyView } from '@/components/common/index.js';
import ApplyStatusList from './components/ApplyStatusList.vue';

export default {
  name: 'ApplyStatus',
  components: {
    ApplyStatusList,
    InfiniteScroll,
    EmptyView,
  },
  setup() {
    const isSelectedAll = ref(true);
    const data = ref([]);
    const page = ref(1);
    const take = ref(25);

    const { result, refetch, variables } = useQuery(QUERY_DAYOFF_LIST, {
      page: page.value,
      take: take.value,
      isEvery: true,
      status: ['Pending'],
    });

    onMounted(() => {
      refetch();
      handleData();
    });

    watch(result, () => {
      handleData();
    });

    const handleData = () => {
      if (result.value) {
        data.value = result.value.getDayoffList.dayoffList;
      }
    };

    const handlePage = (propsPage, propsTake) => {
      if (!result.value?.getDayoffList.nextPage) return;
      page.value = propsPage;
      take.value = propsTake;

      variables.value = {
        page: page,
        take: take,
        isEvery: true,
        status: ['Pending'],
      };
    };

    const selectItem = (id, checked) => {
      data.value.filter((item) => item.id === id)[0].checked = checked;
    };

    return {
      data,
      isSelectedAll,
      selectItem,
      page,
      take,
      handleData,
      handlePage,
    };
  },
};
</script>

<style lang="scss" scoped>
.section {
  @include stLayout;
  margin-bottom: 50px;
}

ul {
  border-top: 1px solid var(--black);
}

li {
  @include flex(flex-start);
  padding: 12px 0;
  cursor: pointer;
}
</style>

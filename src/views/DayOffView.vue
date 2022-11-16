<template>
  <back-header @click="goToHome" :hasDelete="false" />
  <main>
    <h2>Day Off</h2>
    <my-day-off-summary />
    <day-off-list />
    <day-off-history :data="dayoffData" />
  </main>
  <page-to-top-button />
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
import router from '@/router';
import {
  BackHeader,
  PageToTopButton,
  InfiniteScroll,
} from '@/components/common/index.js';
import {
  MyDayOffSummary,
  DayOffList,
  DayOffHistory,
} from '@/components/day-off/components/index.js';

export default {
  name: 'DayOffView',
  components: {
    BackHeader,
    PageToTopButton,
    MyDayOffSummary,
    DayOffList,
    DayOffHistory,
    InfiniteScroll,
  },
  setup() {
    const dayoffData = ref([]);
    const page = ref(1);
    const take = ref(25);

    const { result, refetch, variables } = useQuery(QUERY_DAYOFF_LIST, {
      page: page.value,
      take: take.value,
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
        if (page.value === 1) {
          dayoffData.value = result.value.getDayoffList.dayoffList;
        } else {
          dayoffData.value = [
            ...result.value.getDayoffList.dayoffList,
            ...dayoffData.value,
          ].filter((v, i, self) => i === self.findIndex((t) => t.id === v.id));
        }
      }
    };

    const handlePage = (propsPage, propsTake) => {
      if (!result.value?.getDayoffList.nextPage) return;
      page.value = propsPage - 1;
      take.value = propsTake;

      variables.value = {
        page: page,
        take: take,
      };
    };

    const goToHome = () => {
      router.push('/');
    };

    return { dayoffData, goToHome, page, take, handleData, handlePage };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  @include stLayout;
  @include stPageTitle;
}
</style>

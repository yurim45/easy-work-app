<template>
  <back-header :onClick="goToPage" :hasDelete="false" />
  <main class="main">
    <h2>항목별 사용내역</h2>
    <use-item-history :code="code" :type="type" />
    <div class="history">
      <line-view />
      <h3>{{ title }}</h3>
      <point-history :data="filterdData" v-if="filterdData?.length > 0" />
      <empty-view v-else text="내역이 없습니다" />
    </div>
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
import { QUERY_ALL_POINTS } from '@/graphql/point';
import { useRoute } from 'vue-router';
import router from '@/router';
import {
  BackHeader,
  PageToTopButton,
  LineView,
  InfiniteScroll,
  EmptyView,
} from '@/components/common/index.js';
import UseItemHistory from './components/UseItemHistory.vue';
import PointHistory from '@/components/point/components/PointHistory.vue';

export default {
  components: {
    BackHeader,
    UseItemHistory,
    PointHistory,
    PageToTopButton,
    LineView,
    InfiniteScroll,
    EmptyView,
  },
  name: 'PointItemDetail',
  setup() {
    const route = useRoute();

    const code = ref('ExceedMeal');
    const title = ref('식대초과');
    const type = ref(null);
    const pointData = ref([]);
    const filterdData = ref([]);
    const page = ref(1);
    const take = ref(25);

    const { result, refetch, variables } = useQuery(QUERY_ALL_POINTS, {
      page: page.value,
      take: take.value,
      categories: [route?.query.code],
    });

    onMounted(() => {
      refetch();
      if (route.query.code) {
        code.value = route.query.code;
        handleData();
      }

      if (route.query.type) {
        type.value = route.query.type;
      }
    });

    watch(result, () => {
      handleData();
    });

    watch(route, () => {
      page.value = 1;
      code.value = route.query.code;
      handleData();
    });

    watch(code, () => {
      page.value = 1;
      refetch();
      handleData();
    });

    const handleData = () => {
      variables.value = {
        page: page.value,
        take: take.value,
        categories: [code.value],
      };

      if (type.value === 'atp' && result.value) {
        pointData.value = [
          ...result.value?.pointsListForAdmin.points,
          ...pointData.value,
        ]
          .filter((v, i, self) => i === self.findIndex((t) => t.id === v.id))
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        filterdData.value = pointData.value?.filter(
          (data) => data.useItem === code.value
        );
      }

      // if (type.value === 'sp' && spresult.value) {
      //   pointData.value = [
      //     ...result.value?.pointsListForAdmin.points,
      //     ...pointData.value,
      //   ]
      //     .filter((v, i, self) => i === self.findIndex((t) => t.id === v.id))
      //     .sort((a, b) => new Date(b.date) - new Date(a.date));

      //   filterdData.value = pointData.value?.filter(
      //     (data) => data.useItem === code.value
      //   );
      // }

      switch (code.value) {
        case 'ExceedMeal':
          title.value = '식대초과';
          return;
        case 'Snacks':
          title.value = '식음료';
          return;
        case 'Culture':
          title.value = '문화';
          return;
        case 'Item':
          title.value = '물품';
          return;
      }
    };

    const handlePage = (propsPage, propsTake) => {
      if (!result.value?.pointsListForAdmin.nextPage) return;

      page.value = propsPage - 1;
      take.value = propsTake;

      variables.value = {
        page: page,
        take: take,
        categories: [route.query.code],
      };
    };

    const goToPage = () => {
      router.push('/admin/point');
    };

    return {
      goToPage,
      code,
      type,
      title,
      filterdData,
      page,
      take,
      handleData,
      handlePage,
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin-bottom: 50px;
}

h2 {
  @include stLayout;
  @include stPageTitle;
}

.history {
  margin-top: 30px;
}

h3 {
  margin-top: 34px;
  @include stLayout;
  @include title800_20;
}
</style>

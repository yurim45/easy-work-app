<template>
  <send-point v-if="isAlramOn" :onclick="checkAlram" type="arrive" />
  <back-header @click="goToHome" :hasDelete="false" />
  <main>
    <h2>사용내역</h2>
    <my-point-summary :isAdmin="true" :type="type" />
    <line-view />
    <point-history
      v-if="pointData?.length > 0"
      :data="pointData"
      :isAdmin="true"
    />
    <empty-view v-else text="포인트 사용 내역이 없습니다" />
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
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import { QUERY_ALL_POINTS } from '@/graphql/point';
import router from '@/router';
import {
  BackHeader,
  PageToTopButton,
  LineView,
  InfiniteScroll,
  EmptyView,
} from '@/components/common/index.js';
import {
  MyPointSummary,
  PointHistory,
  SendPoint,
} from '@/components/point/components/index.js';

export default {
  name: 'AdminPointDetail',
  components: {
    BackHeader,
    MyPointSummary,
    PointHistory,
    PageToTopButton,
    SendPoint,
    LineView,
    InfiniteScroll,
    EmptyView,
  },
  setup() {
    const route = useRoute();

    const isAlramOn = ref(false);
    const pointData = ref([]);
    const page = ref(1);
    const take = ref(25);
    const type = ref(null);

    const { result, refetch, variables } = useQuery(QUERY_ALL_POINTS, {
      page: page.value,
      take: take.value,
    });

    onMounted(() => {
      refetch();
      handleData();

      if (route.query.type) {
        type.value = route.query.type;
      }
    });

    watch(route, () => {
      type.value = route.query.type;
    });

    watch(result, () => {
      handleData();
    });

    const handleData = () => {
      if (type.value === 'atp' && result.value) {
        if (page.value === 1) {
          pointData.value = result.value?.pointsListForAdmin.points;
        } else {
          pointData.value = [
            ...result.value?.pointsListForAdmin.points,
            ...pointData.value,
          ]
            .filter((v, i, self) => i === self.findIndex((t) => t.id === v.id))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        }
      }
    };

    const handlePage = (propsPage, propsTake) => {
      if (!result.value?.pointsListForAdmin.nextPage) return;
      page.value = propsPage - 1;
      take.value = propsTake;

      variables.value = {
        page: page,
        take: take,
      };
    };

    const checkAlram = () => {
      isAlramOn.value = false;
    };

    const goToHome = () => {
      router.push('/admin/point');
    };

    return {
      pointData,
      page,
      take,
      type,
      handleData,
      handlePage,
      goToHome,
      isAlramOn,
      checkAlram,
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  margin-bottom: 50px;
}

h2 {
  @include stLayout;
  @include stPageTitle;
}
</style>

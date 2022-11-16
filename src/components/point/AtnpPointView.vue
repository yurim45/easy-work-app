<template>
  <main>
    <h2>ATNP Point</h2>
    <new-point-summary :isImgView="isImgView" /> <line-view />
    <point-history :data="pointData" v-if="pointData?.length > 0" />
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
import { useQuery } from '@vue/apollo-composable';
import { QUERY_POINTS_LIST } from '@/graphql/point';
import router from '@/router';
import {
  PageToTopButton,
  LineView,
  InfiniteScroll,
  EmptyView,
} from '@/components/common/index.js';
import {
  NewPointSummary,
  PointHistory,
} from '@/components/point/components/index.js';

export default {
  name: 'AtnpPointView',
  components: {
    NewPointSummary,
    PointHistory,
    PageToTopButton,
    LineView,
    InfiniteScroll,
    EmptyView,
  },
  props: {
    isImgView: Boolean,
  },
  setup() {
    const pointData = ref([]);
    const type = ref(null);
    const page = ref(1);
    const take = ref(25);

    const { result, refetch, variables } = useQuery(QUERY_POINTS_LIST, {
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
          pointData.value = result.value?.pointsList.points;
        } else {
          pointData.value = [
            ...result.value?.pointsList.points,
            ...pointData.value,
          ]
            .filter((v, i, self) => i === self.findIndex((t) => t.id === v.id))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        }
      }
    };

    const handlePage = (propsPage, propsTake) => {
      if (!result.value?.pointsList.nextPage) return;
      page.value = propsPage - 1;
      take.value = propsTake;

      variables.value = {
        page: page,
        take: take,
      };
    };

    // const { mutate: checkMessage } = useMutation(
    //   MUTATION_CHECK_MESSAGE,
    //   () => ({
    //     variables: {
    //       messageId: +route.query.messageId,
    //     },
    //   })
    // );

    const goToHome = () => {
      router.push('/');
    };

    return {
      pointData,
      type,
      goToHome,
      page,
      take,
      handleData,
      handlePage,
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

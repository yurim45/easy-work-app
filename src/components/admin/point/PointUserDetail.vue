<template>
  <horizontal-scroll-users
    :goToPage="goToPage"
    :users="users"
    :handleSelectUser="handleSelectUser"
    :selectUser="selectUser"
  />
  <main class="main">
    <user-summary :name="selectUser" type="point" />
    <div class="history">
      <line-view />
      <point-history :data="pointData" />
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
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import router from '@/router';
import { useQuery } from '@vue/apollo-composable';
import { QUERY_POINTS_LIST } from '@/graphql/point';
import {
  PageToTopButton,
  LineView,
  InfiniteScroll,
} from '@/components/common/index.js';
import PointHistory from '@/components/point/components/PointHistory.vue';
import {
  UserSummary,
  HorizontalScrollUsers,
} from '@/components/admin/components/index.js';

export default {
  name: 'PointUserDetail',
  components: {
    PointHistory,
    PageToTopButton,
    UserSummary,
    HorizontalScrollUsers,
    LineView,
    InfiniteScroll,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const users = ref([]);
    const selectUser = ref(null);
    const pointData = ref([]);
    const page = ref(1);
    const take = ref(25);
    const userId = ref(null);

    const { result, refetch, variables } = useQuery(QUERY_POINTS_LIST, {
      page: page.value,
      take: take.value,
      userId: userId.value,
    });

    onMounted(() => {
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
      refetch();
      users.value = store.getters.allusers;

      if (route.query.name) {
        selectUser.value = route.query.name;
        variables.value = {
          page: page.value,
          take: take.value,
          userId: users.value.find((v) => v.nickname === selectUser.value)?.id,
        };
        handleData();
      }
    });

    watch(route, () => {
      selectUser.value = route.query.name;
    });

    watch(result, () => {
      handleData();
    });

    watch(selectUser, () => {
      page.value = 1;
      variables.value = {
        page: page.value,
        take: take.value,
        userId: users.value.find((v) => v.nickname === selectUser.value)?.id,
      };
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
          ].filter((v, i, self) => i === self.findIndex((t) => t.id === v.id));
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
        userId: userId.value,
      };
    };

    watch(selectUser, () => {
      handleData();
    });

    const handleSelectUser = (user) => {
      variables.value = {
        page: page.value,
        take: take.value,
        userId: user.id,
      };
      userId.value = user.id;
      selectUser.value = user.nickname;
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    const goToPage = () => {
      router.push('/admin/point');
    };

    return {
      goToPage,
      users,
      pointData,
      selectUser,
      handleSelectUser,
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
  margin-top: 165px;
}

.history {
  margin-top: 30px;
}
</style>

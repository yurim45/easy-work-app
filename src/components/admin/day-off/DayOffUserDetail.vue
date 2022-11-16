<template>
  <horizontal-scroll-users
    :goToPage="goToPage"
    :users="users"
    :handleSelectUser="handleSelectUser"
    :selectUser="selectUser"
  />
  <main class="main">
    <div class="summary">
      <user-summary :name="selectUser" type="dayoff" />
    </div>
    <line-view />
    <user-status :data="filterdData" :user="userData" />
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
import { QUERY_DAYOFF_LIST } from '@/graphql/dayOff';
import {
  PageToTopButton,
  LineView,
  InfiniteScroll,
} from '@/components/common/index.js';
import {
  UserSummary,
  HorizontalScrollUsers,
} from '@/components/admin/components/index.js';
import UserStatus from './components/UserStatus.vue';

export default {
  name: 'DayOffUserDetail',
  components: {
    PageToTopButton,
    UserSummary,
    UserStatus,
    LineView,
    HorizontalScrollUsers,
    InfiniteScroll,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const users = ref([]);
    const selectUser = ref(null);
    const dayoffData = ref([]);
    const filterdData = ref([]);
    const userData = ref(null);
    const page = ref(1);
    const take = ref(25);

    const { result, refetch, variables } = useQuery(QUERY_DAYOFF_LIST, {
      page: page.value,
      take: take.value,
      isEvery: true,
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
        handleData();
      }
    });

    watch(result, () => {
      handleData();
    });

    watch(selectUser, () => {
      page.value = 1;
      variables.value = {
        page: page,
        take: take,
        isEvery: true,
      };
      refetch();
      handleData();
    });

    const handleData = () => {
      if (!result.value) return;

      if (page.value === 1) {
        dayoffData.value = result.value.getDayoffList.dayoffList;
      } else {
        dayoffData.value = [
          ...result.value.getDayoffList.dayoffList,
          ...dayoffData.value,
        ]
          .filter((v, i, self) => i === self.findIndex((t) => t.id === v.id))
          .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      }

      filterdData.value = dayoffData.value?.filter(
        (data) => data.user.nickname === selectUser.value
      );

      userData.value = users.value.find((v) => v.nickname === selectUser.value);
    };

    const handlePage = (propsPage, propsTake) => {
      if (!result.value?.getDayoffList.nextPage) return;
      page.value = propsPage;
      take.value = propsTake;

      variables.value = {
        page: page,
        take: take,
        isEvery: true,
      };
    };

    const handleSelectUser = (user) => {
      selectUser.value = user.nickname;
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    const goToPage = () => {
      router.push({ path: '/admin/day-off', query: { tab: 2 } });
    };

    return {
      goToPage,
      users,
      filterdData,
      userData,
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
.fixtop {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

.fixuser {
  position: fixed;
  top: 60px;
  width: 100%;
  max-width: 600px;
  padding-top: 15px;
  background: var(--line);
  z-index: 100;
}

.summary {
  margin-top: 165px;
}

.users {
  @include stLayout;
  @include flex(flex-start);
  padding-bottom: 25px;
  background: var(--line);
}

li {
  width: 40px;
  height: 40px;
  margin-right: 12px;
}

.history {
  margin-top: 30px;
}
</style>

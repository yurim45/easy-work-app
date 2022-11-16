<template>
  <horizontal-scroll-users
    :goToPage="goToPage"
    :users="users"
    :handleSelectUser="handleSelectUser"
    :selectUser="selectUser"
  />
  <main>
    <div class="summary">
      <user-summary :name="selectUser" type="item" />
    </div>
    <line-view />
    <h3>물품 요청내역</h3>
    <item-history :data="filterdData" v-if="filterdData?.length > 0" />
    <empty-view v-else text="물품신청 내역이 없습니다" />
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
import { QUERY_PURCHASE_LIST } from '@/graphql/supply';
import {
  PageToTopButton,
  LineView,
  InfiniteScroll,
  EmptyView,
} from '@/components/common/index.js';
import {
  UserSummary,
  HorizontalScrollUsers,
} from '@/components/admin/components/index.js';
import { ItemHistory } from '@/components/item/components/index.js';

export default {
  name: 'SupplyUserDetail',
  components: {
    PageToTopButton,
    HorizontalScrollUsers,
    LineView,
    UserSummary,
    ItemHistory,
    InfiniteScroll,
    EmptyView,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const users = ref([]);
    const selectUser = ref(null);
    const purchaseData = ref([]);
    const filterdData = ref([]);
    const page = ref(1);
    const take = ref(25);

    const { result, refetch, variables } = useQuery(QUERY_PURCHASE_LIST, {
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
      handleData();
    });

    const handleData = () => {
      if (result.value) {
        purchaseData.value = [
          ...result.value.getPurchaseList.purchaseList,
          ...purchaseData.value,
        ].filter((v, i, self) => i === self.findIndex((t) => t.id === v.id));

        filterdData.value = purchaseData.value?.filter(
          (data) => data.writer.nickname === selectUser.value
        );
      }
    };

    const handlePage = (propsPage, propsTake) => {
      if (!result.value?.getPurchaseList.nextPage) return;
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
      handleData();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    const goToPage = () => {
      router.go(-1);
    };

    return {
      users,
      filterdData,
      selectUser,
      handleSelectUser,
      goToPage,
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

h3 {
  margin-top: 34px;
  @include stLayout;
  @include title800_20;
}
</style>

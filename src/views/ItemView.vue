<template>
  <back-header @click="goToHome" />
  <main>
    <h2>Supply</h2>
    <section class="box">
      <p>
        업무에 필요한 물품을 <br />
        쉽고 빠르게 요청하세요!
      </p>
      <basic-button label="구매 요청" @onClick="goToSupply" />
    </section>
    <line-view />
    <div class="list" v-if="data?.length > 0">
      <item-history :data="data" />
    </div>
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
import { onMounted, watch, ref } from 'vue';
import router from '@/router';
import { useQuery } from '@vue/apollo-composable';
import { QUERY_PURCHASE_LIST } from '@/graphql/supply';
import {
  BackHeader,
  PageToTopButton,
  BasicButton,
  LineView,
  InfiniteScroll,
  EmptyView,
} from '@/components/common/index.js';
import { ItemHistory } from '@/components/item/components/index.js';

export default {
  name: 'ItemView',
  components: {
    BackHeader,
    BasicButton,
    PageToTopButton,
    ItemHistory,
    LineView,
    InfiniteScroll,
    EmptyView,
  },
  setup() {
    const data = ref([]);
    const page = ref(1);
    const take = ref(25);

    const { result, refetch, variables } = useQuery(QUERY_PURCHASE_LIST, {
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
          data.value = result.value?.getPurchaseList.purchaseList;
        } else {
          data.value = [
            ...result.value?.getPurchaseList.purchaseList,
            ...data.value,
          ]
            .filter((v, i, self) => i === self.findIndex((t) => t.id === v.id))
            .sort((a, b) => a.updatedAt - b.updatedAt);
        }
      }
    };

    const handlePage = (propsPage, propsTake) => {
      if (!result.value?.getPurchaseList.nextPage) return;
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

    const goToSupply = () => {
      router.push('/item/supply');
    };

    return { goToHome, goToSupply, data, page, take, handleData, handlePage };
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

.box {
  @include stLayout;
  @include flex(space-between);
  margin-bottom: 30px;

  p {
    @include title700_15;
  }

  button {
    width: 90px;
  }
}

.list {
  padding: 18px 0;
}
</style>

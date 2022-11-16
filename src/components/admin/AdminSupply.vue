<template>
  <basic-header :onClickAdmin="onClickAdmin" :isAdmin="true" />
  <main>
    <h2>Supply</h2>
    <ul>
      <li :class="{ active: isSelected === '1' }" @click="handleTabMenu('1')">
        신청현황
      </li>

      <li :class="{ active: isSelected === '2' }" @click="handleTabMenu('2')">
        신청내역
      </li>
    </ul>
    <purchase-status v-if="isSelected === '1'" :data="data" />
    <supply-list v-if="isSelected === '2'" :data="data" />
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
import router from '@/router/index';
import { useQuery } from '@vue/apollo-composable';
import { QUERY_PURCHASE_LIST } from '@/graphql/supply';
import {
  BasicHeader,
  PageToTopButton,
  InfiniteScroll,
} from '@/components/common/index.js';
import { PurchaseStatus, SupplyList } from './item/components/index.js';

export default {
  name: 'AdminSupply',
  components: {
    BasicHeader,
    PageToTopButton,
    InfiniteScroll,
    PurchaseStatus,
    SupplyList,
  },
  setup() {
    const isSelected = ref('1');
    const data = ref([]);
    const page = ref(1);
    const take = ref(25);

    const { result, refetch, variables } = useQuery(QUERY_PURCHASE_LIST, {
      page: page.value,
      take: take.value,
      isEvery: true,
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
          ].filter((v, i, self) => i === self.findIndex((t) => t.id === v.id));
        }
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

    const handleTabMenu = (menu) => {
      isSelected.value = menu;
    };

    const onClickAdmin = () => {
      router.go(-1);
    };

    return {
      isSelected,
      data,
      page,
      take,
      handleData,
      handlePage,
      handleTabMenu,
      onClickAdmin,
    };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  @include stLayout;
  @include stPageTitle;
}

ul {
  margin: 25px 0 20px;
  @include stLayout;
  @include flex(flex-start);

  li {
    margin-right: 20px;
    color: var(--gray999);
    @include title800_20;
    cursor: pointer;
  }
}

.active {
  color: var(--black);
}
</style>

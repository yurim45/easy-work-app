<template>
  <section class="section">
    <template v-if="pendingData?.length > 0">
      <pending-card v-for="data in pendingData" :key="data.id" :data="data" />
    </template>
    <empty-view v-else text="물품신청 내역이 없습니다" />
    <h3>직원별 신청 현황</h3>
    <ul>
      <user-supply-list
        v-for="(user, i) in userList"
        :key="user.id"
        :data="user"
        @click="goToPage(user)"
        :length="userList?.length"
        :i="i"
      />
    </ul>
  </section>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import { EmptyView } from '@/components/common/index.js';
import PendingCard from './PendingCard.vue';
import UserSupplyList from './UserSupplyList.vue';

export default {
  name: 'PurchaseStatus',
  components: { PendingCard, UserSupplyList, EmptyView },
  props: {
    data: Array,
  },
  setup(props) {
    const store = useStore();

    const pendingData = ref();
    const userList = ref([]);

    onMounted(() => {
      userList.value = store.getters.allusers;

      handleData();
    });

    watch(props, () => {
      handleData();
    });

    const handleData = () => {
      pendingData.value = props.data?.filter(
        (data) =>
          data.purchaseStatus === 'Pending' ||
          data.purchaseStatus === 'Approved'
      );
    };

    const goToPage = (user) => {
      router.push({
        name: 'supplyUserDetail',
        query: { name: user.nickname },
      });
    };

    return { pendingData, userList, goToPage };
  },
};
</script>

<style lang="scss" scoped>
.section {
  @include stLayout;
  margin-bottom: 100px;

  h3 {
    margin: 40px 0 20px;
    @include title800_20;
  }
}
</style>

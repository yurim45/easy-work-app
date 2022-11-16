<template>
  <basic-header :onClickAdmin="onClickAdmin" :isAdmin="true" />
  <main class="admindayoff">
    <h2>Day Off</h2>
    <ul>
      <li :class="{ active: isSelected === '1' }" @click="handleTabMenu('1')">
        신청현황
      </li>
      <li :class="{ active: isSelected === '2' }" @click="handleTabMenu('2')">
        휴가현황
      </li>
    </ul>
    <apply-status v-if="isSelected === '1'" />
    <day-off-status v-if="isSelected === '2'" />
  </main>
  <page-to-top-button />
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import router from '@/router/index';
import { useQuery } from '@vue/apollo-composable';
import { QUERY_ALL_USERS } from '@/graphql';
import { BasicHeader, PageToTopButton } from '@/components/common/index.js';
import { ApplyStatus, DayOffStatus } from './day-off/index.js';

export default {
  name: 'AdminDayOff',
  components: { BasicHeader, PageToTopButton, ApplyStatus, DayOffStatus },
  setup() {
    const store = useStore();
    const route = useRoute();

    const isSelected = ref('1');

    const { result, refetch } = useQuery(QUERY_ALL_USERS);

    onMounted(() => {
      refetch();
      handelUserData();

      if (route.query.tab) {
        isSelected.value = route.query.tab;
      }
    });

    watch(route, () => {
      isSelected.value = route.query.tab;
    });

    watch(result, () => {
      handelUserData();
    });

    const handelUserData = () => {
      if (result.value) {
        store.dispatch('getAllusers', {
          allusers: result.value.allUsers.users,
        });
      }
    };

    const handleTabMenu = (menu) => {
      isSelected.value = menu;
    };

    const onClickAdmin = () => {
      router.push('/admin');
    };

    return { isSelected, handleTabMenu, onClickAdmin };
  },
};
</script>

<style lang="scss" scoped>
.admindayoff {
  h2 {
    @include stLayout;
    @include stPageTitle;
  }
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

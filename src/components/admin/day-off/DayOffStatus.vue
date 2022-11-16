<template>
  <section class="section">
    <button type="button" @click="goToCreateDayoff" class="card">
      <img alt="" src="@/assets/images/day-off/icon_annual.png" /> 휴가발급
    </button>
    <h3>연차 현황</h3>
    <ul>
      <day-off-status-list
        v-for="(user, i) in userList"
        :key="user.id"
        :data="user"
        @click="goToPage(user)"
        :i="i"
        :length="userList?.length"
      />
    </ul>
  </section>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import DayOffStatusList from './components/DayOffStatusList.vue';

export default {
  name: 'DayOffStatus',
  components: { DayOffStatusList },
  setup() {
    const store = useStore();

    const userList = ref([]);

    onMounted(() => {
      userList.value = store.getters.allusers.sort(
        (a, b) => new Date(a.joinDay) - new Date(b.joinDay)
      );
    });

    const goToPage = (user) => {
      router.push({ name: 'dayOffUserDetail', query: { name: user.nickname } });
    };

    const goToCreateDayoff = () => {
      router.push('/admin/day-off/create');
    };

    return { userList, goToPage, goToCreateDayoff };
  },
};
</script>

<style lang="scss" scoped>
.section {
  @include stLayout;

  button {
    width: 100%;
  }

  h3 {
    @include title800_20;
  }
}

ul {
  margin: 10px 0 100px;
}

.card {
  @include flex(center, center, column);
  padding: 19px 0 16px;
  margin-bottom: 40px;
  background: var(--white);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  @include body500_13;
}

img {
  margin-bottom: 4px;
  width: 40px;
}
</style>

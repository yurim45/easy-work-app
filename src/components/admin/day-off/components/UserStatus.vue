<template>
  <section class="section">
    <div class="title">
      <h3>휴가 현황</h3>
      <div @click="handleIsOpen">{{ selectedyear }}<icon-select /></div>
    </div>
    <div class="selectWrapper">
      <ul class="select" v-if="isOpen">
        <li @click="selectYear('2023')">2023</li>
        <li @click="selectYear('2022')">2022</li>
        <li @click="selectYear('2021')">2021</li>
        <li @click="selectYear('2020')">2020</li>
      </ul>
    </div>
    <div>
      <h4>연차 현황</h4>
      <ul>
        <li>
          <span>발생</span>
          <strong class="cnt">{{ getCnt('Create') }}일</strong>
        </li>
        <li>
          <span>이월</span>
          <strong class="cnt">{{ getCnt('Continued') }}일</strong>
        </li>
        <li>
          <span>소멸</span>
          <strong class="cnt">{{ getCnt('Gone') }}일</strong>
        </li>
        <li>
          <span>사용</span>
          <strong class="cnt">{{ getCnt('Use') }}일</strong>
        </li>
      </ul>
      <div class="fix">
        <span>잔여</span>
        <strong class="cnt">{{ getCnt('Rest') }}일</strong>
      </div>
      <h4>특별 휴가</h4>
      <ul>
        <li>
          <span>연말정산 특별휴가</span>
          <strong class="cnt">{{ getSpecialDayoffCnt('Refresh') }}일</strong>
        </li>
        <li>
          <span>여름휴가</span>
          <strong class="cnt">{{ getSpecialDayoffCnt('Summer') }}일</strong>
        </li>
        <li>
          <span>멍떠</span>
          <strong class="cnt">{{ getSpecialDayoffCnt('Mung') }}일</strong>
        </li>
        <li>
          <span>Apple Vacation</span>
          <strong class="cnt">{{ getSpecialDayoffCnt('Apple') }}일</strong>
        </li>
      </ul>
    </div>
    <line-view />
    <div class="history">
      <h3>휴가 사용내역</h3>
      <day-off-history-list
        v-if="filterdData?.length > 0"
        :data="filterdData"
        :goToPage="goToPage"
      />
      <empty-view v-else text="휴가 내역이 없습니다" />
    </div>
  </section>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import router from '@/router';
import { useQuery } from '@vue/apollo-composable';
import { QUERY_DAYOFF_STATUS } from '@/graphql/dayOff';
import { EmptyView } from '@/components/common/index.js';
import { IconSelect } from '@/components/day-off/components/icons/index.js';
import DayOffHistoryList from '@/components/day-off/components/DayOffHistoryList.vue';
import LineView from '@/components/common/LineView.vue';

export default {
  components: { IconSelect, DayOffHistoryList, LineView, EmptyView },
  name: 'UserStatus',
  props: {
    data: Array,
    user: Object,
  },
  setup(props) {
    const isOpen = ref(false);
    const selectedyear = ref('2022');
    const dayoffData = ref([]);
    const filterdData = ref([]);
    const statusData = ref([]);

    const { result, variables, refetch } = useQuery(QUERY_DAYOFF_STATUS, {
      userId: +props?.user?.id,
      year: +selectedyear.value,
    });

    onMounted(() => {
      refetch();
      getFilterdData();
      handelStatusData();

      if (props?.user) {
        variables.value = {
          userId: +props.user?.id,
          year: +selectedyear.value,
        };
      }
    });

    watch(props, () => {
      getFilterdData();

      if (props?.user) {
        variables.value = {
          userId: +props.user?.id,
          year: +selectedyear.value,
        };
        refetch();
        handelStatusData();
      }
    });

    watch(result, () => {
      handelStatusData();
    });

    watch(selectedyear, () => {
      variables.value = {
        userId: +props.user?.id,
        year: +selectedyear.value,
      };
      refetch();
      getFilterdData();
    });

    const handelStatusData = () => {
      if (result.value) {
        statusData.value = result.value?.getDayoffStatus.specialDayoff;
        dayoffData.value = result.value?.getDayoffStatus.status;
      }
    };

    const getFilterdData = () => {
      filterdData.value = props.data?.filter(
        (data) => data.startDate?.substr(0, 4) === selectedyear.value
      );
    };

    const getCnt = (data) => {
      return dayoffData.value?.find((v) => v.name === data)?.count;
    };

    const getSpecialDayoffCnt = (data) => {
      return statusData.value?.find((v) => v.name === data)?.count;
    };

    const handleIsOpen = () => {
      isOpen.value = !isOpen.value;
    };

    const selectYear = (year) => {
      selectedyear.value = year;
      isOpen.value = false;
    };

    const goToPage = (dayoff) => {
      router.push({
        path: '/day-off/detail',
        query: { id: dayoff.id, isAdmin: true },
      });
    };

    return {
      isOpen,
      selectedyear,
      handleIsOpen,
      getSpecialDayoffCnt,
      getCnt,
      selectYear,
      goToPage,
      filterdData,
    };
  },
};
</script>

<style lang="scss" scoped>
.section {
  margin-bottom: 180px;

  h3 {
    @include title800_20;
  }
}

.title {
  @include stLayout;
  @include flex(space-between);
  margin: 34px 0 20px;

  div {
    @include title700_17;
  }

  svg {
    margin: 0 4px;
  }
}

.selectWrapper {
  max-width: 600px;
  position: relative;
}

.select {
  position: absolute;
  margin: -15px;
  right: 40px;
  padding: 18px 20px 11px;
  background: var(--white);
  @include title700_17;
  border: 1px solid var(--line);
  border-radius: 10px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);

  li {
    width: 92px;
    margin-bottom: 9px;
    padding: 2px 6px;

    @include title700_17;
  }
}

.cnt {
  color: var(--gray555);
  @include body400_14;
}

h4 {
  padding: 5px 30px;
  @include body500_13;
  background: var(--line);
}

ul {
  li {
    @include flex(space-between);
    padding: 16px 30px;
    @include body600_14;
    border-bottom: 1px solid var(--line);
  }
}

.history {
  @include stLayout;
  background: var(--white);

  h3 {
    margin: 37px 0 20px;
  }
}

.fix {
  position: sticky;
  position: -webkit-sticky;
  top: 128px;
  @include flex(space-between);
  padding: 14px 30px;
  @include body600_14;
  border-bottom: 1px solid var(--line);
  background: var(--white);
}
</style>

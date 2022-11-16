<template>
  <section class="section">
    <div class="title">
      <h3>휴가 내역</h3>
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
    <day-off-history-list
      v-if="filterdData?.length > 0"
      :data="filterdData"
      :goToPage="goToPage"
    />
    <empty-view v-else text="휴가 내역이 없습니다" />
  </section>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import router from '@/router/index.js';
import { EmptyView } from '@/components/common/index.js';
import { IconSelect } from './icons/index.js';
import DayOffHistoryList from './DayOffHistoryList.vue';

export default {
  name: 'DayOffHistory',
  components: {
    DayOffHistoryList,
    IconSelect,
    EmptyView,
  },
  props: {
    data: Array,
  },
  setup(props) {
    const isOpen = ref(false);
    const selectedyear = ref('2022');
    const dayoffData = ref([]);
    const filterdData = ref([]);

    onMounted(() => {
      getFilterdData();
    });

    watch(props, () => {
      getFilterdData();
    });

    watch(selectedyear, () => {
      getFilterdData();
    });

    const getFilterdData = () => {
      filterdData.value = props.data
        ?.filter((data) => data.startDate?.substr(0, 4) === selectedyear.value)
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
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
        query: { id: dayoff.id, isAdmin: false },
      });
    };

    return {
      isOpen,
      filterdData,
      dayoffData,
      selectedyear,
      handleIsOpen,
      getFilterdData,
      selectYear,
      goToPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.section {
  margin-bottom: 100px;
  @include stLayout;
}

.title {
  @include flex(space-between);
  margin: 34px 0 20px;

  h3 {
    @include title800_20;
  }

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
  right: 20px;
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
</style>

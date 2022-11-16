<template>
  <section class="section">
    <h3>특별 휴가</h3>
    <ul class="annualList" v-if="filterData?.length > 0">
      <li
        v-for="data in filterData"
        :key="data.id"
        @click="goToApply(data.name)"
        class="title"
      >
        <img
          v-if="data.name === 'Refresh' && data.isActive"
          :alt="data.name"
          src="./image/special.png"
        />
        <img
          v-if="data.name === 'Summer' && data.isActive"
          :alt="data.name"
          src="./image/summer.png"
        />
        <img
          v-if="data.name === 'Mung' && data.isActive"
          :alt="data.name"
          src="./image/day.png"
        />
        <img
          v-if="data.name === 'Apple' && data.isActive"
          :alt="data.name"
          src="./image/apple.png"
        />
        <div v-if="getActive(data.isActive)">
          <div>{{ getTitle(data) }}</div>
          <div class="day">
            <span>{{ data.period }}일</span>
            <icon-separator v-if="data.dueDate" />
            <span v-if="data.dueDate" class="dueDate"
              >D-{{ data.dueDate }}</span
            >
          </div>
        </div>
      </li>
    </ul>
    <empty-view v-else text="발급된 휴가가 없습니다" />
  </section>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import moment from 'moment';
import { EmptyView } from '@/components/common/index.js';
import { IconSeparator } from '@/components/common/icons/index.js';

export default {
  name: 'SpecialDayOff',
  components: {
    IconSeparator,
    EmptyView,
  },
  setup() {
    const store = useStore();
    const filterData = ref({});

    onMounted(() => {
      filterData.value = store.getters.me.specialDayoffList
        ?.filter((v) => v.isActive)
        ?.map((v) => {
          return {
            isActive: v.isActive,
            dueDate: v.dueDate && moment(v.dueDate).diff(moment(), 'days'),
            name: v.name,
            period: v.period,
          };
        });
    });

    const getTitle = (data) => {
      switch (data.name) {
        case 'Refresh':
          return '연말정산 특별휴가';
        case 'Summer':
          return '여름휴가';
        case 'Mung':
          return '멍떠';
        case 'Apple':
          return 'Apple vacation';
      }
    };

    const getActive = (isActive) => {
      return isActive;
    };

    const getDueDate = (data) => {
      console.log('dueDate', data.dueDate);
      return moment(data.dueDate ?? 0).diff(moment(), 'days');
    };

    const goToApply = (dayoff) => {
      router.push({ path: '/day-off/apply', query: { dayoff } });
    };

    return {
      filterData,
      goToApply,
      getTitle,
      getDueDate,
      getActive,
    };
  },
};
</script>

<style lang="scss" scoped>
.section {
  @include stLayout;

  h3 {
    margin-bottom: 20px;
    @include title800_20;
  }
}

li {
  width: 100%;
  margin-bottom: 22px;
  cursor: pointer;
}

.title {
  @include flex(flex-start);
  width: 100%;

  img {
    width: 40px;
    margin-right: 14px;
  }

  div {
    @include body600_15;
  }
}

.day {
  color: var(--blue-txt);
  @include body600_14;

  svg {
    margin: 0 8px;
  }
}

.dueDate {
  color: var(--red-txt);
  @include body600_14;
}
</style>

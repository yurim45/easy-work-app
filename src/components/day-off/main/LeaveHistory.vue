<template>
  <section class="section">
    <div class="title">
      <h3>휴가내역</h3>
      <select-view
        mode="single"
        name="year"
        :selectValue="year"
        :optionList="yearList"
        @handleValue="handleValue($event)"
      />
    </div>
    <ul class="annualList">
      <li v-for="use in useList" :key="use.id">
        <div class="subTitle">
          <div class="useDate">{{ date(use.startDate) }}</div>
          <!-- [willFix]:  -->
          <icon-annual v-if="use.dayOffItem === '연차'" />
          <icon-morning-annual v-if="use.dayOffItem === '오전반차'" />
          <icon-afternoon-annual v-if="use.dayOffItem === '오후반차'" />
          <icon-summer v-if="use.dayOffItem === '여름휴가'" />
          <div class="content">
            <strong>{{ use.dayOffItem }} </strong
            ><span v-if="!use.isApprove">(승인대기)</span>
            <div class="day">
              {{ date(use.startDate) }} ~ {{ date(use.endDate) }}
              <!-- [willFix]:  -->
              <span class="useDay">(-3)</span>
            </div>
          </div>
        </div>
        <button v-if="!use.isApprove" class="cencel" @click="handleCencel">
          취소
        </button>
        <button v-if="use.isApprove" class="empty"></button>
      </li>
    </ul>
  </section>
</template>

<script>
import SelectView from '@/components/common/selectView/SelectView.vue';
import {
  IconAnnual,
  IconMorningAnnual,
  IconAfternoonAnnual,
} from '../icons/annual/index';
import { IconSummer } from '../icons/special/index';
import { USER_ANNUAL_LIST } from '@/constants';

export default {
  name: 'LeaveHistory',
  components: {
    SelectView,
    IconAnnual,
    IconMorningAnnual,
    IconAfternoonAnnual,
    IconSummer,
  },
  data() {
    return {
      year: null,
      yearList: [
        { value: '2022', label: '2022년도' },
        { value: '2021', label: '2021년도' },
      ],
      useList: [],
    };
  },
  watch: {
    year() {
      this.useList = USER_ANNUAL_LIST.filter(
        (use) => use.useYear === this.year
      );
    },
  },
  created() {
    this.year = '2022';
    this.useList = USER_ANNUAL_LIST.filter((use) => use.useYear === this.year);
  },
  computed: {
    date() {
      return (date) => date.substring(5);
    },
  },
  methods: {
    handleValue(value) {
      switch (value.name) {
        case 'year':
          this.year = value.value;
          return;
      }
    },
    handleCencel() {
      console.log('=== 취소');
    },
  },
};
</script>

<style scoped lang="scss">
.section {
  @include stFormBox;
  margin-top: 12px;
}

.select {
  width: 50%;
}

.annualList {
  margin-top: 24px;

  li {
    @include flex(space-between);
    width: 100%;
    height: 48px;
    margin: 8px 0 24px;
  }

  :last-child {
    margin: 0;
  }
}

.title {
  @include flex(space-between, start);
  margin-top: -10px;

  h3 {
    padding-top: 10px;
  }
}

.subTitle {
  @include flex(center, center, row);

  svg {
    width: 36px;
    height: 36px;
    margin-right: 15px;
  }

  strong {
    font-weight: 700;
    font-size: 18px;
    line-height: 1.5;
    letter-spacing: -0.6px;
  }
}

.useDate {
  margin-right: 10px;
  font-size: 14px;
  letter-spacing: -0.6px;
}

.empty {
  width: 52px;
}

.cencel {
  width: 52px;
  height: 31px;
  background: #f7dece;
  color: var(--text-red);
  border-radius: 5px;
}

.content {
  font-size: 18px;
}

.day {
  font-size: 14px;
  letter-spacing: -1px;
}

.useDay {
  color: var(--text-red);
}
</style>

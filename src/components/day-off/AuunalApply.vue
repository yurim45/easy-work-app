<template>
  <basic-header title="휴가 신청하기" />
  <main>
    <select-view
      label="종류"
      name="annualItem"
      mode="single"
      placeholder="휴가 종류를 선택하세요"
      :selectValue="annualItem"
      :optionList="annualList"
      :isDisabled="isDisabled"
      @handleValue="handleValue($event)"
    />
    <template v-if="annualItem === 'annual'">
      <select-view
        label="반차여부"
        name="harfAnnualItem"
        mode="single"
        placeholder="반차 여부를 선택하세요"
        :selectValue="harfAnnualItem"
        :optionList="harfAnnualList"
        :isDisabled="isDisabled"
        @handleValue="handleValue($event)"
      />
    </template>

    <label>사용일자</label>
    <div class="period">
      <date-view
        name="startDate"
        :inputValue="startDate"
        @handleValue="handleValue($event)"
      />
      <span v-if="isView">~</span>
      <date-view
        v-if="isView"
        name="endDate"
        :inputValue="endDate"
        @handleValue="handleValue($event)"
      />
    </div>
    <input-view
      label="사유"
      name="content"
      placeholder="간략하게 사유를 작성하세요"
      :inputValue="content"
      @handleValue="handleValue($event)"
    />
  </main>
  <footer class="result">
    <div class="list">
      <span class="itemTitle" v-if="annualItem === 'annual'">보유연차</span>
      <span class="itemTitle" v-if="annualItem !== 'annual'">휴가일수</span>
      <strong>{{ myDayOff }}일 </strong>
    </div>
    <div class="list">
      <span class="itemTitle" v-if="annualItem === 'annual'">차감연차</span>
      <span class="itemTitle" v-if="annualItem !== 'annual'">사용휴가</span>
      <strong class="red">-{{ dateDiff }}일 </strong>
    </div>
    <div class="itemResult">
      <div class="list">
        <span v-if="annualItem === 'annual'">잔여 연차</span>
        <span v-if="annualItem !== 'annual'">잔여 휴가</span>
        <strong> {{ remaining }}일</strong>
      </div>
    </div>
    <button-view label="신청하기" @onClick="onSubmitAnnualApply" />
  </footer>
</template>

<script>
import BasicHeader from '../common/header/BasicHeader.vue';
import {
  DateView,
  ButtonView,
  InputView,
  SelectView,
} from '@/components/common/index';
import { ANNUAL_LIST, HARF_ANNUAL_LIST } from '@/constants';

export default {
  name: 'AuunalApply',
  components: { BasicHeader, SelectView, ButtonView, DateView, InputView },
  data() {
    return {
      annualItem: '',
      harfAnnualItem: '',
      annualList: ANNUAL_LIST,
      harfAnnualList: HARF_ANNUAL_LIST,
      isDisabled: false,
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      content: '',
      myDayOff: 5,
    };
  },
  created() {
    if (Object.keys(this.$route.params)?.length !== 0) {
      this.isDisabled = true;
      switch (this.$route.params.value) {
        case 'annual':
          this.annualItem = 'annual';
          this.harfAnnualItem = 'annual';
          return;
        case 'morningAnnual':
          this.annualItem = 'annual';
          this.harfAnnualItem = 'morningAnnual';
          return;
        case 'afternoonAnnual':
          this.annualItem = 'annual';
          this.harfAnnualItem = 'afternoonAnnual';
          return;
        case 'special':
          this.annualItem = 'special';
          this.myDayOff = 5;
          return;
        case 'summer':
          this.annualItem = 'summer';
          this.myDayOff = 3;
          return;
        case 'alone':
          this.annualItem = 'alone';
          this.myDayOff = 1;
          return;
        case 'apple':
          this.annualItem = 'apple';
          return;
        case 'cc':
          this.annualItem = 'cc';
          return;
        case 'official':
          this.annualItem = 'official';
          return;
        case 'maternity':
          this.annualItem = 'maternity';
          return;
        case 'paternity':
          this.annualItem = 'paternity';
          return;
        case 'family':
          this.annualItem = 'family';
          return;
        case 'physiological':
          this.annualItem = 'physiological';
          return;
      }
    }
  },
  watch: {
    startDate() {
      if (this.startDate > this.endDate) {
        this.endDate = this.startDate;
      }
      this.dateDiff;
    },
    endDate() {
      this.dateDiff;
    },
  },
  computed: {
    isView() {
      return this.harfAnnualItem === 'morningAnnual' ||
        this.harfAnnualItem === 'afternoonAnnual'
        ? false
        : true;
    },
    dateDiff() {
      if (
        this.harfAnnualItem === 'morningAnnual' ||
        this.harfAnnualItem === 'afternoonAnnual'
      ) {
        return 0.5;
      } else {
        const sDate = new Date(this.startDate);
        const eDate = new Date(this.endDate);
        let count = 0;

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const tempDate = sDate;
          if (tempDate.getTime() > eDate.getTime()) {
            return count;
          } else {
            const tmp = tempDate.getDay();
            if (!(tmp === 0 || tmp === 6)) {
              count++;
            }
            tempDate.setDate(sDate.getDate() + 1);
          }
        }
      }
    },
    remaining() {
      return this.myDayOff - this.dateDiff;
    },
  },
  methods: {
    handleValue(value) {
      switch (value.name) {
        case 'annualItem':
          this.annualItem = value.value;
          return;
        case 'harfAnnualItem':
          this.harfAnnualItem = value.value;
          return;
        case 'content':
          this.content = value.value;
          return;
        case 'startDate':
          this.startDate = value.value;
          return;
        case 'endDate':
          this.endDate = value.value;
          return;
      }
    },
    onSubmitAnnualApply() {
      console.log(
        this.annualItem,
        this.harfAnnualItem,
        this.startDate,
        this.endDate,
        this.content
      );
    },
  },
};
</script>

<style scoped lang="scss">
main {
  @include stLayout;
}

.period {
  @include flex(space-between);

  span {
    margin: 0 10px 10px;
  }
}

.result {
  max-width: 900px;
  margin: 80px auto 0;
  padding: 25px;
  background: var(--lightGrey);
}

.list {
  @include flex(space-between);
  margin: 10px 0;
}

.red {
  color: var(--text-red);
}

.itemTitle {
  @include stLabel;
}

.itemResult {
  padding: 10px 0 20px;
  font-size: 18px;
  font-weight: 600;
  border-top: 1px solid var(--line);
}
</style>

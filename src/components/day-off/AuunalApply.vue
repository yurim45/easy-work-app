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
    <footer>
      <button-view label="신청하기" @onClick="onSubmitAnnualApply" />
    </footer>
  </main>
</template>

<script>
import BasicHeader from '../common/header/BasicHeader.vue';
import SelectView from '../common/selectView/SelectView.vue';
import DateView from '../common/DateView.vue';
import ButtonView from '../common/ButtonView.vue';
import { ANNUAL_LIST, HARF_ANNUAL_LIST } from '@/constants';

export default {
  name: 'AuunalApply',
  components: { BasicHeader, SelectView, ButtonView, DateView },
  data() {
    return {
      annualItem: '',
      harfAnnualItem: '',
      annualList: ANNUAL_LIST,
      harfAnnualList: HARF_ANNUAL_LIST,
      isDisabled: false,
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
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
          this.harfAnnualItem = 'annual';
          return;
        case 'summer':
          this.annualItem = 'summer';
          this.harfAnnualItem = 'annual';
          return;
        case 'alone':
          this.annualItem = 'alone';
          this.harfAnnualItem = 'annual';
          return;
        case 'apple':
          this.annualItem = 'apple';
          this.harfAnnualItem = 'annual';
          return;
      }
    }
  },
  computed: {
    isView() {
      return this.harfAnnualItem === 'morningAnnual' ||
        this.harfAnnualItem === 'afternoonAnnual'
        ? false
        : true;
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
      }
    },
    onSubmitAnnualApply() {
      console.log(
        this.annualItem,
        this.harfAnnualItem,
        this.startDate,
        this.endDate
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
</style>

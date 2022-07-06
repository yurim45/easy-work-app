<template>
  <basic-header title="사용내역 추가하기" />
  <main>
    <date-view
      label="사용일자"
      name="date"
      :inputValue="date"
      @handleValue="handleValue($event)"
    />
    <select-view
      label="구분"
      name="useItem"
      mode="single"
      placeholder="카테고리를 선택하세요"
      :selectValue="useItem"
      :optionList="optionList"
      @handleValue="handleValue($event)"
    />
    <input-view
      label="사용처"
      name="usePlace"
      :inputValue="usePlace"
      placeholder="포인트 사용처를 기입하세요"
      @handleValue="handleValue($event)"
    />
    <input-view
      label="사용내역"
      name="useHistory"
      placeholder="포인트 사용내역을 기입하세요"
      :inputValue="useHistory"
      @handleValue="handleValue($event)"
    />
    <select-view
      label="대상인원"
      name="targets"
      mode="tags"
      placeholder="대상 인원을 선택하세요"
      :selectValue="targets"
      :optionList="targetList"
      @handleValue="handleValue($event)"
    />
    <!-- <input-view
      label="제외인원"
      name="excludedTargets"
      placeholder="포인트 차감 제외 대상자를 입력하세요"
      :inputValue="excludedTargets"
      @handleValue="handleValue($event)"
    /> -->
    <input-search-view
      label="제외인원"
      name="excludedTargets"
      placeholder="포인트 차감 제외 대상자를 입력하세요"
      :inputValue="excludedTargets"
      @handleValue="handleValue($event)"
    />
    <input-view
      type="number"
      label="사용금액"
      name="amount"
      placeholder="총 사용한 포인트를 입력하세요"
      :inputValue="amount"
      @handleValue="handleValue($event)"
    />
  </main>
  <footer class="result">
    <div class="list">
      <span class="itemTitle">사용금액</span> <strong>{{ amt }}P</strong>
    </div>
    <div class="list">
      <span class="itemTitle">차감대상</span>
      <div>
        <strong class="targets">{{ totalTarget }}명</strong
        ><span class="targetInfo" v-if="excludedTargets.length > 0"
          >(외부 {{ excludedTargets.length }}명 포함)</span
        >
      </div>
    </div>
    <div class="itemResult">
      <div class="list">
        <span>인당 차감 포인트</span><strong>{{ perAmount }}P</strong>
      </div>
      <div class="list">
        <span>총 차감 포인트</span><strong>{{ totalAmount }}P</strong>
      </div>
    </div>

    <button-view label="기록하기" @onClick="onSubmitSendPoints" />
  </footer>
</template>

<script>
import BasicHeader from '@/components/common/header/BasicHeader.vue';
import {
  DateView,
  ButtonView,
  InputView,
  SelectView,
  InputSearchView,
} from '@/components/common/index';
import { getNumFormat } from '@/util';

export default {
  name: 'RecordPorinsView',
  components: {
    BasicHeader,
    DateView,
    ButtonView,
    SelectView,
    InputView,
    InputSearchView,
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      useItem: null,
      usePlace: '',
      useHistory: '',
      targets: [],
      excludedTargets: [],
      amount: '',
      optionList: [
        { value: '식대초과', label: '식대초과', icon: '🍚' },
        { value: '식음료', label: '식음료', icon: '🍻' },
        { value: '문화', label: '문화', icon: '🎪' },
        { value: '물품', label: '물품', icon: '🛍' },
      ],
      targetList: [
        { value: 'Warren', label: '워렌' },
        { value: 'With', label: '위드' },
        { value: 'Jude', label: '주드' },
        { value: 'James', label: '제임스' },
        { value: 'April', label: '프릴' },
      ],
    };
  },
  computed: {
    amt: function () {
      return getNumFormat(this.amount);
    },
    perAmount: function () {
      if (this.amount && this.targets?.length) {
        return getNumFormat(
          (this.amount ?? 0) /
            (this.targets?.length + this.excludedTargets.length ?? 0)
        );
      }
      return 0;
    },
    totalTarget: function () {
      console.log(this.targets.length, this.excludedTargets.length);
      return this.targets.length + this.excludedTargets.length;
    },
    totalAmount: function () {
      if (this.perAmount && this.targets?.length) {
        return getNumFormat(
          ((this.amount ?? 0) /
            (this.targets?.length + this.excludedTargets.length ?? 0)) *
            (this.targets?.length ?? 0)
        );
      }
      return 0;
    },
  },

  methods: {
    handleValue(value) {
      switch (value.name) {
        case 'date':
          this.date = value.value;
          return;
        case 'useItem':
          this.useItem = value.value;
          return;
        case 'usePlace':
          this.usePlace = value.value;
          return;
        case 'useHistory':
          this.useHistory = value.value;
          return;
        case 'targets':
          this.targets = value.value;
          return;
        case 'excludedTargets':
          // this.excludedTargets = [...this.excludedTargets, value.value];
          console.log('excludedTargets', [
            ...this.excludedTargets,
            value.value,
          ]);
          return;
        case 'amount':
          this.amount = value.value;
          return;
      }
    },
    onSubmitSendPoints() {
      console.log(
        this.date,
        this.useItem,
        this.usePlace,
        this.useHistory,
        this.targets,
        this.excludedTargets,
        this.amount
      );
    },
  },
};
</script>

<style scoped lang="scss">
main {
  @include stLayout;
}

.multiselect-tag {
  background: var(--primary);
}

.result {
  padding: 25px;
  background: var(--lightGrey);

  button {
    width: 100%;
    height: 50px;
    font-weight: 800;
  }
}

.list {
  @include flex(space-between);
  margin: 10px 0;
}

.itemTitle {
  @include stLabel;
}

.targets {
  color: var(--primary);
}

.targetInfo {
  color: var(--primary);
  font-size: 11px;
}

.itemResult {
  margin: 20px 0;
  padding: 30px 0 10px;
  font-size: 18px;
  font-weight: 600;
  border-top: 1px solid var(--line);
}
</style>

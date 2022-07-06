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
      label="내용"
      name="content"
      placeholder="포인트 사용내용을 기입하세요"
      :inputValue="content"
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

    <div class="btnWrapper">
      <button-view
        v-if="isDeleteButtonView"
        label="삭제하기"
        @onClick="deletePointHistory"
        class="deleteButton"
      />
      <button-view label="기록하기" @onClick="onSubmitSendPoints" />
    </div>
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

export const LIST = [
  { value: '식대초과', label: '식대초과', icon: '🍚' },
  { value: '식음료', label: '식음료', icon: '🍻' },
  { value: '문화', label: '문화', icon: '🎪' },
  { value: '물품', label: '물품', icon: '🛍' },
];

export const USER_LIST = [
  {
    value: 'Warren',
    label: '워렌',
    point: 1945,
    name: '원정연',
    nick: 'Warren',
  },
  { value: 'Kevin', label: '케빈', point: 1945, name: '차영민', nick: 'Kevin' },
  { value: 'With', label: '위드', point: 1945, name: '예상기', nick: 'With' },
  { value: 'Sera', label: '세라', point: 1945, name: '신새나', nick: 'Sera' },
  { value: 'Anna', label: '안나', point: 1945, name: '조현정', nick: 'Anna' },
  {
    value: 'Rooney',
    label: '루니',
    point: 1945,
    name: '이기태',
    nick: 'Rooney',
  },
  { value: 'Jude', label: '주드', point: 1945, name: '양주엽', nick: 'Jude' },
  {
    value: 'Charles',
    label: '찰스',
    point: 1945,
    name: '이창희',
    nick: 'Charles',
  },
  { value: 'Henry', label: '헨리', point: 1945, name: '황규영', nick: 'Henry' },
  {
    value: 'James',
    label: '제임스',
    point: 1945,
    name: '오태석',
    nick: 'James',
  },
  { value: 'Roy', label: '로이', point: 1945, name: '김석호', nick: 'Roy' },
  { value: 'April', label: '프릴', point: 1945, name: '김유림', nick: 'April' },
];

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
  inheritAttrs: false,

  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      useItem: null,
      usePlace: '',
      content: '',
      targets: [],
      excludedTargets: ['대표님'],
      amount: '',
      optionList: LIST,
      targetList: USER_LIST,
    };
  },
  created() {
    if (Object.keys(this.$route.params)?.length !== 0) {
      this.date = this.$route.params.date;
      this.useItem = this.$route.params.useItem;
      this.usePlace = this.$route.params.usePlace;
      this.useHistory = this.$route.params.useHistory;
      this.targets = this.$route.params.targets
        ?.map(
          (target) =>
            USER_LIST.filter((user) => user.label === target)[0]?.value
        )
        .flat();
      this.excludedTargets = this.$route.params.excludedTargets
        ? this.$route.params.excludedTargets
        : [];
      this.content = this.$route.params.content
        ? this.$route.params.content
        : '';
      this.amount = Number(this.$route.params.amount.replace('-', ''));
    }
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
    isDeleteButtonView() {
      return Object.keys(this.$route.params)?.length !== 0 ? true : false;
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
        case 'content':
          this.content = value.value;
          return;
        case 'targets':
          this.targets = value.value;
          return;
        case 'excludedTargets':
          this.excludedTargets = value.value;
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
    deletePointHistory() {
      console.log('삭제하기', this.$route.params);
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

.btnWrapper {
  @include flex(space-around);
}

.deleteButton {
  margin-right: 30px;
  background: var(--deepGrey);
}
</style>

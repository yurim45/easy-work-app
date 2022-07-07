<template>
  <basic-header title="포인트 발급" />
  <main>
    <select-view
      label="대상자"
      name="targets"
      mode="tags"
      placeholder="대상 인원을 선택하세요"
      :selectValue="targets"
      :optionList="targetList"
      @handleValue="handleValue($event)"
    />
    <input-view
      type="number"
      label="인당금액"
      name="amount"
      placeholder="인당 포인트를 입력하세요"
      :inputValue="amount"
      @handleValue="handleValue($event)"
    />
  </main>
  <footer class="result">
    <div class="list">
      <span class="itemTitle">발급 총액</span>
      <strong>{{ totalAmount }}P</strong>
    </div>

    <button-view label="발급하기" @onClick="onSubmitIssuancePoints" />
  </footer>
</template>

<script>
import BasicHeader from '@/components/common/header/BasicHeader.vue';
import { ButtonView, InputView, SelectView } from '@/components/common/index';
import { getNumFormat } from '@/util';
import { USER_LIST } from '@/constants/index';

export default {
  name: 'PointsIssuance',
  components: {
    BasicHeader,
    ButtonView,
    SelectView,
    InputView,
  },
  data() {
    return {
      targets: [],
      targetList: USER_LIST,
      amount: '',
    };
  },
  computed: {
    totalAmount() {
      return getNumFormat(this.amount * this.targets.length);
    },
  },
  methods: {
    handleValue(value) {
      switch (value.name) {
        case 'targets':
          this.targets = value.value;
          return;
        case 'amount':
          this.amount = value.value;
          return;
      }
    },
    onSubmitIssuancePoints() {
      console.log(this.targets, this.amount);
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  @include stLayout;
}

.result {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  margin-top: 100px;
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
  margin: 10px 0 30px;
}

.itemTitle {
  @include stLabel;
}

.itemResult {
  margin: 20px 0;
  padding: 30px 0 10px;
  font-size: 18px;
  font-weight: 600;
  border-top: 1px solid var(--line);
}
</style>

<template>
  <basic-header title="사용내역 추가하기" />
  <main>
    <form>
      <date-view
        label="사용일자"
        name="date"
        :inputValue="date"
        @handleValue="handleValue($event)"
      />
      <select-view
        label="구분"
        name="useItem"
        placeholder="카테고리를 선택하세요"
        selectValue="useItem"
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

      <input-view
        label="제외인원"
        name="excludedTargets"
        placeholder="포인트 차감 제외 대상자를 입력하세요"
        :inputValue="excludedTargets"
        @handleValue="handleValue($event)"
      />
      <input-view
        label="사용금액"
        name="amount"
        placeholder="총 사용한 포인트를 입력하세요"
        :inputValue="amount"
        @handleValue="handleValue($event)"
      />

      <button-view label="기록하기" @onClick="onSubmitSendPoints" />
      <multi-select-view label="대상인원" :items="targetList" />
      <div>
        <Multiselect
          v-model="targets"
          :options="targetList"
          :searchable="true"
          :createTag="true"
          placeholder="대상 인원을 선택하세요"
          mode="tags"
        />
      </div>
    </form>
  </main>
</template>

<script>
import BasicHeader from '@/components/common/header/BasicHeader.vue';
import {
  DateView,
  ButtonView,
  InputView,
  SelectView,
} from '@/components/common/index';
import Multiselect from '@vueform/multiselect';

export default {
  name: 'RecordPorinsView',
  components: {
    BasicHeader,
    DateView,
    ButtonView,
    SelectView,
    InputView,
    Multiselect,
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      useItem: '',
      usePlace: '',
      useHistory: '',
      targets: null,
      excludedTargets: '',
      amount: '',
      optionList: [
        { id: 1, value: 1, text: '식대초과' },
        { id: 2, value: 2, text: '식음료' },
        { id: 3, value: 3, text: '문화' },
        { id: 4, value: 4, text: '물품' },
      ],
      targetList: [
        { value: 1, label: '프릴' },
        { value: 2, label: '제임스' },
        { value: 3, label: '위드' },
        { value: 4, label: '주드' },
        { value: 5, label: '워렌' },
      ],
    };
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
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped lang="scss">
main {
  padding: 25px;

  button {
    width: 100%;
  }
}

.multiselect {
}
</style>

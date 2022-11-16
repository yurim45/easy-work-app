<template>
  <modal-view
    v-if="isRejectedOpen"
    :onClcikCancel="onClcikCancel"
    :onClcik="handleReject"
    checkLabel="반려"
  >
    <div class="rejectContent">
      <modal-inner :title="`${item} 반려하시겠습니까?`" />
      <textarea
        name="rejectContent"
        placeholder="반려사유를 입력해주세요"
        @input="(event) => handleValue(event.target.value)"
        :value="rejectContent"
      />
    </div>
  </modal-view>
  <alert-view v-if="isCheckRejectOpen" :onClcik="checkReject">
    <modal-inner
      :title="`${item} 반려하였습니다.`"
      :data="innerCheckData"
      :boxData="rejectContent"
    />
  </alert-view>
</template>

<script>
import { onMounted } from 'vue';
import { ModalView, AlertView, ModalInner } from '@/components/common/index.js';

export default {
  name: 'ModalReject',
  components: {
    ModalView,
    AlertView,
    ModalInner,
  },
  props: {
    item: String,
    isRejectedOpen: Boolean,
    isCheckRejectOpen: Boolean,
    innerCheckData: Array,
    rejectContent: String,
    onClcikCancel: Function,
    handleReject: Function,
    handleValue: Function,
    checkReject: Function,
  },
  setup() {
    onMounted(() => {});
  },
};
</script>

<style lang="scss" scoped>
.rejectContent {
  width: 100%;

  textarea {
    @include stInput;
    height: 98px;
  }
}
</style>

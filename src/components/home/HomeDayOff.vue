<template>
  <section>
    <sub-title subTitle="Day Off" url="/day-off" />
    <ul class="icon">
      <li @click="checkDayoff('HalfOffAM')">
        <img alt="오전반차" src="@/assets/images/day-off/morningAnnual.png" />
      </li>
      <li class="center" @click="checkDayoff('HalfOffPM')">
        <img alt="오후반차" src="@/assets/images/day-off/afternoonAnnual.png" />
      </li>
      <li @click="checkDayoff('FullOff')">
        <img alt="일일연차" src="@/assets/images/day-off/annual.png" />
      </li>
    </ul>
  </section>
  <modal-view
    v-if="isOpen"
    :onClcikCancel="onClcikCancel"
    :onClcik="onSubmitDayOff"
    checkLabel="신청"
    cancelLabel="취소"
    ><modal-inner
      :title="`${dayoffText}를 신청하시겠습니까?`"
      :data="innerData"
    />
  </modal-view>
  <alert-view v-if="isMessageOpen" :onClcik="onClcik">
    <message-inner :message="resMessage" />
  </alert-view>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useMutation } from '@vue/apollo-composable';
import { MUTATION_USE_DAYOFF } from '@/graphql/dayOff.js';
import moment from 'moment';
import {
  SubTitle,
  ModalView,
  ModalInner,
  MessageInner,
  AlertView,
} from '@/components/common/index';
import { _DAYOFF_CODE } from '@/constants';

export default {
  name: 'HomeDayOff',
  components: { SubTitle, ModalView, ModalInner, MessageInner, AlertView },
  setup() {
    const store = useStore();

    const isMessageOpen = ref(false);
    const resMessage = ref(null);
    const isOpen = ref(false);
    const innerData = ref([]);
    const state = ref({
      date: null,
      startDate: null,
      endDate: null,
      dayoff: null,
      dayoffCode: null,
      dateDiff: null,
      content: null,
    });

    const myDayoff = computed(
      () => (store.getters.me.dayoffCnt ?? 0) - state.value.dateDiff
    );
    const dayoffText = computed(() => _DAYOFF_CODE[state.value.dayoffCode]);

    const onClcikCancel = () => {
      isOpen.value = false;
    };

    const checkDayoff = (value) => {
      state.value = {
        date: moment().format('YYYY.MM.DD'),
        startDate: moment().format('YYYY.MM.DD'),
        endDate: moment().format('YYYY.MM.DD'),
        dayoff: 'FullOff',
        dayoffCode: value,
        dateDiff: value === 'FullOff' ? 1 : 0.5,
        content: `개인사유로 ${_DAYOFF_CODE[value]} 사용합니다.`,
      };
      innerData.value = [
        { text: '신청자', value: store.getters.me.nickname },
        { text: '작성일', value: state.value.date },
        { text: '휴가종류', value: '연차' },
        { text: '반차여부', value: dayoffText.value },
        { text: '시작일자', value: state.value.startDate },
        { text: '종료일자', value: state.value.endDate },
        { text: '사용연차', value: `-${state.value.dateDiff}` },
        { text: '사용 후 잔여연차', value: myDayoff.value },
        {
          text: '사유',
          value: `개인사유로 ${_DAYOFF_CODE[value]} 사용합니다.`,
        },
      ];
      isOpen.value = true;
    };

    const { mutate: useDayoff } = useMutation(MUTATION_USE_DAYOFF, () => ({
      variables: {
        startDate: state.value.startDate,
        endDate: state.value.endDate,
        category: state.value.dayoffCode,
        reason: state.value.content,
      },
    }));

    const onSubmitDayOff = () => {
      useDayoff()
        .then(({ data }) => {
          if (data.useDayoff.ok) {
            alert('신청 완료했습니다.');
          }
          if (data.useDayoff.error) {
            resMessage.value = data.giveSpecialDayoff.error;
            isMessageOpen.value = true;
          }
        })
        .catch((e) => {
          console.log(e);
          alert('등록에 실패했습니다.');
        });
      isOpen.value = false;
    };

    const onClcik = () => {
      isMessageOpen.value = false;
    };

    return {
      isOpen,
      state,
      innerData,
      store,
      myDayoff,
      dayoffText,
      onClcik,
      resMessage,
      isMessageOpen,
      checkDayoff,
      onClcikCancel,
      onSubmitDayOff,
    };
  },
};
</script>

<style lang="scss" scoped>
.icon {
  @include flex;
  @include stLayout;

  img {
    width: 100%;
  }
}

.center {
  margin: 0 11px;
}

.footer {
  @include stFooter;
}
</style>

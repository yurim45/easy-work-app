<template>
  <close-header @click="goToPage" />
  <Form :validation-schema="schema" @submit="checkDayOff">
    <main>
      <h2>연차쓰기</h2>
      <select-input
        label="휴가 종류"
        name="dayoff"
        :handleValue="handleValue"
        :data="dayOffList"
        :value="state.dayoff"
        :isDisabled="!!route.query.dayoff || state.dayoff === 'FullOff'"
      />
      <select-input
        label="반차 여부"
        name="dayoffCode"
        :handleValue="handleValue"
        :data="dayOffCode"
        :value="state.dayoffCode"
        :isDisabled="state.dayoff !== 'FullOff'"
      />
      <date-input
        label="시작 일자"
        name="startDate"
        :value="state.startDate"
        @input="handleValue"
        :isBtnView="false"
      />
      <date-input
        :isDisabled="
          state.dayoffCode === 'HalfOffAM' || state.dayoffCode === 'HalfOffPM'
        "
        label="종료 일자"
        name="endDate"
        :value="state.endDate"
        @input="handleValue"
        :isBtnView="false"
      />
      <basic-input
        label="사유"
        placeholder="간략하게 사유를 작성해주세요"
        name="content"
        :value="state.content"
        :handleValue="handleValue"
      />
    </main>
    <submit-footer :buttonLabel="`${text}하기`" type="submit">
      <ul v-if="state.dayoff === 'FullOff'">
        <li class="list">
          <span>보유 연차</span>
          <strong>{{ store.getters.me.dayoffCnt }}일</strong>
        </li>
        <li class="list">
          <span>차감 연차</span>
          <strong class="red">-{{ dateDiff }}일</strong>
        </li>
        <div class="line" />
        <li class="list dayoff">
          <span>잔여 연차</span> <strong>{{ myDayoff }}일</strong>
        </li>
      </ul>
    </submit-footer>
  </Form>
  <alert-view v-if="isOpen" :onClcik="onSubmitDayOff">
    <modal-inner
      :title="`휴가 ${text} 완료했습니다.`"
      :data="innerData"
    /> </alert-view
  ><alert-view v-if="isMessageOpen" :onClcik="onClcik">
    <message-inner :message="resMessage" />
  </alert-view>
  <alert-view v-if="isRejectMessageOpen" :onClcik="onClcik">
    <p class="rejectMessage">{{ rejectMessage }}</p>
  </alert-view>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useMutation, useQuery } from '@vue/apollo-composable';
import {
  MUTATION_USE_DAYOFF,
  MUTATION_UPDATE_DAYOFF,
  QUERY_HOLIDAY_CNT,
  QUERY_DAYOFF_DETAIL,
} from '@/graphql/dayOff.js';
import router from '@/router';
import { useRoute } from 'vue-router';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import {
  CloseHeader,
  SelectInput,
  DateInput,
  BasicInput,
  SubmitFooter,
  AlertView,
  MessageInner,
  ModalInner,
} from '@/components/common/index.js';
import moment from 'moment';
import { DAYOFF_LIST, DAYOFF_CODE, _DAYOFF_CODE } from '@/constants';

export default {
  name: 'ApplyDayOff',
  components: {
    CloseHeader,
    SelectInput,
    DateInput,
    BasicInput,
    SubmitFooter,
    AlertView,
    MessageInner,
    ModalInner,
    Form,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const dayOffList = ref(DAYOFF_LIST);
    const dayOffCode = ref(DAYOFF_CODE);
    const dateDiff = ref(null);
    const isDisabled = ref(false);
    const isMessageOpen = ref(false);
    const resMessage = ref(null);
    const isOpen = ref(false);
    const innerData = ref([]);
    const text = ref('신청');
    const rejectMessage = ref(null);
    const isRejectMessageOpen = ref(false);

    const state = ref({
      dayoff: null,
      dayoffCode: null,
      startDate: null,
      endDate: null,
      content: null,
    });

    const schema = Yup.object().shape({
      // dayoff: Yup.string().required('휴가 종류를 선택해주세요'),
      // content: Yup.string().required('사유를 입력해주세요'),
    });

    const { result, variables } = useQuery(QUERY_HOLIDAY_CNT, {
      startDate: state.value.startDate,
      endDate: state.value.endDate,
    });

    const { result: detailData } = useQuery(QUERY_DAYOFF_DETAIL, {
      id: +route.query.id,
    });

    onMounted(() => {
      if (route.query.id) {
        text.value = '수정';
      }
      if (route.query.dayoff) {
        state.value.dayoff = route.query.dayoff;
      } else {
        dayOffList.value = dayOffList.value.filter(
          (v) => v.value === 'FullOff'
        );
        state.value.dayoff = 'FullOff';
        state.value.dayoffCode = 'FullOff';
      }

      variables.value = {
        startDate: state.value.startDate,
        endDate: state.value.endDate,
      };

      if (detailData.value) {
        handleDetailData();
      }
    });

    watch(detailData, () => {
      handleDetailData();
    });

    watch(result, () => {
      if (
        state.value.dayoffCode === 'HalfOffAM' ||
        state.value.dayoffCode === 'HalfOffPM'
      ) {
        dateDiff.value = 0.5;
      } else {
        dateDiff.value =
          result.value?.getHolidayCnt.dayOffInfos.deductedDayoffCnt ?? 1;
      }
    });

    const myDayoff = computed(() =>
      state.value.dayoff === 'FullOff'
        ? (store.getters.me.dayoffCnt ?? 0) - dateDiff.value
        : store.getters.me.dayoffCnt
    );
    const dayoffText = computed(() => _DAYOFF_CODE[state.value.dayoffCode]);

    const handleDetailData = () => {
      const data = detailData.value.getDayoffDetail.dayoff;
      state.value = {
        dayoff:
          data.category === 'HalfOffPM' || data.category === 'HalfOffAM'
            ? 'FullOff'
            : data.category,
        dayoffCode:
          data.category === 'HalfOffPM' || data.category === 'HalfOffAM'
            ? data.category
            : null,
        startDate: data.startDate.substr(0, 10),
        endDate: data.endDate.substr(0, 10),
        content: data.reason,
      };
    };

    const handleValue = (name, value) => {
      state.value[name] = value;
      if (
        (name === 'startDate' && state.value.dayoffCode === 'HalfOffAM') ||
        state.value.dayoffCode === 'HalfOffPM'
      ) {
        state.value.endDate = state.value.startDate;
      }
      if (name === 'startDate' && state.value.startDate > state.value.endDate) {
        state.value.endDate = state.value.startDate;
      }
      if (name === 'endDate' && state.value.startDate > value) {
        state.value.startDate = value;
      }
      if (value === 'HalfOffAM' || value === 'HalfOffPM') {
        dateDiff.value = 0.5;
        state.value.startDate = state.value.endDate;
      }
      if (value === 'FullOff') {
        dateDiff.value = 1;
      }
      if (name === 'dayoff' && value !== 'FullOff') {
        state.value.dayoffCode = null;
      }

      variables.value = {
        startDate: state.value.startDate,
        endDate: state.value.endDate,
      };
    };

    const checkDayOff = () => {
      const { content, dayoff, endDate, startDate } = state.value;

      if (!content) {
        rejectMessage.value = '사유를 입력하세요';
        isRejectMessageOpen.value = true;
        return;
      }

      if (!dayoff) {
        rejectMessage.value = '휴가종류를 선택하세요';
        isRejectMessageOpen.value = true;
        return;
      }

      innerData.value = [
        { text: '신청자', value: store.getters.me.nickname },
        { text: '작성일', value: moment().format('YYYY.MM.DD') },
        {
          text: '휴가종류',
          value: DAYOFF_LIST.find((item) => item.value === dayoff).name,
        },
        { text: '반차여부', value: dayoffText.value },
        { text: '시작일자', value: moment(startDate).format('YYYY.MM.DD') },
        { text: '종료일자', value: moment(endDate).format('YYYY.MM.DD') },
        { text: '사용연차', value: dateDiff.value },
        { text: '사용 후 잔여연차', value: myDayoff.value },
        { text: '사유', value: content },
      ];

      if (route.query.id) {
        updateDayoff()
          .then(({ data }) => {
            if (data.updateDayoff.ok) {
              isOpen.value = true;
            }
            if (data.updateDayoff.error) {
              isOpen.value = false;
              resMessage.value = data.updateDayoff.error;
              isMessageOpen.value = true;
            }
          })
          .catch((e) => {
            console.log(e);
            alert('등록에 실패했습니다.');
          });
      } else {
        useDayoff()
          .then(({ data }) => {
            if (data.useDayoff.ok) {
              isOpen.value = true;
            }
            if (data.useDayoff.error) {
              resMessage.value = data.useDayoff.error;
              isMessageOpen.value = true;
            }
          })
          .catch((e) => {
            console.log(e);
            alert('등록에 실패했습니다.');
          });
      }
    };

    const { mutate: useDayoff } = useMutation(MUTATION_USE_DAYOFF, () => ({
      variables: {
        startDate: state.value.startDate,
        endDate: state.value.endDate,
        category:
          state.value.dayoffCode === 'HalfOffAM'
            ? 'HalfOffAM'
            : state.value.dayoffCode === 'HalfOffPM'
            ? 'HalfOffPM'
            : state.value.dayoff,
        reason: state.value.content,
      },
    }));

    const { mutate: updateDayoff } = useMutation(
      MUTATION_UPDATE_DAYOFF,
      () => ({
        variables: {
          id: +route.query.id,
          startDate: state.value.startDate,
          endDate: state.value.endDate,
          category:
            state.value.dayoffCode === 'HalfOffAM'
              ? 'HalfOffAM'
              : state.value.dayoffCode === 'HalfOffPM'
              ? 'HalfOffPM'
              : state.value.dayoff,
          reason: state.value.content,
        },
      })
    );

    const onSubmitDayOff = () => {
      isOpen.value = false;
      router.push('/day-off');
      // if (route.query.id) {
      //   updateDayoff()
      //     .then(({ data }) => {
      //       if (data.updateDayoff.ok) {
      //         isOpen.value = false;
      //         router.push('/day-off');
      //       }
      //       if (data.updateDayoff.error) {
      //         isOpen.value = false;
      //         resMessage.value = data.updateDayoff.error;
      //         isMessageOpen.value = true;
      //       }
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //       alert('등록에 실패했습니다.');
      //     });
      // } else {
      //   useDayoff()
      //     .then(({ data }) => {
      //       if (data.useDayoff.ok) {
      //         isOpen.value = true;
      //         router.push('/day-off');
      //       }
      //       if (data.useDayoff.error) {
      //         resMessage.value = data.useDayoff.error;
      //         isMessageOpen.value = true;
      //       }
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //       alert('등록에 실패했습니다.');
      //     });
      // }
    };

    const onClcik = () => {
      isMessageOpen.value = false;
      isRejectMessageOpen.value = false;
      isOpen.value = false;

      if (!rejectMessage.value?.includes('사유')) {
        window.scroll({
          top: 0,
          behavior: 'smooth',
        });
      }
    };

    const goToPage = () => {
      router.push('/day-off');
    };

    return {
      store,
      text,
      route,
      state,
      isOpen,
      innerData,
      isDisabled,
      myDayoff,
      schema,
      dayOffList,
      dayOffCode,
      dateDiff,
      goToPage,
      handleValue,
      onSubmitDayOff,
      checkDayOff,
      onClcik,
      resMessage,
      isMessageOpen,
      rejectMessage,
      isRejectMessageOpen,
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  @include stLayout;
  margin-bottom: 40px;
}

h2 {
  @include stPageTitle;
}

.line {
  width: 100%;
  height: 1px;
  margin: 7px 0 13px;
  background: var(--inputLine);
}

.list {
  @include flex(space-between);
  padding-bottom: 6px;

  span {
    @include body600_14;
  }

  strong {
    @include body600_14;
  }

  .red {
    color: var(--red-txt);
  }
}

.dayoff {
  span {
    @include title700_15;
  }
}

.footer {
  @include stFooter;
}

.rejectMessage {
  @include title700_15;
}
</style>

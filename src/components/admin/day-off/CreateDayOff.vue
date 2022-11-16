<template>
  <close-header @click="goToPage" />
  <Form :validation-schema="schema" @submit="onSubmitCreateDayOff">
    <main>
      <h2>{{ '휴가발급' }}</h2>
      <select-input
        label="휴가 종류"
        name="dayoff"
        :handleValue="handleValue"
        :data="dayOffList"
        :value="state.dayoff"
      />
      <basic-input
        v-if="state.dayoff === 'adjust'"
        type="number"
        label="발급 년도"
        placeholder="발급 년도를 입력하세요. 예) 2023"
        name="year"
        :handleValue="handleValue"
      />
      <ul>
        <day-off-status-list
          v-for="(user, i) in allusers"
          :key="user.id"
          :data="user"
          :i="i"
          :length="allusers?.length"
          type="create"
          :handleValue="handleValue"
        />
      </ul>
    </main>
    <submit-footer type="submit" buttonLabel="발급하기"> </submit-footer>
  </Form>
  <alert-view v-if="isMessageOpen" :onClcik="onClcik">
    <message-inner :message="resMessage" />
  </alert-view>
  <alert-view v-if="isRejectMessageOpen" :onClcik="onClcik">
    <dayoff-inner :data="rejectTarget" />
  </alert-view>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import {
  MUTATION_GIVE_DAYOFF,
  MUTATION_GIVE_DAYOFF_CNT,
  MUTATION_NEWYEAR_DAYOFF,
} from '@/graphql/dayOff';
import { useRoute } from 'vue-router';
import router from '@/router';
import { useStore } from 'vuex';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import {
  CloseHeader,
  SubmitFooter,
  SelectInput,
  BasicInput,
  MessageInner,
  AlertView,
  DayoffInner,
} from '@/components/common/index.js';
import DayOffStatusList from './components/DayOffStatusList.vue';

import { DAYOFF_LIST } from '@/constants';

export default {
  name: 'CreateDayOff',
  components: {
    CloseHeader,
    SelectInput,
    BasicInput,
    SubmitFooter,
    Form,
    AlertView,
    MessageInner,
    DayoffInner,
    DayOffStatusList,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const allusers = ref([]);
    const isAllUser = ref(false);
    const isMessageOpen = ref(false);
    const resMessage = ref(null);
    const rejectMessage = ref(null);
    const isRejectMessageOpen = ref(false);
    const dayOffList = ref(DAYOFF_LIST);
    const rejectTarget = ref([]);

    const state = ref({
      dayoff: 'FullOff',
      users: [],
      year: null,
    });

    const schema = Yup.object().shape({
      // dayoff: Yup.string().required('휴가 종류를 선택해주세요'),
      // period: Yup.number().required('휴가 일수를 입력해주세요'),
      // content: Yup.string().required('발급 사유를 입력해주세요'),
    });

    onMounted(() => {
      allusers.value = store.getters.allusers;

      if (route.query.user) {
        state.value.targets = allusers.value.filter(
          (user) => user.nickname === route.query.user
        );
      } else {
        state.value.targets = allusers.value;
        isAllUser.value = true;
      }
    });

    const handleValue = (name, value, value2) => {
      if (name === 'dayoff') {
        state.value.dayoff = value;
      }
      if (name === 'year') {
        state.value.year = +value;
      }
      if (name === 'period') {
        state.value.users = state.value.users = [
          ...state.value.users?.filter((v) => v.id !== value2.id),
          {
            period: +value,
            id: value2.id,
          },
        ];
      }
    };

    const selectAllUser = (event) => {
      if (event.target.checked) {
        state.value.targets = allusers.value;
      } else {
        state.value.targets = [];
      }
      isAllUser.value = event.target.checked;
    };

    const handelSelect = (event) => {
      if (event.target.checked) {
        state.value.targets = [
          ...state.value.targets,
          allusers.value.find((user) => user.nickname === event.target.value),
        ];
      } else {
        state.value.targets = [...state.value.targets].filter(
          (user) => user.nickname !== event.target.value
        );
      }

      if (state.value.targets?.length === 12) {
        isAllUser.value = true;
      } else {
        isAllUser.value = false;
      }
    };

    const { mutate: giveSpecialDayoff } = useMutation(
      MUTATION_GIVE_DAYOFF,
      () => ({
        variables: {
          users: state.value.users,
          category: state.value.dayoff,
        },
      })
    );

    const { mutate: giveDayoffCnt } = useMutation(
      MUTATION_GIVE_DAYOFF_CNT,
      () => ({
        variables: {
          users: state.value.users,
        },
      })
    );

    const { mutate: adjustNewYear } = useMutation(
      MUTATION_NEWYEAR_DAYOFF,
      () => ({
        variables: {
          users: state.value.users,
          year: state.value.year,
        },
      })
    );

    const onSubmitCreateDayOff = () => {
      const { dayoff, users } = state.value;

      if (!dayoff) {
        resMessage.value = '휴가종류를 선택하세요';
        isMessageOpen.value = true;
        return;
      }

      if (users.length === 0) {
        resMessage.value = '발급 일수를 입력하세요';
        isMessageOpen.value = true;
        return;
      }

      if (dayoff === 'FullOff') {
        giveDayoffCnt()
          .then(({ data }) => {
            if (data.giveDayoffCnt.ok) {
              alert('휴가 발급에 성공했습니다.');
              router.replace({ path: '/admin/day-off', query: { tab: 2 } });
            }
            if (data.giveDayoffCnt.error) {
              resMessage.value = data.giveDayoffCnt.error;
              isMessageOpen.value = true;
            }
          })
          .catch((e) => {
            console.log(e);
            alert('휴가 발급에 실패했습니다.');
          });
      } else if (dayoff === 'adjust') {
        adjustNewYear()
          .then(({ data }) => {
            if (data.adjustNewYearDayoffCnt.ok) {
              alert('휴가 발급에 성공했습니다.');
              router.replace({ path: '/admin/day-off', query: { tab: 2 } });
            }
            if (data.adjustNewYearDayoffCnt.error) {
              resMessage.value = data.adjustNewYearDayoffCnt.error;
              isMessageOpen.value = true;
            }
          })
          .catch((e) => {
            console.log(e);
            alert('휴가 발급에 실패했습니다.');
          });
      } else {
        giveSpecialDayoff()
          .then(({ data }) => {
            if (data.giveSpecialDayoff.ok) {
              if (data.giveSpecialDayoff.failUsers?.length === 0) {
                alert('휴가 발급에 성공했습니다.');
                router.replace({ path: '/admin/day-off', query: { tab: 2 } });
              } else {
                rejectTarget.value = data.giveSpecialDayoff.failUsers;
                isRejectMessageOpen.value = true;
              }
            }
            if (data.giveSpecialDayoff.error) {
              resMessage.value = data.giveSpecialDayoff.error;
              isMessageOpen.value = true;
            }
          })
          .catch((e) => {
            console.log(e);
            alert('휴가 발급에 실패했습니다.');
          });
      }
    };

    const onClcik = () => {
      isMessageOpen.value = false;
      isRejectMessageOpen.value = false;

      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    };

    const goToPage = () => {
      router.go(-1);
    };

    return {
      state,
      schema,
      dayOffList,
      goToPage,
      onSubmitCreateDayOff,
      selectAllUser,
      handleValue,
      isAllUser,
      handelSelect,
      allusers,
      onClcik,
      resMessage,
      isMessageOpen,
      rejectMessage,
      isRejectMessageOpen,
      rejectTarget,
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  @include stLayout;
}

h2 {
  @include stPageTitle;
}

.rejectMessage {
  @include title700_15;
  text-align: center;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  word-break: keep-all;
}
</style>

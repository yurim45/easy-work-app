<template>
  <close-header @click="goToPage" />
  <Form :validation-schema="schema" @submit="onSubmitPoint">
    <main>
      <h2>{{ label }}</h2>
      <date-input
        label="사용일자"
        name="date"
        :value="state.date"
        @input="handleValue"
      />
      <point-category :handleValue="handleValue" :value="state.useItem" />
      <use-place :handleValue="handleValue" :value="state.placeName" />
      <basic-input
        label="사용내역"
        placeholder="사용내역을 입력하세요"
        name="content"
        :handleValue="handleValue"
        :value="state.content"
      />
      <use-user
        :handleValue="handleValue"
        name="targets"
        :value="state.targets"
      />
      <other-users
        :handleValue="handleValue"
        :userList="otherUserInfo"
        :value="state.otherTargets"
      />
      <add-other-user
        :handleValue="handleValue"
        :deleteUser="deleteUser"
        :value="state.nonTargets"
      />
      <basic-input
        type="number"
        label="사용금액"
        placeholder="0원"
        name="totalExpense"
        :handleValue="handleValue"
        :value="state.totalExpense"
      />
    </main>
    <submit-footer :buttonLabel="label" type="submit">
      <ul>
        <li class="list">
          <span>사용포인트</span> <strong>{{ amt }} {{ pointName }}</strong>
        </li>
        <li class="list">
          <span>차감대상</span>
          <div>
            <strong class="red"> {{ totalUsers }}명 </strong>
            <span
              class="red"
              v-if="state.otherTargets?.length + state.nonTargets?.length > 0"
            >
              (외부{{ state.otherTargets?.length + state.nonTargets?.length }}명
              포함)</span
            >
          </div>
        </li>
        <div class="line" />
        <li class="list point">
          <span>인당 차감 포인트</span>
          <strong class="blue">{{ perAmount }} {{ pointName }}</strong>
        </li>
        <li class="list point">
          <span>총 차감 포인트</span>
          <strong>{{ totalAmount }} {{ pointName }}</strong>
        </li>
      </ul>
    </submit-footer>
  </Form>
  <alert-view v-if="isOpen" :onClcik="checkPointInput">
    <modal-inner title="포인트 사용내역을 등록하였습니다." :data="innerData" />
  </alert-view>
  <alert-view v-if="isMessageOpen" :onClcik="onClcik">
    <message-inner :message="resMessage" />
  </alert-view>
  <alert-view v-if="isRejectMessageOpen" :onClcik="onClcik">
    <p class="rejectMessage">{{ rejectMessage }}</p>
  </alert-view>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useMutation, useQuery } from '@vue/apollo-composable';
import {
  MUTATION_ADD_POINT_BILL,
  QUERY_POINT_BILL,
  MUTATION_UPDATE_POINT_BILL,
} from '@/graphql/point.js';
import router from '@/router';
import { useRoute } from 'vue-router';
import { debounce } from 'lodash';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import {
  CloseHeader,
  BasicInput,
  DateInput,
  SubmitFooter,
  AlertView,
  ModalInner,
  MessageInner,
} from '@/components/common/index.js';
import {
  UsePlace,
  PointCategory,
  OtherUsers,
  AddOtherUser,
} from './components/pointInput/index.js';
import UseUser from '@/components/admin/components/UseUser.vue';
import { getNumFormat, removeNumFormat } from '@/util/index.js';
import { ITEM_CODE } from '@/constants/index.js';

export default {
  name: 'PointInput',
  components: {
    Form,
    CloseHeader,
    BasicInput,
    DateInput,
    UsePlace,
    PointCategory,
    UseUser,
    OtherUsers,
    SubmitFooter,
    AddOtherUser,
    AlertView,
    ModalInner,
    MessageInner,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const isMessageOpen = ref(false);
    const resMessage = ref(null);
    const isOpen = ref(false);
    const innerData = ref([]);
    const label = ref('기록하기');
    const rejectMessage = ref(null);
    const isRejectMessageOpen = ref(false);
    const otherUserInfo = ref([]);
    const updateId = ref(null);

    const state = ref({
      date: '',
      useItem: 'ExceedMeal',
      placeName: '',
      content: '',
      targets: [],
      otherTargets: [],
      nonTargets: [],
      totalExpense: '',
      writer: store.getters.me.nickname,
    });

    const schema = Yup.object().shape({
      // placeName: Yup.string().required('사용처를 입력해주세요'),
      // content: Yup.string().required('사용 내역을 입력해주세요'),
      // totalExpense: Yup.string().required('사용 포인트를 입력해주세요'),
    });

    const { result, refetch } = useQuery(QUERY_POINT_BILL, {
      id: +route?.query.id,
    });

    onMounted(() => {
      refetch();
      state.value.targets = store.getters.allusers;
      otherUserInfo.value = store.getters.OtherUsers;

      if (result.value) {
        handleState();
      }

      if (route.query.id) {
        label.value = '수정하기';
      }
    });

    watch(result, () => {
      handleState();
    });

    const handleState = () => {
      state.value = {
        ...result.value?.pointBill.point,
        date: result.value?.pointBill.point?.date?.substring(0, 10),
        placeName: result.value?.pointBill.point?.usePlace?.name,
        targets: result.value?.pointBill.point?.targets,
        otherTargets: result.value?.pointBill.point?.nonTargets,
        nonTargets: result.value?.pointBill.point?.guests?.map((v) => {
          return { nickname: v.nickname };
        }),
        totalExpense: Math.abs(result.value?.pointBill.point?.totalExpense),
        writer: result.value?.pointBill.point?.writer.nickname,
      };
    };

    const pointName = computed(() =>
      route.query.type === 'atp' ? 'ATP' : 'SP'
    );
    const amt = computed(() => getNumFormat(state.value.totalExpense));
    const totalUsers = computed(
      () =>
        state.value.targets?.length +
        (state.value.otherTargets?.length ?? 0) +
        (state.value.nonTargets?.length ?? 0)
    );

    const perAmount = computed(() => {
      if (state.value.totalExpense && state.value.targets?.length) {
        // if (state.value.useItem === 'ExceedMeal') {
        //   return getNumFormat(
        //     (state.value.totalExpense - totalUsers?.value * 10000 ?? 0) /
        //       totalUsers.value
        //   );
        // } else {
        return getNumFormat(state.value.totalExpense / totalUsers?.value);
        // }
      }
      return 0;
    });

    const totalAmount = computed(() => {
      return getNumFormat(
        state.value.targets?.length * removeNumFormat(perAmount.value) ?? 0
      );
    });

    const handleValue = debounce(
      (name, value) => {
        if (name === 'totalExpense') {
          state.value[name] = +value;
        } else {
          state.value[name] = value;
        }
      },
      [300]
    );

    const deleteUser = (user) => {
      state.value.nonTargets = state.value.nonTargets.filter(
        (item) => item !== user
      );
    };

    const goToPage = () => {
      router.go(-1);
    };

    const { mutate: postPoint } = useMutation(MUTATION_ADD_POINT_BILL, () => ({
      variables: {
        date: state.value.date,
        useItem: state.value.useItem,
        placeName: state.value.placeName,
        content: state.value.content,
        targets: state.value.targets.map((user) => +user.id),
        nonTargets: state.value.otherTargets.map((user) => +user.id),
        guests: state.value.nonTargets,
        totalExpense: removeNumFormat(state.value.totalExpense),
      },
    }));

    const { mutate: updatePoint } = useMutation(
      MUTATION_UPDATE_POINT_BILL,
      () => ({
        variables: {
          id: state.value.id,
          date: state.value.date,
          useItem: state.value.useItem,
          placeName: state.value.placeName,
          content: state.value.content,
          targets: state.value.targets.map((user) => +user.id),
          nonTargets: state.value.otherTargets.map((user) => +user.id),
          guests: state.value.nonTargets,
          totalExpense: removeNumFormat(state.value.totalExpense),
        },
      })
    );

    const handleInnerData = () => {
      const {
        date,
        useItem,
        placeName,
        content,
        otherTargets,
        nonTargets,
        writer,
      } = state.value;

      innerData.value = [
        { text: '작성자', value: writer },
        { text: '작성일자', value: date },
        { text: '사용일자', value: date },
        { text: '카테고리', value: ITEM_CODE[useItem] },
        { text: '사용처', value: placeName },
        { text: '사용내역', value: content },
        {
          text: '사용인원',
          value: `${totalUsers.value}명(외부${
            otherTargets?.length + nonTargets?.length
          }명 포함)`,
        },
        { text: '사용포인트', value: `${amt.value} ATP` },
        { text: '인당 차감 포인트', value: `${perAmount.value} ATP` },
      ];
    };

    const onSubmitPoint = () => {
      const { placeName, content, targets, totalExpense } = state.value;

      if (!placeName) {
        rejectMessage.value = '사용처를 입력하세요';
        isRejectMessageOpen.value = true;
        return;
      }

      if (!content) {
        rejectMessage.value = '사용내역를 입력하세요';
        isRejectMessageOpen.value = true;
        return;
      }

      if (!targets?.length) {
        rejectMessage.value = '대상자를 입력하세요';
        isRejectMessageOpen.value = true;
        return;
      }

      if (!totalExpense) {
        rejectMessage.value = '사용금액을 입력하세요';
        isRejectMessageOpen.value = true;
        return;
      }

      if (route?.query.id) {
        updatePoint()
          .then(({ data }) => {
            if (data.updatePointBill.ok) {
              isOpen.value = true;
              handleInnerData();
              updateId.value = data.updatePointBill.id;
            } else {
              if (data.updatePointBill.error) {
                resMessage.value = data.updatePointBill.error;
                isMessageOpen.value = true;
              }
            }
          })
          .catch((e) => {
            console.log(e);
            alert('등록에 실패했습니다.');
          });
      } else {
        postPoint()
          .then(({ data }) => {
            if (data.addPointBill.ok) {
              isOpen.value = true;
              handleInnerData();
            }
            if (data.addPointBill.error) {
              resMessage.value = data.addPointBill.error;
              isMessageOpen.value = true;
            }
          })
          .catch((e) => {
            console.log(e);
            alert('등록에 실패했습니다.');
          });
      }
    };

    const onClcik = () => {
      isMessageOpen.value = false;
      isRejectMessageOpen.value = false;

      if (!rejectMessage.value?.includes('사용금액')) {
        window.scroll({
          top: 0,
          behavior: 'smooth',
        });
      }
    };

    const checkPointInput = () => {
      isOpen.value = false;
      if (updateId.value) {
        if (route.query.isAdmin === 'true') {
          router.replace('/admin/point/detail');
        } else {
          router.replace('/point');
        }
      } else {
        router.go(-1);
      }
    };

    return {
      label,
      isOpen,
      innerData,
      state,
      schema,
      handleValue,
      otherUserInfo,
      goToPage,
      amt,
      pointName,
      perAmount,
      totalAmount,
      onSubmitPoint,
      checkPointInput,
      deleteUser,
      totalUsers,
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

.point {
  span {
    @include title700_15;
  }

  .blue {
    color: var(--blue-txt);
  }
}

.rejectMessage {
  @include title700_15;
}
</style>

<template>
  <close-header @click="goToPage" />
  <Form :validation-schema="schema" @submit="checkPoint">
    <main>
      <h2>{{ '발급하기' }}</h2>
      <basic-input
        label="발급자"
        name="writer"
        :value="state.writer"
        :handleValue="handleValue"
        :isDisabled="true"
      />
      <date-input
        label="발급일"
        name="date"
        :value="state.date"
        @input="handleValue"
        :isDisabled="true"
        :isBtnView="false"
      />
      <use-user :handleValue="handleValue" name="targets" />
      <basic-input
        type="number"
        label="인원별 발급 포인트"
        :placeholder="`0 ${pointName}`"
        name="point"
        :handleValue="handleValue"
      />
      <basic-input
        label="발급 사유"
        placeholder="발급사유를 입력해주세요"
        name="content"
        :handleValue="handleValue"
      />
    </main>
    <submit-footer type="submit" buttonLabel="발급하기">
      <ul>
        <li class="list point">
          <span>인원별 발급 포인트</span>
          <strong class="blue">{{ perAmount }} {{ pointName }}</strong>
        </li>
        <li class="list point">
          <span>총 발급 포인트</span>
          <strong>{{ totalAmount }} {{ pointName }}</strong>
        </li>
      </ul>
    </submit-footer>
  </Form>
  <modal-view
    v-if="isOpen"
    :onClcikCancel="onClcikCancel"
    :onClcik="onSubmitPoint"
    checkLabel="발급"
  >
    <modal-inner title="포인트를 발급하시겠습니까?" :data="innerData" />
  </modal-view>
  <alert-view v-if="isMessageOpen" :onClcik="onClcik">
    <message-inner :message="resMessage" />
  </alert-view>
  <alert-view v-if="isRejectMessageOpen" :onClcik="onClcik">
    <p class="rejectMessage">{{ rejectMessage }}</p>
  </alert-view>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useMutation } from '@vue/apollo-composable';
import { MUTATION_CREATE_POINTS } from '@/graphql/point';
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
  ModalView,
  ModalInner,
  MessageInner,
  AlertView,
} from '@/components/common/index.js';
import UseUser from '@/components/admin/components/UseUser.vue';
import { getNumFormat } from '@/util/index.js';

export default {
  name: 'CreatePoint',
  components: {
    CloseHeader,
    BasicInput,
    DateInput,
    UseUser,
    SubmitFooter,
    ModalView,
    ModalInner,
    Form,
    MessageInner,
    AlertView,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const userInfo = ref([]);
    const innerData = ref([]);
    const isMessageOpen = ref(false);
    const resMessage = ref(null);
    const isOpen = ref(false);
    const rejectMessage = ref(null);
    const isRejectMessageOpen = ref(false);

    const state = ref({
      date: null,
      content: null,
      targets: [],
      point: null,
      writer: store.getters.me.nickname,
    });

    const schema = Yup.object().shape({
      // point: Yup.string().required('발급 포인트를 입력해주세요'),
      // content: Yup.string().required('발급 사유를 입력해주세요'),
    });

    onMounted(() => {
      userInfo.value = store.getters.allusers;

      if (route.query.user) {
        state.value.targets = userInfo.value.filter(
          (user) => user.nickname === route.query.user
        );
      } else {
        state.value.targets = userInfo.value;
      }
    });

    const pointName = computed(() =>
      route.query.type === 'sp' ? 'SP' : 'ATP'
    );
    const perAmount = computed(() => getNumFormat(state.value.point));
    const totalAmount = computed(() => {
      return getNumFormat(state.value.point * state.value.targets?.length);
    });

    const handleValue = debounce(
      (name, value) => {
        if (name === 'point') {
          state.value[name] = +value;
        } else {
          state.value[name] = value;
        }
      },
      [200]
    );

    const deleteUser = (user) => {
      state.value.addOtherTargets = state.value.addOtherTargets.filter(
        (item) => item !== user
      );
    };

    const goToPage = () => {
      router.go(-1);
    };

    const checkPoint = () => {
      const { content, targets, point } = state.value;

      if (!targets?.length) {
        rejectMessage.value = '대상자를 입력하세요';
        isRejectMessageOpen.value = true;
        return;
      }

      if (!point) {
        rejectMessage.value = '발급 포인트를 입력하세요';
        isRejectMessageOpen.value = true;
        return;
      }

      if (!content) {
        rejectMessage.value = '발급사유를 입력하세요';
        isRejectMessageOpen.value = true;
        return;
      }

      innerData.value = [
        { text: '신청자', value: state.value.writer },
        { text: '작성일', value: state.value.date },
        {
          text: '대상자',
          value: state.value.targets.map((user) => user.nickname).join(', '),
        },
        {
          text: '인원별 포인트',
          value: `${perAmount.value} ${pointName.value}`,
        },
        {
          text: '총 발급포인트',
          value: `${totalAmount.value} ${pointName.value}`,
        },
      ];
      isOpen.value = true;
    };

    const { mutate: createPoints } = useMutation(
      MUTATION_CREATE_POINTS,
      () => ({
        variables: {
          date: state.value.date,
          content: state.value.content,
          eachExpense: state.value.point,
          targets: state.value.targets.map((user) => user.id),
        },
      })
    );

    const onSubmitPoint = () => {
      if (route.query.type === 'atp') {
        createPoints()
          .then(({ data }) => {
            if (data.createPoints.ok) {
              alert('발급 완료했습니다.');
              isOpen.value = false;
              router.replace('/admin/point');
            }
            if (data.createPoints.error) {
              resMessage.value = data.createPoints.error;
              isMessageOpen.value = true;
            }
          })
          .catch((e) => {
            console.log(e);
            alert('등록에 실패했습니다.');
          });
        isOpen.value = false;
      }
    };

    const onClcikCancel = () => {
      isOpen.value = false;
    };

    const onClcik = () => {
      isMessageOpen.value = false;
      isRejectMessageOpen.value = false;

      if (rejectMessage.value.includes('대상자')) {
        window.scroll({
          top: 0,
          behavior: 'smooth',
        });
      }
    };

    return {
      state,
      innerData,
      schema,
      userInfo,
      handleValue,
      goToPage,
      totalAmount,
      onSubmitPoint,
      onClcikCancel,
      checkPoint,
      deleteUser,
      pointName,
      perAmount,
      isOpen,
      onClcik,
      isMessageOpen,
      resMessage,
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
  background: var(--line);
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

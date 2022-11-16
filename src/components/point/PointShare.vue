<template>
  <close-header @click="goToPage" />
  <Form :validation-schema="schema" @submit="checkPointShare">
    <main>
      <section class="cardsection"><card-summary :body="state" /></section>
      <line-view />
      <section class="writecontent">
        <select-input
          label="받을사람"
          name="to"
          :handleValue="handleValue"
          :data="users"
        />
        <basic-input
          type="number"
          label="보낼 포인트"
          placeholder="0  ATNP"
          name="point"
          :handleValue="handleValue"
        />
        <p class="mypoint">현재 포인트: {{ myPoint }}</p>
        <div class="length">{{ state.content?.length ?? 0 }}/50</div>
        <textarea-input
          label="첨부 메세지"
          name="content"
          :handleValue="handleValue"
          :value="state.content"
        />
      </section>
    </main>
    <footer>
      <submit-button :label="label" type="submit" />
    </footer>
  </Form>
  <modal-view
    v-if="isOpen"
    :onClcikCancel="onClcikCancel"
    :onClcik="onSubmitPointShare"
    checkLabel="보내기"
  >
    <modal-inner title="동료에게 포인트를 보내시겠습니까?" :data="innerData" />
  </modal-view>
  <send-point v-if="isAlramOn" :onclick="checkAlram" :body="state" />
  <alert-view v-if="isMessageOpen" :onClcik="onClcik">
    <message-inner :message="resMessage" />
  </alert-view>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { MUTATION_SEND_POINTS } from '@/graphql/point.js';
import { useStore } from 'vuex';
import router from '@/router';
import { debounce } from 'lodash';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import { CardSummary } from './components/pointShare/index.js';
import {
  CloseHeader,
  BasicInput,
  SelectInput,
  SubmitButton,
  LineView,
  ModalView,
  ModalInner,
  AlertView,
  MessageInner,
  TextareaInput,
} from '@/components/common/index.js';
import { SendPoint } from '@/components/point/components/index.js';
import { getNumFormat } from '@/util/index.js';

export default {
  name: 'PointShare',
  components: {
    CloseHeader,
    Form,
    CardSummary,
    BasicInput,
    SelectInput,
    SubmitButton,
    LineView,
    ModalView,
    ModalInner,
    SendPoint,
    AlertView,
    MessageInner,
    TextareaInput,
  },
  setup() {
    const store = useStore();

    const isOpen = ref(false);
    const isAlramOn = ref(false);
    const users = ref([]);
    const innerData = ref([]);
    const state = ref({
      to: null,
      point: null,
      content: null,
      from: store.getters.me.nickname,
    });
    const isMessageOpen = ref(false);
    const resMessage = ref(null);

    const schema = Yup.object().shape({
      to: Yup.string().required('받을 사람을 선택하세요'),
    });

    const label = computed(() => `${sendPoint.value} ATP 보내기`);
    const myPoint = computed(() => getNumFormat(store.getters.me.point));
    const sendPoint = computed(() => getNumFormat(state.value.point));

    onMounted(() => {
      users.value = store.getters.allusers.map((v) => {
        return { id: v.id, value: v.nickname, name: v.nickname };
      });
    });

    const handleValue = debounce(
      (name, value) => {
        state.value[name] = value;
        if (state.value.content?.length >= 50) {
          state.value.content === state.value.content.substr(0, 49);
        }
      },
      [300]
    );

    const goToPage = () => {
      router.push('/point');
    };

    const checkPointShare = () => {
      // if (state.value.point > myPoint.value) {
      //   resMessage.value = '현재 보유 포인트보다 작게 입력하세요';
      //   isMessageOpen.value = true;
      //   return;
      // }

      const { point, content, to } = state.value;
      if (!point) {
        alert('보낼 포인트를 입력해주세요');
        return;
      }
      if (!content) {
        alert('메세지를 입력해주세요');
        return;
      }
      innerData.value = [
        { text: '받을사람', value: to },
        { text: '보낼 포인트', value: sendPoint.value },
      ];
      isOpen.value = true;
    };

    const { mutate: sendPoints } = useMutation(MUTATION_SEND_POINTS, () => ({
      variables: {
        toUserId: store.getters.allusers.find(
          (user) => user.nickname === state.value.to
        ).id,
        amount: +state.value.point,
        message: state.value.content,
      },
    }));

    const onSubmitPointShare = () => {
      sendPoints()
        .then(({ data }) => {
          if (data.sendPoints.ok) {
            isOpen.value = false;
            isAlramOn.value = true;
          }
          if (data.sendPoints.error) {
            resMessage.value = data.sendPoints.error;
            isMessageOpen.value = true;
          }
        })
        .catch((e) => {
          console.log(e);
          alert('등록에 실패했습니다.');
        });
    };

    const onClcikCancel = () => {
      isOpen.value = false;
    };

    const checkAlram = () => {
      isAlramOn.value = false;
      router.push('/point');
    };

    const onClcik = () => {
      isMessageOpen.value = false;
    };

    return {
      myPoint,
      isAlramOn,
      isOpen,
      schema,
      users,
      sendPoint,
      state,
      innerData,
      label,
      handleValue,
      goToPage,
      onClcikCancel,
      onSubmitPointShare,
      checkPointShare,
      checkAlram,
      onClcik,
      resMessage,
      isMessageOpen,
    };
  },
};
</script>

<style lang="scss" scoped>
.cardsection {
  @include stLayout;
}

.writecontent {
  padding: 30px 30px 40px;
}

.mypoint {
  margin: -22px 0 10px;
  color: var(--gray555);
  @include body400_13;
}

.length {
  position: relative;
  top: 125px;
  right: 15px;
  color: var(--gray555);
  @include body400_13;
  text-align: right;
}

footer {
  @include stLayout;
  margin-bottom: 40px;
}
</style>

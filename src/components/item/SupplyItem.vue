<template>
  <close-header @click="goToPage" />
  <Form :validation-schema="schema" @submit="onSubmitSupply">
    <section>
      <h2>구매 요청</h2>
      <basic-input
        label="제목"
        placeholder="제목을 입력해주세요."
        name="title"
        :handleValue="handleValue"
        :value="state.title"
      />
      <item-category :handleValue="handleValue" :value="state.category" />
      <textarea-input
        label="내용"
        name="contents"
        :handleValue="handleValue"
        :value="state.contents"
      />
    </section>
    <line-view />
    <div class="iteminput"><h3>물품 정보입력</h3></div>
    <item-info
      v-for="(item, i) in state.items"
      :key="item.id"
      :handleItem="handleItem"
      :deleteItem="deleteItem"
      :name="`items${item.id}`"
      :id="item.id ?? 1"
      :label="i === 0 ? '물품 정보' : `물품 정보${item.id}`"
      :value="item"
    />
    <section class="add">
      <basic-button label="물품 추가" @onClick="addItem" />
    </section>
    <submit-footer type="submit" buttonLabel="요청하기">
      <ul>
        <li class="list">
          <span>항목 갯수</span>
          <strong>{{ state.items?.length }} 개 항목</strong>
        </li>
        <li class="list">
          <span>전체 수량</span> <strong>{{ totalCnt }} 개</strong>
        </li>
        <div class="footerline" />
        <li class="list">
          <span class="itemtext">최종 금액</span>
          <strong class="itemtext">{{ totalAmt }} 원</strong>
        </li>
      </ul>
    </submit-footer>
  </Form>
  <alert-view v-if="isOpen" :onClcik="onSubmitCheck">
    <modal-inner
      title="필요한 물품을 성공적으로 요청하였습니다."
      :data="innerData"
    />
  </alert-view>
  <alert-view v-if="isMessageOpen" :onClcik="onClcik">
    <message-inner :message="resMessage" />
  </alert-view>
  <alert-view v-if="isRejectMessageOpen" :onClcik="onClcik">
    <p class="rejectMessage">{{ rejectMessage }}</p>
  </alert-view>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { useMutation, useQuery } from '@vue/apollo-composable';
import {
  MUTATION_REQ_PURCHASE,
  MUTATION_UPDATE_PURCHASE,
  QUERY_PURCHASE_DETAIL,
} from '@/graphql/supply';
import { debounce } from 'lodash';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import {
  CloseHeader,
  BasicInput,
  BasicButton,
  SubmitFooter,
  LineView,
  AlertView,
  ModalInner,
  MessageInner,
  TextareaInput,
} from '@/components/common/index.js';
import { ItemCategory, ItemInfo } from './itemInput/index.js';
import { SUPPLY_CODE } from '@/constants/index.js';
import { getNumFormat } from '@/util/index.js';

export default {
  name: 'SupplyItem',
  components: {
    CloseHeader,
    BasicInput,
    BasicButton,
    SubmitFooter,
    Form,
    LineView,
    ItemCategory,
    ItemInfo,
    AlertView,
    ModalInner,
    MessageInner,
    TextareaInput,
  },
  setup() {
    const route = useRoute();

    const innerData = ref([]);
    const isMessageOpen = ref(false);
    const resMessage = ref(null);
    const isOpen = ref(false);
    const totalCnt = ref(0);
    const totalAmt = ref(0);
    const state = ref({
      title: '',
      category: 'Snacks',
      contents: '',
      items: [{ id: 1 }],
    });
    const rejectMessage = ref(null);
    const isRejectMessageOpen = ref(false);

    const schema = Yup.object().shape({
      // title: Yup.string().required('제목을 입력해주세요'),
      // contents: Yup.string().required('내용을 입력해주세요'),
    });

    const { result } = useQuery(QUERY_PURCHASE_DETAIL, {
      id: +route.query.id,
    });

    onMounted(() => {
      if (result.value) {
        handleFetchData();
      }
    });

    watch(result, () => {
      handleFetchData();
    });

    const handleFetchData = () => {
      state.value = {
        title: result.value.getPurchaseDetail.purchaseDetail.title,
        category: result.value.getPurchaseDetail.purchaseDetail.category,
        contents: result.value.getPurchaseDetail.purchaseDetail.contents,
        items: result.value?.getPurchaseDetail.purchaseDetail.items.map(
          (v, i) => {
            return {
              id: i + 1,
              [`name${i + 1}`]: v.name,
              [`eachPrice${i + 1}`]: v.eachPrice,
              [`quantity${i + 1}`]: v.quantity,
              [`itemUrl${i + 1}`]: v.itemUrl,
            };
          }
        ),
      };
    };

    const handleValue = debounce(
      (name, value) => {
        state.value[name] = value;
      },
      [300]
    );

    const addItem = () => {
      if (
        !state.value.items[state.value.items?.length - 1][
          `name${state.value.items[state.value.items?.length - 1].id}`
        ]
      ) {
        rejectMessage.value = '물품정보를 모두 입력해주세요';
        isRejectMessageOpen.value = true;
        return;
      }

      state.value.items = [
        ...state.value.items,
        { id: +state.value.items[state.value.items?.length - 1].id + 1 },
      ];
    };

    const deleteItem = (id) => {
      state.value.items = state.value.items.filter((item) => item.id !== id);
    };

    const handleItem = (data) => {
      const newData = {
        ...state.value.items.find((v) => v.id === data.id),
        ...data,
      };

      if (data.id === 1) {
        state.value.items = [newData];
      } else {
        state.value.items = [
          ...state.value.items.filter((v) => v.id !== data.id),
          newData,
        ];
      }

      totalCnt.value = getNumFormat(
        state.value.items
          ?.map((v) => +v[`quantity${v.id}`])
          .reduce((prev, curr) => prev + curr, 0)
      );

      totalAmt.value = getNumFormat(
        state.value.items
          ?.map((v) => +v[`quantity${v.id}`] * +v[`eachPrice${v.id}`])
          .reduce((prev, curr) => prev + curr, 0)
      );
    };

    const { mutate: reqPurchase } = useMutation(MUTATION_REQ_PURCHASE, () => ({
      variables: {
        title: state.value.title,
        category: state.value.category,
        contents: state.value.contents,
        items: state.value.items,
      },
    }));

    const { mutate: updatePurchase } = useMutation(
      MUTATION_UPDATE_PURCHASE,
      () => ({
        variables: {
          id: +route.query.id,
          title: state.value.title,
          category: state.value.category,
          contents: state.value.contents,
          items: state.value.items,
        },
      })
    );

    const onSubmitSupply = () => {
      state.value.items = state.value.items?.map((item) => {
        return {
          name: item[`name${item.id}`],
          eachPrice: +item[`eachPrice${item.id}`],
          quantity: +item[`quantity${item.id}`],
          totalPrice: +item[`totalPrice${item.id}`],
          itemUrl: item[`itemUrl${item.id}`],
        };
      });

      if (
        state.value.items.length > 1 &&
        !state.value.items[state.value.items.length - 1].name
      ) {
        state.value.items = state.value.items.filter((v) => v.name);
      }

      innerData.value = [
        { text: '카테고리', value: SUPPLY_CODE[state.value.category] },
        {
          text: '물품명',
          value:
            state.value.items?.length === 1
              ? state.value.items[0].name
              : `${state.value.items[0].name} 외 ${
                  state.value.items?.length - 1
                } 개`,
        },
        {
          text: '최종 금액',
          value: totalAmt.value,
        },
      ];

      if (!state.value.title) {
        rejectMessage.value = '제목을 입력해주세요';
        isRejectMessageOpen.value = true;
        return;
      }

      if (!state.value.title) {
        rejectMessage.value = '내용을 입력해주세요';
        isRejectMessageOpen.value = true;
        return;
      }

      if (!state.value.items[0].name) {
        rejectMessage.value = '물품정보를 입력해주세요';
        isRejectMessageOpen.value = true;
        return;
      }

      if (route.query.id) {
        updatePurchase()
          .then(({ data }) => {
            if (data.updatePurchase.ok) {
              isOpen.value = true;
            }
            if (data.updatePurchase.error) {
              resMessage.value = data.updatePurchase.error;
              isMessageOpen.value = true;
            }
          })
          .catch((e) => {
            console.log(e);
            alert('요청 실패했습니다.');
          });
      } else {
        reqPurchase()
          .then(({ data }) => {
            if (data.reqPurchase.ok) {
              isOpen.value = true;
            }
            if (data.reqPurchase.error) {
              resMessage.value = data.reqPurchase.error;
              isMessageOpen.value = true;
            }
          })
          .catch((e) => {
            console.log(e);
            rejectMessage.value = '요청 실패했습니다';
            isRejectMessageOpen.value = true;
          });
      }
    };

    const onClcik = () => {
      isMessageOpen.value = false;
      isRejectMessageOpen.value = false;

      if (!rejectMessage.value?.includes('물품정보')) {
        window.scroll({
          top: 0,
          behavior: 'smooth',
        });
      }
    };

    const onSubmitCheck = () => {
      isOpen.value = false;
      router.push('/item');
    };

    const onClcikCancel = () => {
      isOpen.value = false;
    };

    const goToPage = () => {
      router.go(-1);
    };

    return {
      state,
      totalCnt,
      totalAmt,
      schema,
      handleValue,
      innerData,
      isOpen,
      onClcik,
      resMessage,
      isMessageOpen,
      goToPage,
      addItem,
      deleteItem,
      handleItem,
      onSubmitSupply,
      onClcikCancel,
      onSubmitCheck,
      rejectMessage,
      isRejectMessageOpen,
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  @include stLayout;
  margin-bottom: 40px;
}

.iteminput {
  @include stLayout;
}

h2 {
  @include stPageTitle;
}

h3 {
  margin: 34px 0 20px;
  @include title800_20;
}

label {
  display: block;
  margin-bottom: 13px;
  @include stLabel;
}

textarea {
  margin-bottom: 30px;
  @include stInput;
  height: 98px;
}

.footer {
  @include stFooter;
}

.itemtext {
  @include title700_15;
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

  .itemtext {
    @include title700_15;
  }
}

.footerline {
  width: 100%;
  height: 1px;
  margin: 7px 0 13px;
  background: var(--inputLine);
}

.add {
  @include stLayout;

  button {
    height: 46px !important;
  }
}

.rejectMessage {
  @include title700_15;
}
</style>

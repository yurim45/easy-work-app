<template>
  <back-header
    :text="
      store.getters.me.nickname === itemData?.writer?.nickname &&
      itemData?.purchaseStatus === 'Pending'
        ? '수정'
        : ''
    "
    :onClick="goToPage"
    :onClickText="goToSupplyItem"
    :onClickDeleteText="onClickDeleteText"
    :hasDelete="store.getters.me.role !== 'User'"
    :deleteText="
      store.getters.me.nickname === itemData?.writer?.nickname &&
      itemData?.purchaseStatus === 'Pending'
        ? '취소'
        : ''
    "
  />
  <main>
    <div class="title">
      <h2>
        {{ itemData?.title }}
        <icon-hold v-if="itemData?.purchaseStatus === 'Pending'" />
        <icon-approved v-if="itemData?.purchaseStatus === 'Approved'" />
        <icon-rejected v-if="itemData?.purchaseStatus === 'Rejected'" />
        <icon-complete v-if="itemData?.purchaseStatus === 'Complete'" />
      </h2>
      <p>
        {{ getFormat(itemData?.category) }}
      </p>
      <div class="writerinfo">
        <div class="profileimg">
          <profile-image :name="itemData?.writer?.nickname" url="" />
        </div>
        <span class="writer">{{ itemData?.writer?.nickname }}</span>
        <icon-separator />
        <span class="time">{{ getDateFormatFull(itemData?.updatedAt) }}</span>
      </div>
    </div>
    <div class="item" v-if="itemData?.rejectReason">
      <p>반려사유</p>
      <div>{{ itemData?.rejectReason }}</div>
    </div>
    <div class="item">
      <p>내용</p>
      <div>
        {{ itemData?.contents }}
      </div>
      <p>전체 금액</p>
      <strong>{{ getNumberFormat(itemData?.finalPrice) }} </strong
      ><span>원</span>
    </div>
    <item-card v-for="(item, i) in itemData?.items" :key="i" :data="item" />
  </main>
  <footer v-if="isAdmin && itemData?.purchaseStatus === 'Pending'">
    <button type="button" @click="onClcikReject" class="reject">
      반려하기
    </button>
    <button type="button" @click="handleApprove">승인하기</button>
  </footer>
  <footer v-if="isAdmin && itemData?.purchaseStatus === 'Approved'">
    <button type="button" @click="handleComplete">구매완료</button>
  </footer>
  <modal-view
    v-if="isOpen"
    :onClcikCancel="onClcikCancel"
    :onClcik="onSubmitDelete"
    checkLabel="물품취소"
  >
    <modal-inner title="물품 요청을 취소하시겠습니까?" :data="innerData" />
  </modal-view>
  <alert-view v-if="isApprovedOpen" :onClcik="checkApproved">
    <modal-inner
      title="요청한 물품을 성공적으로 승인하였습니다."
      :data="innerCheckData"
    />
  </alert-view>
  <modal-reject
    item="요청한 물품을"
    :isRejectedOpen="isRejectedOpen"
    :isCheckRejectOpen="isCheckRejectOpen"
    :rejectContent="rejectContent"
    :innerCheckData="innerCheckData"
    :handleValue="handleValue"
    :onClcikCancel="onClcikCancel"
    :handleReject="handleReject"
    :checkReject="checkReject"
  />
  <alert-view v-if="isMessageOpen" :onClcik="onClcik">
    <message-inner :message="resMessage" />
  </alert-view>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import router from '@/router';
import { useQuery, useMutation } from '@vue/apollo-composable';
import {
  QUERY_PURCHASE_DETAIL,
  MUTATION_CANCEL_PURCHASE,
  MUTATION_AUDIT_PURCHASE,
} from '@/graphql/supply';
import { debounce } from 'lodash';
import {
  BackHeader,
  ModalView,
  AlertView,
  ModalInner,
  ProfileImage,
  MessageInner,
  ModalReject,
} from '@/components/common/index.js';
import {
  IconSeparator,
  IconHold,
  IconApproved,
  IconComplete,
  IconRejected,
} from '@/components/common/icons/index.js';
import { ItemCard } from './components/index.js';
import { dateFormatFull, getNumFormat, dateFormat } from '@/util';
import { SUPPLY_CODE } from '@/constants';

export default {
  name: 'SupplyDetail',
  components: {
    BackHeader,
    IconSeparator,
    IconHold,
    IconApproved,
    IconComplete,
    IconRejected,
    ProfileImage,
    ModalView,
    AlertView,
    ModalInner,
    ItemCard,
    ModalReject,
    MessageInner,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const isAdmin = ref(false);
    const isOpen = ref(false);
    const isApprovedOpen = ref(false);
    const isRejectedOpen = ref(false);
    const isCheckRejectOpen = ref(false);
    const isMessageOpen = ref(false);
    const resMessage = ref(null);
    const status = ref(null);
    const rejectContent = ref(null);
    const innerData = ref([]);
    const innerCheckData = ref([]);
    const itemData = ref({});

    const { result } = useQuery(QUERY_PURCHASE_DETAIL, {
      id: +route?.query.id,
    });

    onMounted(() => {
      if (result.value) {
        itemData.value = result.value.getPurchaseDetail.purchaseDetail;
      }

      if (route.query.isAdmin === 'true') {
        isAdmin.value = true;
      }
    });

    watch(result, () => {
      itemData.value = result.value.getPurchaseDetail.purchaseDetail;
    });

    const getDateFormat = (data) => {
      return dateFormat(data);
    };

    const getFormat = (data) => {
      return SUPPLY_CODE[data];
    };

    const getDateFormatFull = (data) => {
      return dateFormatFull(data);
    };

    const getNumberFormat = (data) => {
      return getNumFormat(data);
    };

    const goToSupplyItem = () => {
      router.push({ path: '/item/supply', query: { id: route?.query.id } });
    };

    const onClickDeleteText = () => {
      innerData.value = [
        { text: '카테고리', value: SUPPLY_CODE[itemData.value.category] },
        {
          text: '물품명',
          value:
            itemData.value.items?.length === 1
              ? itemData.value.items[0].name
              : `${itemData.value.items[0].name} 외 ${
                  itemData.value.items?.length - 1
                } 개`,
        },
        {
          text: '최종 금액',
          value: getNumberFormat(itemData.value.finalPrice),
        },
      ];
      isOpen.value = true;
    };

    const onClcikCancel = () => {
      isOpen.value = false;
      isRejectedOpen.value = false;
    };

    const { mutate: deleteItem } = useMutation(
      MUTATION_CANCEL_PURCHASE,
      () => ({
        variables: {
          purchaseId: +route?.query.id,
        },
      })
    );

    const onSubmitDelete = () => {
      deleteItem()
        .then(({ data }) => {
          if (data.cancelPurchase.ok) {
            router.replace('/item');
          }
          if (data.cancelPurchase.error) {
            resMessage.value = data.cancelPurchase.error;
            isMessageOpen.value = true;
          }
        })
        .catch((e) => {
          console.log(e);
          alert('취소 요청 실패했습니다.');
        });
      isOpen.value = false;
    };

    const checkApproved = () => {
      isApprovedOpen.value = false;
      router.replace('/admin/supply');
    };

    const handleInnerCheckData = () => {
      innerCheckData.value = [
        { text: '카테고리', value: SUPPLY_CODE[itemData.value.category] },
        {
          text: '물품명',
          value:
            itemData.value.items?.length === 1
              ? itemData.value.items[0].name
              : `${itemData.value.items[0].name} 외 ${
                  itemData.value.items?.length - 1
                } 개`,
        },
        {
          text: '단가',
          value:
            itemData.value.items?.length === 1
              ? getNumberFormat(itemData.value.items[0]?.eachPrice)
              : `${getNumberFormat(itemData.value.items[0]?.eachPrice)}원 외`,
        },
        {
          text: '수량',
          value:
            itemData.value.items?.length === 1
              ? getNumberFormat(itemData.value.items[0]?.quantity)
              : `${getNumberFormat(itemData.value.items[0]?.quantity)}개 외`,
        },
        {
          text: '최종 금액',
          value: `${getNumberFormat(itemData.value.finalPrice)}원`,
        },
      ];
    };

    const { mutate: auditPurchase } = useMutation(
      MUTATION_AUDIT_PURCHASE,
      () => ({
        variables: rejectContent.value
          ? {
              id: +route?.query.id,
              status: status.value,
              rejectReason: rejectContent.value,
            }
          : {
              id: +route?.query.id,
              status: status.value,
            },
      })
    );

    const handleApprove = () => {
      handleInnerCheckData();
      status.value = 'Approved';
      auditPurchase()
        .then(({ data }) => {
          if (data.auditPurchase.ok) {
            isApprovedOpen.value = true;
          }
          if (data.auditPurchase.error) {
            resMessage.value = data.auditPurchase.error;
            isMessageOpen.value = true;
          }
        })
        .catch((e) => {
          console.log(e);
          alert('요청에 실패했습니다.');
        });
    };

    const handleValue = debounce(
      (value) => {
        rejectContent.value = value;
      },
      [300]
    );

    const onClcikReject = () => {
      isRejectedOpen.value = true;
    };

    const checkReject = () => {
      isCheckRejectOpen.value = false;
      router.push('/admin/supply');
    };

    const handleReject = () => {
      if (!rejectContent.value) {
        alert('반려 사유를 입력해주세요.');
        return;
      }

      handleInnerCheckData();
      status.value = 'Rejected';
      isRejectedOpen.value = false;
      auditPurchase()
        .then(({ data }) => {
          if (data.auditPurchase.ok) {
            isCheckRejectOpen.value = true;
          }
          if (data.auditPurchase.error) {
            resMessage.value = data.auditPurchase.error;
            isMessageOpen.value = true;
          }
        })
        .catch((e) => {
          console.log(e);
          alert('요청에 실패했습니다.');
        });
    };

    const handleComplete = () => {
      status.value = 'Complete';
      auditPurchase()
        .then(({ data }) => {
          if (data.auditPurchase.ok) {
            alert('구매완료 처리 되었습니다.');
            router.push('/admin/supply');
          }
          if (data.auditPurchase.error) {
            resMessage.value = data.auditPurchase.error;
            isMessageOpen.value = true;
          }
        })
        .catch((e) => {
          console.log(e);
          alert('요청에 실패했습니다.');
        });
    };

    const onClcik = () => {
      isMessageOpen.value = false;
      // willfix 실패 후 go(-1) 처리?
    };

    const goToPage = () => {
      router.go(-1);
    };

    return {
      store,
      innerData,
      innerCheckData,
      itemData,
      isOpen,
      isApprovedOpen,
      isRejectedOpen,
      isCheckRejectOpen,
      isAdmin,
      rejectContent,
      goToSupplyItem,
      goToPage,
      getFormat,
      getDateFormat,
      getDateFormatFull,
      getNumberFormat,
      onClickDeleteText,
      onClcikCancel,
      onSubmitDelete,
      checkApproved,
      handleApprove,
      handleValue,
      onClcikReject,
      handleReject,
      checkReject,
      handleComplete,
      onClcik,
      resMessage,
      isMessageOpen,
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  @include stLayout;
}

.title {
  h2 {
    @include title800_26;
  }

  p {
    margin: 6px 0 18px;
    color: var(--gray999);
    @include body400_15;
  }

  svg {
    margin: 0 4px;
  }
}

.writerinfo {
  @include flex(flex-start);
  margin-bottom: 25px;

  svg {
    margin: 0 6px;
  }
}

.profileimg {
  width: 26px;
  height: 26px;
  margin-right: 6px;
}

.writer {
  @include body500_13;
}

.time {
  color: var(--gray999);
  @include body400_13;
}

.item {
  p {
    @include body600_15;
  }

  strong {
    display: inline-block;
    margin: 4px 5px 20px 0;
    @include title800_20;
  }

  span {
    @include title700_15;
  }

  div {
    margin: 4px 0 20px;
    @include body400_14;
  }
}

footer {
  @include stLayout;
  @include flex(space-between);
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  margin-bottom: 40px;

  button {
    width: 100%;
    height: 52px;
    color: var(--white);
    @include title700_17;
    border-radius: 7px;
  }

  :first-child {
    margin-right: 10px;
    background: var(--gray999);
  }

  :last-child {
    background: var(--blue500);
  }
}

.reject:active {
  background: var(--gray888);
}
</style>

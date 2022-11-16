<template>
  <back-header
    :text="
      store.getters.me.nickname === detailData?.user?.nickname &&
      detailData.status === 'Pending'
        ? '수정'
        : ''
    "
    :onClick="goToPage"
    :onClickText="goToApplyDayOff"
    :onClickDeleteText="onClickDeleteText"
    :hasDelete="store.getters.me.role !== 'User'"
    :deleteText="
      store.getters.me.nickname === detailData?.user?.nickname &&
      detailData.status === 'Pending'
        ? '취소'
        : ''
    "
  />
  <main>
    <div class="title">
      <div>
        <h2>{{ title }}</h2>
        <icon-hold v-if="detailData.status === 'Pending'" />
        <icon-approved
          v-if="
            detailData.status === 'Approved' &&
            detailData?.category !== 'System'
          "
        />
        <icon-rejected v-if="detailData.status === 'Rejected'" />
      </div>
      <p>{{ date }}</p>
    </div>

    <div v-if="isAdmin" class="profile">
      <div class="img">
        <profile-image name="April" url="" />
      </div>
      <span>{{ detailData.user?.nickname }}</span>
    </div>
    <div class="dayoff" v-if="detailData?.rejectReason">
      <p>반려사유</p>
      <div>{{ detailData?.rejectReason }}</div>
    </div>
    <div class="dayoff">
      <p v-if="detailData?.category !== 'System'">차감연차</p>
      <p v-if="detailData?.category === 'System'">발생연차</p>
      <strong
        :class="{
          red: detailData?.category !== 'System',
          blue: detailData?.category === 'System',
        }"
        >{{ detailData.deductedDayoffCnt }} </strong
      ><span>일</span>
      <p>잔여연차</p>
      <strong>= {{ detailData.expectedDayoffCnt }} </strong><span>일</span>
    </div>
    <line-view />
    <ul v-if="detailData?.category !== 'System'">
      <li>
        <div>휴가종류</div>
        <strong>{{ title }}</strong>
      </li>
      <li>
        <div>반차여부</div>
        <strong>{{ title }}</strong>
      </li>
      <li>
        <div>시작일자</div>
        <strong>{{ getDate(detailData.startDate) }}</strong>
      </li>
      <li>
        <div>종료일자</div>
        <strong>{{ getDate(detailData.endDate) }}</strong>
      </li>
      <li>
        <div>사유</div>
        <strong>{{ detailData.reason }}</strong>
      </li>
    </ul>
  </main>
  <footer v-if="isAdmin && detailData.status === 'Pending'">
    <button type="button" @click="onClcikReject" class="reject">
      반려하기
    </button>
    <button type="button" @click="handleApprove">승인하기</button>
  </footer>
  <modal-view
    v-if="isOpen"
    :onClcikCancel="onClcikCancel"
    :onClcik="cancelDayOff"
    checkLabel="휴가 취소"
    cancelLabel="아니오"
  >
    <modal-inner title="해당 휴가를 취소하시겠습니까?" :data="innerData" />
  </modal-view>
  <modal-reject
    item="연차를"
    :isRejectedOpen="isRejectedOpen"
    :isCheckRejectOpen="isCheckRejectOpen"
    :rejectContent="rejectContent"
    :innerCheckData="innerData"
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
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useMutation, useQuery } from '@vue/apollo-composable';
import {
  MUTATION_AUDIT_DAYOFF,
  MUTATION_CANCEL_DAYOFF,
  QUERY_DAYOFF_DETAIL,
} from '@/graphql/dayOff.js';
import router from '@/router';
import { debounce } from 'lodash';
import { useRoute } from 'vue-router';
import {
  BackHeader,
  ModalView,
  ModalInner,
  LineView,
  ProfileImage,
  MessageInner,
  AlertView,
  ModalReject,
} from '@/components/common/index.js';
import {
  IconHold,
  IconApproved,
  IconRejected,
} from '@/components/common/icons/index.js';
import { dateFormatFull, dateFormatYear } from '@/util';
import { _DAYOFF_CODE } from '@/constants';

export default {
  name: 'DayOffDetail',
  components: {
    BackHeader,
    ModalView,
    ModalInner,
    IconHold,
    IconApproved,
    IconRejected,
    LineView,
    ProfileImage,
    MessageInner,
    AlertView,
    ModalReject,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const isOpen = ref(false);
    const isAdmin = ref(false);
    const isRejectedOpen = ref(false);
    const status = ref(null);
    const innerData = ref([]);
    const detailData = ref({});
    const isMessageOpen = ref(false);
    const resMessage = ref(null);
    const isCheckRejectOpen = ref(false);
    const rejectContent = ref(null);

    const { result: DayoffDetail, refetch } = useQuery(QUERY_DAYOFF_DETAIL, {
      id: +route.query.id,
    });

    onMounted(() => {
      refetch();
      if (route.query.isAdmin === 'true') {
        isAdmin.value = true;
      }

      if (DayoffDetail.value) {
        detailData.value = DayoffDetail.value.getDayoffDetail.dayoff;
      }
    });

    watch(DayoffDetail, () => {
      detailData.value = DayoffDetail.value.getDayoffDetail.dayoff;
    });

    const title = computed(() => _DAYOFF_CODE[detailData.value.category]);
    const date = computed(() => dateFormatFull(detailData.value.updatedAt));

    const getDate = (date) => {
      return dateFormatYear(date);
    };

    const { mutate: cancelDayoff } = useMutation(
      MUTATION_CANCEL_DAYOFF,
      () => ({
        variables: {
          id: +route.query.id,
        },
      })
    );

    const goToApplyDayOff = () => {
      router.push({ path: '/day-off/apply', query: { id: route.query.id } });
    };

    const onClickDeleteText = () => {
      innerData.value = [
        { text: '신청자', value: store.getters.me.nickname },
        { text: '작성일', value: dateFormatYear(detailData.value.updatedAt) },
        { text: '휴가종류', value: _DAYOFF_CODE[detailData.value.category] },
        { text: '반차여부', value: _DAYOFF_CODE[detailData.value.category] },
        { text: '시작일자', value: dateFormatYear(detailData.value.startDate) },
        { text: '종료일자', value: dateFormatYear(detailData.value.endDate) },
        { text: '사유', value: detailData.value.reason },
      ];
      isOpen.value = true;
    };

    const onClcikCancel = () => {
      isOpen.value = false;
      isRejectedOpen.value = false;
    };

    const cancelDayOff = () => {
      cancelDayoff()
        .then(({ data }) => {
          if (data.cancelDayoff.ok) {
            alert('취소 요청했습니다.');
            isOpen.value = false;
            router.replace('/day-off');
          }
          if (data.cancelDayoff.error) {
            resMessage.value = data.cancelDayoff.error;
            isMessageOpen.value = true;
          }
        })
        .catch((e) => {
          console.log(e);
          alert('취소 요청 실패했습니다.');
          isOpen.value = false;
        });
    };

    const handleValue = debounce(
      (value) => {
        rejectContent.value = value;
      },
      [300]
    );

    const { mutate: auditDayoff } = useMutation(MUTATION_AUDIT_DAYOFF, () => ({
      variables: {
        dayoffId: +route.query.id,
        status: status.value,
      },
    }));

    const handleApprove = () => {
      status.value = 'Approved';
      auditDayoff()
        .then(({ data }) => {
          if (data.auditDayoff.ok) {
            alert('승인 완료했습니다.');
            router.push('/admin/day-off');
          }
          if (data.auditDayoff.error) {
            resMessage.value = data.auditDayoff.error;
            isMessageOpen.value = true;
          }
        })
        .catch((e) => {
          console.log(e);
          alert('요청에 실패했습니다.');
        });
    };

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

      isRejectedOpen.value = true;
      status.value = 'Rejected';
      auditDayoff()
        .then(({ data }) => {
          if (data.auditDayoff.ok) {
            alert('반려 완료했습니다.');
            router.push('/admin/day-off');
          }
          if (data.auditDayoff.error) {
            resMessage.value = data.auditDayoff.error;
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
      isAdmin,
      store,
      title,
      date,
      detailData,
      isOpen,
      innerData,
      goToPage,
      getDate,
      goToApplyDayOff,
      onClickDeleteText,
      cancelDayOff,
      onClcikCancel,
      handleApprove,
      handleReject,
      isRejectedOpen,
      rejectContent,
      onClcikReject,
      isCheckRejectOpen,
      checkReject,
      handleValue,
      onClcik,
      resMessage,
      isMessageOpen,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  @include stLayout;

  h2 {
    @include title800_26;
    margin-right: 8px;
  }

  div {
    @include flex(flex-start);
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

.profile {
  margin: 0 30px 25px;
  @include flex(flex-start);

  span {
    @include body500_13;
  }
}

.img {
  margin-right: 6px;
  width: 26px;
  height: 26px;
}

ul {
  margin-bottom: 100px;
}

li {
  @include flex(space-between);
  padding: 16px 30px;
  border-bottom: 1px solid var(--line);

  div {
    @include body600_14;
    min-width: 52px;
    margin-right: 50px;
  }

  strong {
    color: var(--gray500);
    @include body400_14;
    text-align: right;
  }
}

.dayoff {
  @include stLayout;
  margin-bottom: 10px;

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

.red {
  color: var(--red-txt);
}

.blue {
  color: var(--blue-txt);
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

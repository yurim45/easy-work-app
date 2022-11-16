<template>
  <back-header
    :text="handleView() ? '수정' : ''"
    :onClick="goToPage"
    :onClickText="goToPointInput"
    :onClickDeleteText="onClickDeleteText"
    :hasDelete="handleView()"
  />
  <div class="title">
    <h2>{{ getSubtitle(pointData) }}</h2>
    <p>
      {{ getDateFormat(pointData?.date) }} <icon-separator />
      {{ getUseItemFormat(pointData?.useItem) }} <icon-separator />{{
        pointData?.targets?.length
      }}명
    </p>
    <div class="writerinfo">
      <div class="profileimg">
        <profile-image :name="pointData?.writer?.nickname" url="" />
      </div>
      <span class="writer">{{ pointData?.writer?.nickname }}</span>
      <icon-separator />
      <span class="time">{{ getDateFormatFull(pointData?.createdAt) }}</span>
    </div>
  </div>
  <div class="content">
    <p v-if="pointData?.useItem === 'Send' || pointData?.useItem === 'Receive'">
      보낸 메세지
    </p>
    <p v-if="pointData?.useItem === 'Publish'">내용</p>
    <p
      v-if="
        pointData?.useItem !== 'Send' &&
        pointData?.useItem !== 'Receive' &&
        pointData?.useItem !== 'Publish'
      "
    >
      사용 내역
    </p>
    {{ pointData?.content }}
  </div>
  <div class="point">
    <p>{{ getText(pointData) }}</p>
    <strong
      :class="{
        blue:
          (pointData?.totalExpense > 0 && pointData?.useItem === 'Send') ||
          pointData?.useItem === 'Receive' ||
          pointData?.useItem === 'Publish',
      }"
    >
      <strong v-if="pointData?.totalExpense > 0">+</strong
      >{{ getNumberFormat(pointData?.totalExpense) }} </strong
    ><span>ATP</span>
    <div
      v-if="
        pointData?.useItem !== 'Send' &&
        pointData?.useItem !== 'Receive' &&
        pointData?.useItem !== 'Publish'
      "
    >
      <p>인당 차감 포인트</p>
      <strong class="red">{{ getNumberFormat(pointData?.eachExpense) }} </strong
      ><span>ATP</span>
    </div>
  </div>
  <user-detail :pointData="pointData" />
  <modal-view
    v-if="isOpen"
    :onClcikCancel="onClcikCancel"
    :onClcik="onSubmitPoint"
    checkLabel="삭제"
  >
    <modal-inner title="포인트를 삭제하시겠습니까?" :data="innerData" />
  </modal-view>
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
import { QUERY_POINT_BILL, MUTATION_DELETE_POINT_BILL } from '@/graphql/point';
import {
  BackHeader,
  ModalView,
  ModalInner,
  ProfileImage,
  AlertView,
  MessageInner,
} from '@/components/common/index.js';
import IconSeparator from '../common/icons/IconSeparator.vue';
import UserDetail from './components/pointDetail/UserDetail.vue';
import {
  dateFormatFull,
  getNumFormat,
  dateFormat,
  dateFormatYear,
} from '@/util';
import { ITEM_CODE } from '@/constants';

export default {
  name: 'PointDetail',
  components: {
    BackHeader,
    IconSeparator,
    UserDetail,
    ProfileImage,
    ModalView,
    ModalInner,
    AlertView,
    MessageInner,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const isAdmin = ref(null);
    const isOpen = ref(false);
    const isMessageOpen = ref(false);
    const resMessage = ref(null);
    const innerData = ref([]);
    const pointData = ref({
      targets: [],
    });

    const { result } = useQuery(QUERY_POINT_BILL, {
      id: +route?.query.id,
    });

    onMounted(() => {
      if (result.value) {
        pointData.value = result.value?.pointBill.point;
      }

      if (result.value?.pointBill.error) {
        alert(result.value?.pointBill.error);
      }

      if (route.query.isAdmin === 'true') {
        isAdmin.value = true;
      }
    });

    watch(result, () => {
      pointData.value = result.value?.pointBill.point;
      if (result.value?.pointBill.error) {
        alert(result.value?.pointBill.error);
      }
    });

    const handleView = () => {
      if (
        pointData.value?.useItem !== 'Send' &&
        pointData.value?.useItem !== 'Receive' &&
        store.getters.me.role !== 'User'
      ) {
        return true;
      }
    };

    const getSubtitle = (data) => {
      switch (data?.useItem) {
        case 'Publish':
          return '관리자 발급';
        case 'Send':
          return '포인트 선물하기';
        case 'Receive':
          return '포인트 선물받기';
        default:
          return data?.usePlace?.name;
      }
    };

    const getText = (data) => {
      switch (data?.useItem) {
        case 'Publish':
          return '발급 포인트';
        case 'Send':
          return '선물한 포인트';
        case 'Receive':
          return '받은 포인트';
        default:
          return '총 사용 포인트';
      }
    };

    const getDateFormat = (data) => {
      return dateFormat(data);
    };

    const getUseItemFormat = (data) => {
      return ITEM_CODE[data];
    };

    const getDateFormatFull = (data) => {
      return dateFormatFull(data);
    };

    const getNumberFormat = (data) => {
      return getNumFormat(data);
    };

    const goToPointInput = () => {
      router.push({
        path: '/point/input',
        query: { id: route?.query.id, isAdmin: isAdmin.value },
      });
    };

    const onClickDeleteText = () => {
      innerData.value = [
        { text: '작성자', value: pointData.value.writer.nickname },
        { text: '작성일', value: dateFormatYear(pointData.value.date) },
        {
          text: '대상자',
          value: pointData.value?.targets
            ?.map((user) => user.nickname)
            .join(', '),
        },
        {
          text: '인당 차감포인트',
          value: `${getNumberFormat(pointData.value?.eachExpense)} ATP`,
        },
        {
          text: '총 사용포인트',
          value: `${getNumberFormat(pointData.value?.totalExpense)} ATP`,
        },
      ];
      isOpen.value = true;
    };

    const onClcikCancel = () => {
      isOpen.value = false;
    };

    const { mutate: deletePoint } = useMutation(
      MUTATION_DELETE_POINT_BILL,
      () => ({
        variables: {
          id: +route?.query.id,
        },
      })
    );

    const onSubmitPoint = () => {
      deletePoint()
        .then(({ data }) => {
          if (data.deletePointBill.ok) {
            alert('삭제 완료했습니다.');
            router.go(-1);
          }
          if (data.deletePointBill.error) {
            resMessage.value = data.deletePointBill.error;
            isMessageOpen.value = true;
          }
        })
        .catch((e) => {
          console.log(e);
          alert('삭제 실패했습니다.');
        });
      isOpen.value = false;
    };

    const onClcik = () => {
      isMessageOpen.value = false;
      router.replace('/admin/point/detail');
    };

    const goToPage = () => {
      router.go(-1);
    };

    return {
      store,
      isAdmin,
      handleView,
      innerData,
      pointData,
      isOpen,
      goToPointInput,
      getSubtitle,
      getText,
      goToPage,
      getUseItemFormat,
      getDateFormat,
      getDateFormatFull,
      getNumberFormat,
      onClickDeleteText,
      onClcikCancel,
      onSubmitPoint,
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

.point {
  @include stLayout;
  margin-bottom: 10px;

  p {
    margin-bottom: 3px;
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
}

.red {
  color: var(--red-txt);
}

.content {
  margin-bottom: 20px;
  @include stLayout;
  @include body400_14;

  p {
    margin-bottom: 4px;
    @include body600_15;
  }
}

.blue {
  height: 30px;
  color: var(--blue-txt);
}
</style>

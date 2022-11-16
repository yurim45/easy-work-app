<template>
  <send-point
    v-if="isAlramOn"
    :onclick="checkAlram"
    :type="type"
    :body="pointDetail"
  />
  <back-header @click="goToHome" />
  <swiper
    class="mySwiper"
    slides-per-view="1"
    :space-between="0"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide> <atnp-point-view :isImgView="isImgView" /> </swiper-slide>
    <swiper-slide> <sp-point-view :isImgView="isImgView" /> </swiper-slide>
  </swiper>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { QUERY_POINT_BILL } from '@/graphql/point';
import { QUERY_MESSAGE_LIST } from '@/graphql';
import router from '@/router';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { BackHeader } from '@/components/common/index.js';
import { SendPoint } from '@/components/point/components/index.js';
import SpPointView from '@/components/point/SpPointView.vue';
import AtnpPointView from '@/components/point/AtnpPointView.vue';

import 'swiper/css';

export default {
  name: 'PointView',
  components: {
    BackHeader,
    SendPoint,
    SpPointView,
    Swiper,
    SwiperSlide,
    AtnpPointView,
  },
  setup() {
    const route = useRoute();

    const isAlramOn = ref(false);
    const pointData = ref([]);
    const pointDetail = ref(null);
    const type = ref(null);
    const isImgView = ref(true);

    const { result: messageList } = useQuery(QUERY_MESSAGE_LIST);
    const { result: detailData } = useQuery(QUERY_POINT_BILL, {
      id: +route?.query.id,
    });

    onMounted(() => {
      if (route.query.id) {
        handelIsAlramOn();
        handlePointDetail();
      }

      if (route.query.messageId) {
        handelIsAlramOn();
      }
    });

    watch(messageList, () => {
      handelIsAlramOn();
    });

    watch(detailData, () => {
      handlePointDetail();
    });

    const handelIsAlramOn = () => {
      if (messageList.value) {
        messageList.value?.getMessageList.messageList
          .find((v) => v.id === +route.query.messageId)
          ?.text?.includes('선물')
          ? (type.value = 'arrive')
          : (type.value = 'create');
        const isCheck = messageList.value?.getMessageList.messageList.find(
          (v) => v.id === +route.query.messageId
        )?.isCheck;
        if (isCheck === false) {
          isAlramOn.value = true;
        } else {
          isAlramOn.value = false;
        }
      }
    };

    const handlePointDetail = () => {
      if (detailData.value) {
        if (detailData.value.pointBill.error) {
          alert(detailData.value.pointBill.error);
          router.go(-1);
        }
        pointDetail.value = {
          id: route.query.messageId,
          to: detailData.value.pointBill.point?.targets[0].nickname,
          point: detailData.value.pointBill.point?.eachExpense,
          content: detailData.value.pointBill.point?.content,
          from: detailData.value.pointBill.point?.writer.nickname,
        };
      }
    };

    const checkAlram = () => {
      isAlramOn.value = false;
    };

    const onSwiper = (swiper) => {
      console.log(swiper);
    };

    const onSlideChange = () => {
      isImgView.value = !isImgView.value;
    };

    const goToHome = () => {
      router.push('/');
    };

    return {
      pointData,
      type,
      goToHome,
      isAlramOn,
      pointDetail,
      checkAlram,
      onSwiper,
      onSlideChange,
      isImgView,
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  margin-bottom: 50px;
}

h2 {
  @include stLayout;
  @include stPageTitle;
}
</style>

<template>
  <basic-header :onClickAdmin="onClickAdmin" :isAdmin="true" />
  <main class="point">
    <h2>Point</h2>
    <swiper
      class="mySwiper"
      slides-per-view="1"
      :space-between="0"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide> <admin-atnp-point :isImgView="isImgView" /> </swiper-slide>
      <swiper-slide>
        <admin-sp-point :isImgView="isImgView" type="sp" />
      </swiper-slide>
    </swiper>
  </main>
</template>

<script>
import { onMounted, ref } from 'vue';
import router from '@/router/index';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { BasicHeader } from '@/components/common/index.js';
import { AdminAtnpPoint, AdminSpPoint } from './point/components/index.js';

import 'swiper/css';

export default {
  name: 'AdminPoint',
  components: {
    BasicHeader,
    Swiper,
    SwiperSlide,
    AdminAtnpPoint,
    AdminSpPoint,
  },
  setup() {
    const isImgView = ref(true);

    onMounted(() => {});

    const onClickAdmin = () => {
      router.push('/admin');
    };

    const onSwiper = (swiper) => {
      console.log(swiper);
    };

    const onSlideChange = () => {
      isImgView.value = !isImgView.value;
    };

    return { onClickAdmin, onSwiper, onSlideChange, isImgView };
  },
};
</script>

<style lang="scss" scoped>
.point {
  h2 {
    @include stLayout;
    @include stPageTitle;
  }
}
</style>

<template>
  <main>
    <h3>ATNP 포인트</h3>
    <strong>{{ myPoint }}p</strong>
    <button type="button" @click="sendPointOpen">포인트 보내주기</button>
    <send-point v-if="isSendPoint" @closePage="closePage" />
  </main>
</template>

<script>
import SendPoint from '@/components/point/user/SendPoint.vue';
import { MY_INFO } from '@/constants';
import { getNumFormat } from '@/util';

export default {
  name: 'HomePoint',
  components: { SendPoint },
  data() {
    return {
      me: MY_INFO,
      isSendPoint: false,
    };
  },
  computed: {
    myPoint() {
      return getNumFormat(this.me.point.totalPoint - this.me.point.usePoint);
    },
  },
  methods: {
    sendPointOpen() {
      this.isSendPoint = true;
    },
    closePage() {
      this.isSendPoint = false;
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  padding: 45px 25px;
  background: #fafafa;

  h3 {
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
  }

  strong {
    display: block;
    margin: 8px auto 17px;
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
    text-decoration-line: underline;
  }

  button {
    font-size: 13px;
    font-weight: 600;
    line-height: 16px;
    text-decoration-line: underline;
    color: var(--emerald);
  }
}
</style>

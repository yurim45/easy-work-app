<template>
  <main>
    <h3>ATNP 포인트</h3>
    <strong>{{ myPoint }}p</strong>
    <button type="button" @click="sendPointOpen">포인트 보내주기</button>
    <send-point v-if="isSendPoint" @closePage="closePage" />
    <router-link class="writeButton" to="/point/record">기록하기</router-link>
    <h3 class="title">
      최근내역
      <svg
        width="7"
        height="11"
        viewBox="0 0 7 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L5.5 5.5L1 10" stroke="black" stroke-width="2" />
      </svg>
    </h3>
    <home-point-history />
  </main>
</template>

<script>
import SendPoint from '@/components/point/user/SendPoint.vue';
import { MY_INFO } from '@/constants';
import { getNumFormat } from '@/util';
import HomePointHistory from './HomePointHistory.vue';

export default {
  name: 'HomePoint',
  components: { SendPoint, HomePointHistory },
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
  padding: 45px 34px 25px 25px;
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
    margin-bottom: 27px;
    font-size: 13px;
    font-weight: 600;
    line-height: 16px;
    text-decoration-line: underline;
    color: var(--emerald);
  }
}

.title {
  margin-top: 50px;
  padding-bottom: 14px;
  font-weight: 800;
  border-bottom: 1px solid var(--black);
}

.writeButton {
  @include flex;
  width: 100%;
  height: 43px;
  background: var(--blue);
  color: var(--white);
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  border-radius: 333px;

  &:visited {
    color: var(--white);
  }
}
</style>

<template>
  <main class="point">
    <h1>ATNP 포인트</h1>
    <h2>Hello! {{ userName }} 👋</h2>
    <p>
      {{ userName }}의 잔여 포인트: <strong>{{ points }} p</strong>
    </p>

    <div class="btnWrapper">
      <button-view label="보내기" @onClick="sendPointOpen" />
      <button-view label="기록하기" @onClick="recordPoint" />
    </div>

    <send-point
      v-if="isSendPoint"
      title="포인트 보내기"
      @closePage="closePage"
      @sendPoint="sendPoint"
    />
    <point-history />
  </main>
</template>

<script>
import ButtonView from '@/components/ButtonView.vue';
import SendPoint from '@/components/SendPoint.vue';
import PointHistory from '@/components/PointHistory.vue';

export default {
  name: 'PointView',
  components: { ButtonView, SendPoint, PointHistory },
  data() {
    return {
      userName: 'April',
      points: 50000,
      isSendPoint: false,
    };
  },
  methods: {
    sendPointOpen() {
      this.isSendPoint = true;
    },
    recordPoint() {
      console.log('===== recordPoint Click');
    },
    closePage() {
      this.isSendPoint = false;
      console.log('===== closePage Click');
    },
    sendPoint() {
      this.isSendPoint = false;
      console.log('===== sendPoint');
    },
  },
};
</script>

<style scoped lang="scss">
.point {
  max-width: 1200px;
  margin: auto;
}

h1 {
  padding: 30px;
  font-size: 28px;
  font-weight: 600;
}

h2 {
  font-size: 18px;
  font-weight: 600;
}

.btnWrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 30px 25px;
}

p {
  max-width: 350px;
  margin: 0 auto;
  padding: 30px 0;

  strong {
    font-size: 22px;
  }
}
</style>

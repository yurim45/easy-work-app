<template>
  <basic-header title="ATNP 포인트" />
  <main class="point">
    <div class="content">
      <h2>Hello! {{ userName }} 👋</h2>
      <p>
        {{ userName }}의 잔여 포인트: <strong>{{ points }} P</strong>
      </p>
    </div>

    <div class="btnWrapper">
      <button-view label="보내기" @onClick="sendPointOpen" />
      <router-link class="button" to="/point/record">기록하기</router-link>
    </div>

    <send-point v-if="isSendPoint" @closePage="closePage" />
    <point-history />
  </main>
</template>

<script>
import { ButtonView } from '@/components/common/index';
import SendPoint from '@/components/SendPoint.vue';
import PointHistory from '@/components/PointHistory.vue';
import BasicHeader from '@/components/common/header/BasicHeader.vue';

export default {
  name: 'PointView',
  components: { ButtonView, SendPoint, PointHistory, BasicHeader },
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
    closePage() {
      this.isSendPoint = false;
    },
  },
};
</script>

<style scoped lang="scss">
.point {
  max-width: 1200px;
  margin: auto;
}

.content {
  padding: 30px 20px;
}

h2 {
  font-size: 22px;
  font-weight: 600;
}

p {
  max-width: 350px;

  strong {
    font-size: 22px;
  }
}

.btnWrapper {
  @include flex(space-around);
  padding: 0 30px 25px;

  :first-child {
    background: var(--deepGrey);
  }
}

.button {
  @include flex;
  min-width: 120px;
  height: 40px;
  background: var(--primary);
  color: var(--white);
  border-radius: 10px;

  &:visited {
    color: var(--white);
  }
}
</style>

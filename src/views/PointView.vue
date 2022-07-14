<template>
  <basic-header title="ATNP 포인트" />
  <main class="point">
    <div class="content">
      <p class="title">
        <span> {{ me.name }}의 잔여 포인트</span> <br />
        <strong>{{ userPoint }} P</strong>
      </p>
    </div>

    <div class="btnWrapper">
      <button-view label="보내기" @onClick="sendPointOpen" />
      <router-link class="writeButton" to="/point/record">기록하기</router-link>
    </div>

    <send-point v-if="isSendPoint" @closePage="closePage" />
    <point-history />
  </main>
</template>

<script>
import { ButtonView } from '@/components/common/index';
import SendPoint from '@/components/point/user/SendPoint.vue';
import PointHistory from '@/components/point/user/PointHistory.vue';
import BasicHeader from '@/components/common/header/BasicHeader.vue';
import { getNumFormat } from '@/util';

export default {
  name: 'PointView',
  components: { ButtonView, SendPoint, PointHistory, BasicHeader },
  data() {
    return {
      me: {
        name: 'April',
        point: 50000,
      },
      isSendPoint: false,
    };
  },
  computed: {
    userPoint() {
      return getNumFormat(this.me.point);
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

<style scoped lang="scss">
.title {
  span {
    font-size: 14px;
  }
  strong {
    font-size: 28px;
    font-weight: 700;
  }
}

.point {
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
  font-size: 17px;
  font-weight: 700;

  :first-child {
    height: 48px;
    background: rgba(219, 0, 53, 0.15);
    color: var(--text-red);
    font-size: 17px;
    font-weight: 700;
  }
}

.writeButton {
  @include flex;
  width: 100%;
  height: 48px;
  margin-left: 12px;
  background: var(--red);
  color: var(--white);
  border-radius: 10px;

  &:visited {
    color: var(--white);
  }
}
</style>

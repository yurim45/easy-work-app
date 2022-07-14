<template>
  <div class="modalBg" @click.self="$emit('closePage')">
    <main>
      <h3>💎 포인트 보내기 ✍</h3>
      <section class="selectTarget" v-if="!target">
        <h4>누구에게 포인트를 보낼까요?</h4>
        <ul>
          <li v-for="(user, i) in users" :key="i">
            <button @click="seletUser(user)" class="userInfo">
              <div class="icon">{{ icon(user) }}</div>
              <div class="user">
                <strong class="name">{{ user.name }}({{ user.value }})</strong>
                <span :class="{ point: true, red: remainingPoints(user) < '0' }"
                  >{{ remainingPoints(user) }} P</span
                >
              </div>
            </button>
          </li>
        </ul>
      </section>
      <section class="inputPoints" v-if="target">
        <p class="selecedUser">
          {{ this.target.name }}({{ target.value }}) 님에게
        </p>
        <input-view
          type="number"
          label="보낼 포인트"
          name="amount"
          placeholder="보낼 포인트를 입력하세요."
          :inputValue="amount"
          @handleValue="handleValue($event)"
        />
        <p class="myPoint">내 잔여 포인트: {{ userPoint(me.point) }} P</p>
        <input-view
          label="메세지"
          name="content"
          :inputValue="content"
          placeholder="포인트와 함께 전달할 메세지를 입력하세요"
          @handleValue="handleValue($event)"
        />
        <footer class="btnWrapper">
          <button-view label="취소하기" @onClick="$emit('closePage')" />
          <button-view
            label="보내기"
            @onClick="onSubmitSendPoints"
            :disabled="isDisabled"
          />
        </footer>
      </section>
    </main>
  </div>
</template>

<script>
import { ButtonView, InputView } from '@/components/common/index';
import { getNumFormat } from '@/util';
import { USER_LIST } from '@/constants/index';

export default {
  name: 'SendPointModal',
  components: { ButtonView, InputView },
  props: {
    closePage: {
      type: Function,
    },
  },
  data() {
    return {
      me: {
        name: '프릴',
        point: 23000,
      },
      users: USER_LIST,
      target: '',
      amount: '',
      content: '',
    };
  },
  computed: {
    icon() {
      return (user) => user.name.substring(0, 1);
    },
    userPoint() {
      return (point) => getNumFormat(point);
    },
    isDisabled() {
      return this.amount > 0 && this.amount <= this.me.point ? false : true;
    },
    remainingPoints() {
      return (user) => getNumFormat(user.totalPoint - user.usePoint);
    },
  },
  methods: {
    seletUser(user) {
      this.target = user;
    },
    handleValue(value) {
      switch (value.name) {
        case 'amount':
          this.amount = value.value;
          return;
        case 'content':
          this.content = value.value;
          return;
      }
    },
    onSubmitSendPoints() {
      console.log(this.target, this.amount, this.content);
      this.$emit('closePage');
    },
  },
};
</script>

<style scoped lang="scss">
.modalBg {
  @include flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 25px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
}

main {
  width: 100%;
  height: 100%;
  padding: 30px 20px;
  background: var(--white);
  border-radius: 10px;
  overflow: scroll;
}

h3 {
  margin-bottom: 30px;
  font-size: 22px;
}

.userInfo {
  @include flex(flex-start);
  margin: 20px 10px;
  width: 100%;
}

.user {
  @include flex(center, flex-start, column);
  margin-left: 20px;
}

.icon {
  @include flex;
  width: 50px;
  height: 50px;
  @include stIcon;
  font-size: 20px;
  font-weight: 800;
  border-radius: 50%;
}

.name {
  font-size: 16px;
  font-weight: 600;
}

.point {
  font-size: 14px;
}

.selecedUser {
  margin: 20px 0 40px;
  font-size: 20px;
  font-weight: 600;
}

.myPoint {
  margin: -10px 0 40px;
  font-size: 14px;
  font-weight: 400;
}

.btnWrapper {
  @include flex(space-around);
  margin-top: 40px;

  :first-child {
    background: var(--deepGrey);
    margin-right: 12px;
  }
}

.red {
  color: var(--primary);
}
</style>

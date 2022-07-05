<template>
  <div class="modalBg" @click.self="$emit('closePage')">
    <main>
      <h3>💎 포인트 보내기 ✍</h3>
      <section class="selectTarget" v-if="!target">
        <h4>누구에게 포인트를 보낼까요?</h4>
        <ul>
          <li v-for="user in users" :key="user.id">
            <button @click="seletUser(user)" class="userInfo">
              <div class="icon">{{ icon(user) }}</div>
              <div class="user">
                <strong class="name">{{ user.name }}({{ user.nick }})</strong>
                <span class="point">{{ userPoint(user.point) }} P</span>
              </div>
            </button>
          </li>
        </ul>
      </section>
      <section class="inputPoints" v-if="target">
        <p class="selecedUser">
          {{ this.target.name }}({{ target.nick }}) 님에게
        </p>
        <input-view
          type="number"
          label="보낼 포인트"
          name="amount"
          :inputValue="amount"
          @handleValue="handleValue($event)"
        />
        <p class="myPoint">내 잔여 포인트: {{ userPoint(me.point) }} P</p>
        <input-view
          label="메세지"
          name="message"
          :inputValue="message"
          @handleValue="handleValue($event)"
        />
        <footer class="btnWrapper">
          <button-view label="취소하기" @onClick="$emit('closePage')" />
          <button-view label="보내기" @onClick="onSubmitSendPoints" />
        </footer>
      </section>
    </main>
  </div>
</template>

<script>
import { ButtonView, InputView } from '@/components/common/index';
import { getNumFormat } from '@/util';

export default {
  name: 'SendPointModal',
  components: { ButtonView, InputView },
  data() {
    return {
      me: {
        name: '프릴',
        point: 23000,
      },
      users: [
        { id: 1, point: 1945, name: '워렌', nick: 'Warren' },
        { id: 2, point: 1945, name: '위드', nick: 'With' },
        { id: 3, point: 1945, name: '프릴', nick: 'April' },
        { id: 4, point: 1945, name: '제임스', nick: 'James' },
        { id: 5, point: 1945, name: '주드', nick: 'Jude' },
      ],
      target: '',
      amount: '',
      message: '',
    };
  },
  props: {
    closePage: {
      type: Function,
    },
  },
  computed: {
    icon() {
      return (user) => user.name.substring(0, 1);
    },
    userPoint() {
      return (point) => getNumFormat(point);
    },
  },
  methods: {
    seletUser(user) {
      this.target = user;
    },
    handleValue(value) {
      switch (value.name) {
        case 'amount':
          this.date = value.value;
          return;
        case 'message':
          this.message = value.value;
          return;
      }
    },
    onSubmitSendPoints() {
      console.log(this.target, this.amount, this.message);
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
  padding: 30px 20px;
  background: var(--white);
  border-radius: 10px;
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
  font-size: 18px;
  font-weight: 600;
}

.point {
  font-size: 14px;
}

.selecedUser {
  margin: 20px 0;
  font-size: 20px;
  font-weight: 600;
}

.myPoint {
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 400;
}

.btnWrapper {
  @include flex(space-around);
  margin-top: 40px;

  :first-child {
    background: var(--deepGrey);
  }
}
</style>

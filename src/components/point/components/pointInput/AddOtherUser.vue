<template>
  <div class="wrapper">
    <input
      type="text"
      placeholder="추가 제외인원을 입력하세요"
      @input="handleAddUser"
      :value="user"
    />
    <button type="button" @click="onSubmitUser">확인</button>
  </div>
  <ul>
    <li v-for="(user, i) in value" :key="i">
      <button type="button" @click="deleteUser(user)">
        <tag-user-name :user="user.nickname" />
      </button>
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue';
import { debounce } from 'lodash';
import TagUserName from '@/components/common/TagUserName.vue';

export default {
  components: { TagUserName },
  name: 'AddUser',
  props: {
    handleValue: Function,
    deleteUser: Function,
    value: {
      type: Array,
    },
  },
  setup(props) {
    const user = ref(null);

    const handleAddUser = debounce(
      (event) => {
        user.value = event.target.value;
      },
      [300]
    );

    const onSubmitUser = () => {
      const array = [...props.value, { nickname: user.value }].filter(
        (v, i, self) => i === self.findIndex((t) => t.nickname === v.nickname)
      );
      props.handleValue('nonTargets', array);
      user.value = null;
    };

    return { handleAddUser, onSubmitUser, user };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @include flex(flex-end);

  button {
    position: absolute;
    width: 74px;
    padding: 12px 23px;
    background: var(--gray555);
    @include body600_14;
    color: var(--white);
    border-radius: 0px 7px 7px 0px;
  }
}

input {
  @include stInput;
}

ul {
  @include flex(flex-start);
  margin: 12px 0 30px;
}
</style>

<template>
  <close-header @click="goToPage" />
  <main>
    <h2>비밀번호 변경</h2>
    <label for="password">새 비밀번호</label>
    <input
      type="password"
      placeholder="변경할 비밀번호를 입력하세요"
      name="password"
      @input="(e) => handleValue('password', e)"
    />
    <label for="password">비밀번호 재입력</label>
    <input
      type="password"
      placeholder="비밀번호를 확인해주세요"
      name="checkPassword"
      @input="(e) => handleValue('checkPassword', e)"
    />
    <p v-if="isView">새롭게 변경할 비밀번호와 일치하지 않습니다.</p>
  </main>
  <footer>
    <button type="button" @click="onSubmit" :disabled="isDisabled">
      변경하기
    </button>
  </footer>
  <alert-view v-if="isMessageOpen" :onClcik="onClcik">
    <div class="message">
      <div class="title">비밀번호 변경이 완료되었습니다.</div>
      <p>다시 로그인 해주세요</p>
    </div>
  </alert-view>
</template>

<script>
import { onMounted, ref, watchEffect } from 'vue';
import router from '@/router';
import { debounce } from 'lodash';
import { CloseHeader, AlertView } from '@/components/common/index.js';
import { useMutation } from '@vue/apollo-composable';
import { MUTATION_UPDATE_PW } from '@/graphql/login';

export default {
  components: { CloseHeader, AlertView },
  name: 'MypageView',
  setup() {
    const state = ref({
      password: null,
      checkPassword: null,
    });
    const isView = ref(false);
    const isDisabled = ref(true);
    const isMessageOpen = ref(false);
    const resMessage = ref(null);

    onMounted(() => {});

    watchEffect(() => {
      if (
        state.value.checkPassword &&
        state.value.password !== state.value.checkPassword
      ) {
        isView.value = true;
      }
      if (
        state.value.checkPassword &&
        state.value.password &&
        state.value.password === state.value.checkPassword
      ) {
        isView.value = false;
      }
    });

    const handleValue = debounce(
      (name, value) => {
        state.value[name] = value.target.value;

        if (state.value.password && state.value.checkPassword) {
          isDisabled.value =
            state.value.password === state.value.checkPassword ? false : true;
        }

        if (!state.value.password || !state.value.checkPassword) {
          isDisabled.value = true;
        }
      },
      [300]
    );

    const { mutate: updatePassword } = useMutation(MUTATION_UPDATE_PW, () => ({
      variables: {
        newPassword: state.value.password,
      },
    }));

    const onSubmit = () => {
      updatePassword()
        .then(({ data }) => {
          if (data.updatePassword.ok) {
            isMessageOpen.value = true;
          }
        })
        .catch((e) => {
          console.log(e);
          alert('비밀번호 변경 실패했습니다.');
        });
    };

    const onClcik = () => {
      isMessageOpen.value = false;
      router.replace('/login');
    };

    const goToPage = () => {
      router.push('/menu');
    };

    return {
      onSubmit,
      goToPage,
      state,
      handleValue,
      isMessageOpen,
      resMessage,
      onClcik,
      isDisabled,
      isView,
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  @include stLayout;
}

h2 {
  @include stPageTitle;
}

label {
  display: block;
  margin-bottom: 13px;
  @include stLabel;
}

input {
  margin-bottom: 30px;
  @include stInput;
}

p {
  margin-top: -24px;
  color: var(--red-txt);
  @include body700_11;
}

footer {
  position: fixed;
  bottom: 40px;
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  @include stLayout;

  button {
    @include stLoginButton;
    border-radius: 7px;
  }
}

.message {
  text-align: center;

  .title {
    margin-bottom: 14px;
    @include title700_17;
  }

  p {
    @include body400_14;
  }
}
</style>

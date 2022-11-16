<template>
  <Form class="login" :validation-schema="schema" @submit="onSubmitLogin">
    <img alt="logo" src="@/assets/logo.png" />
    <img alt="EASYWORK" src="@/assets/EASYWORK.png" />
    <h2>Login</h2>
    <label for="email">ID</label>
    <input style="display: none" :aria-hidden="true" />
    <input
      type="email"
      name="email"
      placeholder="아이디를 입력해주세요"
      :readonly="!isFocused"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @input="(e) => handleValue('email', e)"
      autocomplete="nope"
    />
    <!-- <basic-input
      type="email"
      name="email"
      :handleValue="handleValue"
      label="ID"
      placeholder="아이디를 입력해주세요"
    /> -->
    <basic-input
      type="password"
      name="password"
      :handleValue="handleValue"
      label="PW"
      placeholder="비밀번호를 입력해주세요"
    />
    <footer><button type="submit">LOGIN</button></footer>
  </Form>
  <!-- <button type="button" @click="onSubmitRegister">회원가입</button> -->
  <alert-view v-if="isMessageOpen" :onClcik="onClcik">
    <message-inner :message="resMessage" />
  </alert-view>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { MUTATION_LOGIN } from '@/graphql/login.js';
import store from '@/store/index';
import router from '@/router/index';
import { debounce } from 'lodash';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import {
  BasicInput,
  AlertView,
  MessageInner,
} from '@/components/common/index.js';

export default {
  components: { BasicInput, Form, AlertView, MessageInner },
  name: 'LoginView',
  setup() {
    const state = ref({
      name: null,
      nickname: null,
      team: null,
      email: null,
      password: null,
    });
    const isMessageOpen = ref(false);
    const resMessage = ref(null);
    const isFocused = ref(true);

    const schema = Yup.object().shape({
      // email: Yup.string().required('이메일(ID)을 입력해주세요'),
      // password: Yup.string().required('비밀번호를 입력해주세요'),
    });

    onMounted(() => {
      window.localStorage.clear();
    });

    const handleValue = debounce(
      (name, value) => {
        if (name === 'email') {
          state.value[name] = value.target.value;
        } else {
          state.value[name] = value;
        }
      },
      [300]
    );

    const { mutate: login } = useMutation(MUTATION_LOGIN, () => ({
      variables: {
        email: state.value.email,
        password: state.value.password,
      },
    }));

    const onSubmitLogin = () => {
      if (!state.value.email) {
        resMessage.value = '이메일을 입력해주세요';
        isMessageOpen.value = true;
        return;
      }

      if (!state.value.password) {
        resMessage.value = '비밀번호를 입력해주세요';
        isMessageOpen.value = true;
        return;
      }

      login()
        .then(({ data }) => {
          if (data?.login.ok) {
            store.dispatch('login', {
              token: data.login.token,
              user: data.login.user,
            });
            router.replace('/');
          }
          if (data.login.error) {
            resMessage.value = data.login.error;
            isMessageOpen.value = true;
          }
        })
        .catch((e) => {
          alert(e.message);
        });
    };

    // signup
    // const { mutate: register } = useMutation(MUTATION_REGISTER, () => ({
    //   variables: {
    //     name: '김유림',
    //     nickname: 'april',
    //     team: '개발',
    //     email: 'yr.kim@atnp.co.kr',
    //     password: '0000',
    //     birthday: '2022-04-05',
    //     joinDay: '2022-01-24',
    //     jobName: 'Frontend Developer',
    //   },
    // }));

    // const onSubmitRegister = () => {
    //   register();
    // };

    const onClcik = () => {
      isMessageOpen.value = false;
    };

    return {
      handleValue,
      isFocused,
      onSubmitLogin,
      state,
      schema,
      onClcik,
      resMessage,
      isMessageOpen,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  margin-top: 135px;
  @include stLayout;

  h2 {
    margin: 100px 0 22px;
    @include title800_20;
  }
}

img {
  display: block;
  margin: 12px auto;
  width: 100px;
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

footer {
  margin-top: 20px;
  @include stLoginButton;
  border-radius: 7px;
}
</style>

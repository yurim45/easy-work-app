import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import token from '@/common/token.js';

export default createStore({
  state: {
    me: null,
    allusers: [],
    otherUsers: [],
    token: {
      accessToken: token.getToken(),
    },
    // 토큰정보
    isAuthenticated: !!token.getToken(),
  },
  getters: {
    getAccessToken: function (state) {
      return state.token.accessToken;
    },
    isAuthenticated: function (state) {
      return state.isAuthenticated;
    },
    me: function ({ me }) {
      return {
        ...me,
      };
    },
    allusers: function ({ allusers }) {
      return allusers;
    },
    otherUsers: function ({ otherUsers }) {
      return otherUsers;
    },
  },
  mutations: {
    login: function (state, payload) {
      state.token.accessToken = payload.accessToken;
      state.me = { ...payload.user };
      state.isAuthenticated = true;
      token.saveToken(payload.accessToken);
    },
    my: function (state, payload) {
      state.me = { ...payload.user };
    },
    allusers: function (state, payload) {
      state.allusers = payload.allusers.filter(
        (user) => user.nickname !== 'Howl' && user.nickname !== 'Simpson'
      );
      state.otherUsers = payload.allusers.filter(
        (user) => user.nickname === 'Howl' || user.nickname === 'Simpson'
      );
    },
  },
  actions: {
    login: function (context, payload) {
      context.commit('login', {
        accessToken: payload.token,
        user: payload.user,
      });
    },
    getMyInfo: function (context, payload) {
      context.commit('my', {
        user: payload.my,
      });
    },
    getAllusers: function (context, payload) {
      context.commit('allusers', {
        allusers: payload.allusers,
      });
    },
  },
  modules: {},
  plugins: [createPersistedState({ paths: ['me', 'allusers', 'otherUsers'] })],
});

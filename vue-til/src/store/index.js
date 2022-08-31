import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser } from '@/api/auth';
import {
  saveAuthToCookie,
  saveUserToCookie,
  saveNickNameToCookie,
  getUserFromCookie,
  getAuthFromCookie,
  getNickNameFromCookie,
  deleteCookie,
} from '@/utils/cookies.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: getUserFromCookie() || '',
      nickname: getNickNameFromCookie() || '',
    },
    token: getAuthFromCookie() || '',
  },
  getters: {
    isLoggedIn(state) {
      return state.token || getUserFromCookie();
    },
    userToken(state) {
      return state.token;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      deleteCookie('til_auth');
      deleteCookie('til_user');
    },
  },
  actions: {
    async LOGIN({ commit }, data) {
      const response = await loginUser(data);
      console.log(data);
      commit('SET_USER', response.data.user);
      commit('SET_TOKEN', response.data.token);
      saveUserToCookie(response.data.user.username);
      saveNickNameToCookie(response.data.user.nickname);
      saveAuthToCookie(response.data.token);
      return response;
    },
  },
});

// import Vue from 'vue';
// import Vuex from 'vuex';
// import {
//   getAuthFromCookie,
//   getUserFromCookie,
//   saveAuthToCookie,
//   saveUserToCookie,
// } from '@/utils/cookies';
// import { loginUser } from '@/api/auth';
//
// Vue.use(Vuex);
//
// export default new Vuex.Store({
//   state: {
//     username: getUserFromCookie() || '',
//     token: getAuthFromCookie() || '',
//   },
//   getters: {
//     isLoggedIn(state) {
//       return state.username !== '';
//     },
//   },
//   mutations: {
//     setUsername(state, username) {
//       state.username = username;
//     },
//     clearUsername(state) {
//       state.username = '';
//     },
//     setToken(state, token) {
//       state.token = token;
//     },
//     clearToken(state) {
//       state.token = '';
//     },
//   },
//   actions: {
//     async LOGIN({ commit }, userData) {
//       const { data } = await loginUser(userData);
//       console.log(data.token);
//       commit('setToken', data.token);
//       commit('setUsername', data.user.username);
//       saveAuthToCookie(data.token);
//       saveUserToCookie(data.user.username);
//       return data;
//     },
//   },
// });

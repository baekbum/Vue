import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
  userInfo : {},
}

const getters = {
  getUserInfo : function (state) {
    return state.userInfo;
  }
}

const mutations = {
  setUserInfo : function (state, payload) {
    state.userInfo = JSON.parse(localStorage.getItem('user'));
  }
}

export default {
    strict: true, // process.env.NODE_ENV !== 'production',
    state,
    getters,
    mutations
}
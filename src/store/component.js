import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
  rankInfo : [],
  positionInfo : [],
  teamInfo : []
}

const getters = {
  getRankInfo : function (state) {
    return state.rankInfo;
  },
  getPositionInfo : function (state) {
    return state.positionInfo;
  },
  getTeamInfo : function (state) {
    return state.teamInfo;
  }
}

const mutations = {
  setRankInfo : function (state, payload) {
    state.rankInfo = payload;
  },
  setPositionInfo : function (state, payload) {
    state.positionInfo = payload;
  },
  setTeamInfo : function (state, payload) {
    state.teamInfo = payload;
  },
}

export default {
    strict: true, // process.env.NODE_ENV !== 'production',
    state,
    getters,
    mutations
}
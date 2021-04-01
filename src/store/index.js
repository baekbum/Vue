import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

import UserInfo from "./userInfo";
import Component from "./component";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: { 
    userInfo : UserInfo,
    component : Component
  },
  plugins: [ 
    createPersistedState({
      paths: ["userInfo", "component"]
    })
  ]
})

export default store
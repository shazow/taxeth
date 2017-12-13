import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accounts: {},
    messages: [],
  },
  mutations: {
    addAccount (state, account) {
      if (state.accounts[account]) return;
      state.accounts[account] = [];
    },
    reset (state) {
      state.accounts = {};
    },
  },
});

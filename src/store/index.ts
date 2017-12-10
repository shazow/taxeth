import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface State {
  accounts: {[key:string]: boolean},
}

export default new Vuex.Store({
  state: <State>{
    accounts: {},
  },
  mutations: {
    addAccount(state:State, account:string) {
      state.accounts[account] = true;
    }
  },
})

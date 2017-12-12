import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

type Transaction = string;

export interface State {
  errors: string[],
  accounts: {[key:string]: Transaction[]},
}

export default new Vuex.Store({
  state: <State>{
    errors: [],
    accounts: {},
  },
  mutations: {
    error(state:State, error:string) {
      state.errors.push(error);
    },
    addAccount(state:State, account:string) {
      state.accounts[account] = [];
    },
    addTransaction(state:State, tx:any) {
      console.log(tx);
    },
  },
})

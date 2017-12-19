import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

import BN from 'bn.js';

// TODO: Add fetch caching for localstorage? https://github.com/pagekit/vue-resource/issues/252

Vue.use(Vuex);

const WEI_IN_ETH = new BN('1000000000000000000');

function weiToEth (wei) {
  return (new BN(wei)).div(WEI_IN_ETH);
};

function epochToDate (epoch) {
  const d = new Date(0);
  d.setUTCSeconds(epoch);
  return d.toISOString().split('T', 1)[0];
};

export default new Vuex.Store({
  state: {
    messages: [],
    accounts: {},
    priceHistory: {},
    transactions: [],
  },
  getters: {
    priceByDate: (state) => (symbolFrom, symbolTo, date) => {
      if (!state.priceHistory[symbolFrom] || !state.priceHistory[symbolFrom][symbolTo]) return;
      return state.priceHistory[symbolFrom][symbolTo][date];
    },
  },
  mutations: {
    addAccount (state, address, symbol) {
      if (state.accounts[address]) return;
      state.accounts[address] = {
        loading: true,
        symbol,
      };
    },
    addTransaction (state, {date, from, to, value, kind}) {
      if (value.isZero()) return; // Skip zero-value for now
      state.transactions.push({
        date,
        from,
        to,
        value,
        kind,
      });
    },
    completeAccount (state, address) {
      state.accounts[address].loading = false;
    },
    addPriceHistory (state, {fromSymbol, toSymbol, history}) {
      state.priceHistory[fromSymbol] = state.priceHistory[fromSymbol] || {};
      state.priceHistory[fromSymbol][toSymbol] = state.priceHistory[fromSymbol][toSymbol] || {};
      state.priceHistory[fromSymbol][toSymbol] = Object.assign({}, state.priceHistory[fromSymbol][toSymbol], history);
    },
    message (state, {kind, body}) {
      state.messages.push({
        kind: kind,
        body: body,
        read: false,
      });
    },
    reset (state) {
      state.accounts = {};
    },
  },
  actions: {
    saveAccount ({ commit, dispatch, state }, address) {
      if (state.accounts[address] !== undefined) return Promise.reject(Error('account already saved: ' + address));
      commit('addAccount', address);

      const fromSymbol = 'ETH';
      const toSymbol = 'USD';
      const pricePromise = dispatch('loadPriceHistory', {fromSymbol, toSymbol});
      const txPromise = dispatch('loadTransactions', {symbol: fromSymbol, address});
      if (state.priceHistory[fromSymbol] && state.priceHistory[fromSymbol][toSymbol]) {
        // Price history already loaded
        return txPromise;
      }
      return Promise.all([txPromise, pricePromise]);
    },
    loadTransactions ({ commit }, {symbol, address}) {
      if (symbol !== 'ETH') {
        // TODO: Expand from ETH
        return Promise.reject(Error('invalid symbol: ' + symbol));
      }

      const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc`;
      return axios.get(url).then(response => {
        for (let tx of response.data.result) {
          commit('addTransaction', {
            date: epochToDate(tx.timeStamp),
            to: tx.to,
            from: tx.from,
            value: weiToEth(tx.value),
            kind: symbol,
          });
        }
        commit('completeAccount', address);
      });
    },
    loadPriceHistory ({ commit }, {fromSymbol, toSymbol}) {
      // Lock for this symbol combo
      const history = {};
      commit('addPriceHistory', {fromSymbol, toSymbol, history});
      // TODO: Assert symbol whitelist
      // XXX: Expand from 365 days
      const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${fromSymbol}&tsym=${toSymbol}&limit=365`;
      return axios.get(url).then(response => {
        for (let row of response.data['Data']) {
          const d = epochToDate(row.time);
          history[d] = new BN(row.close);
        }
        commit('addPriceHistory', {fromSymbol, toSymbol, history});
      });
    },
  },
});

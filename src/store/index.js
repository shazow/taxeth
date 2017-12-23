import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

import BN from 'bn.js';

Vue.use(Vuex);

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
    txIncoming: [],
    txOutgoing: [],
  },
  getters: {
    priceHistory: (state) => (symbolFrom, symbolTo) => {
      return state.priceHistory[symbolFrom] && state.priceHistory[symbolFrom][symbolTo];
    },
    priceByDate: (state, getters) => (symbolFrom, symbolTo, date) => {
      const history = getters.priceHistory(symbolFrom, symbolTo);
      return history && history[date];
    },
    transactionPrice: (state, getters) => (tx, symbolTo) => {
      const history = getters.priceHistory(tx.kind, symbolTo);
      return history && history[tx.date];
    },
    totalValue: (state, getters) => (symbolTo) => {
      let total = new BN(0);
      const one = new BN(1);
      for (let tx of state.txIncoming) {
        if (!tx.value) continue;
        const price = symbolTo === tx.kind ? one : getters.transactionPrice(tx, symbolTo);
        if (!price) continue;
        total.iadd(tx.value.mul(price));
      }
      return total;
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
    addTransaction (state, {date, from, to, value, kind, isIncoming}) {
      if (value.isZero()) {
        return; // Skip zero-value for now
      }
      const target = isIncoming ? state.txIncoming : state.txOutgoing;
      target.push({
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
          if (tx.isError !== '0') {
            continue;
          }
          commit('addTransaction', {
            date: epochToDate(tx.timeStamp),
            to: tx.to,
            from: tx.from,
            value: new BN(tx.value),
            kind: symbol,
            isIncoming: tx.to === address,
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

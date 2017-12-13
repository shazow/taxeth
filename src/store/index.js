import Vue from 'vue';
import Vuex from 'vuex';

// TODO: Add fetch caching for localstorage? https://github.com/pagekit/vue-resource/issues/252

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    accounts: {},
    priceHistory: {},
  },
  mutations: {
    addAccount (state, address) {
      if (state.accounts[address]) return;
      state.accounts[address] = {
        loading: true,
        transactions: [],
      };
    },
    addTransaction (state, {address, tx}) {
      if (state.accounts[address] === undefined) {
        state.accounts[address] = {
          loading: true,
          transactions: [],
        };
      }
      state.accounts[address].transactions.push(tx);
    },
    completeAccount (state, address) {
      state.accounts[address].loading = false;
    },
    addPriceHistory (state, {fromSymbol, toSymbol, history}) {
      state.priceHistory[fromSymbol] = state.priceHistory[fromSymbol] || {};
      state.priceHistory[fromSymbol][toSymbol] = state.priceHistory[fromSymbol][toSymbol] || {};
      Object.assign(state.priceHistory[fromSymbol][toSymbol], history);
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
      const txPromise = dispatch('loadTransactions', {symbol: fromSymbol, address});
      if (state.priceHistory[fromSymbol] && state.priceHistory[fromSymbol][toSymbol]) {
        // Price history already loaded
        return txPromise;
      }
      return Promise.all([
        txPromise,
        dispatch('loadPriceHistory', {fromSymbol, toSymbol}),
      ]);
    },
    loadTransactions ({ commit }, {symbol, address}) {
      if (symbol !== 'ETH') {
        // TODO: Expand from ETH
        return Promise.reject(Error('invalid symbol: ' + symbol));
      }

      const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc`;
      return Vue.http.get(url).then(response => {
        return response.json();
      }).then(data => {
        for (let tx of data.result) {
          commit('addTransaction', {
            address,
            tx: {
              from: tx.from,
              value: tx.value, // in wei
              kind: symbol,
            },
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
      const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${fromSymbol}&tsym=${toSymbol}&limit=365&aggregate=3&e=CCCAGG`;
      return Vue.http.get(url).then(response => {
        return response.json();
      }).then(data => {
        for (let row of data['Data']) {
          const d = new Date(0);
          d.setUTCSeconds(row.time);
          history[d] = row.close;
        }
        commit('addPriceHistory', {fromSymbol, toSymbol, history});
      });
    },
  },
});

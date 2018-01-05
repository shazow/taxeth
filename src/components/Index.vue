<template>
  <div>
    <Accounts></Accounts>
    <Transactions></Transactions>
  </div>
</template>

<script>
import Accounts from './Accounts';
import Transactions from './Transactions';

import TaxethError from '@/errors.js';

export default {
  name: 'Index',
  props: ['initAddresses'],
  data () {
    return {
      newAccount: '',
    };
  },
  methods: {
    reset () {
      this.newAccount = '';
    },
    addAccount (e) {
      const account = this.newAccount;
      if (!account) return; // Ignore event
      // TODO: Validate?
      this.$store.dispatch('saveAccount', account).catch(TaxethError, (err) => {
        this.$store.commit('message', {kind: 'error', body: String(err)});
      });
      this.reset();
    },
  },
  components: {
    Accounts,
    Transactions,
  },
  mounted () {
    if (!this.initAddresses || this.initAddresses.length === 0) return;
    for (let address of this.initAddresses) {
      this.$store.dispatch('saveAccount', address).catch(TaxethError, (err) => {
        this.$store.commit('message', {kind: 'error', body: String(err)});
      });
    }
  },
};
</script>

<style scoped>
td {
  padding: 0 0.2em;
}
td.value {
  text-align: right;
  padding-right: 0;
}
td.kind {
  padding-right: 0.4em;
}
td.address {
  color: rgba(0,0,125,0.4);
}
</style>

<template>
  <form v-on:submit.prevent="addAccount">
    <h2>Accounts</h2>
    <ul v-for="(account, addr) in $store.state.accounts">
      <li :class="{ loading: account.loading }">{{addr}}</li>
    </ul>
    <input type="text" v-model="newAccount" class="address" placeholder="Ethereum Address" />
    <input type="submit" value="Add" v-on:click="addAccount" />
  </form>
</template>

<script>
import TaxethError from '@/errors.js';

export default {
  name: 'Accounts',
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
      this.$store.dispatch('saveAccount', account).catch(TaxethError, err => {
        this.$store.commit('message', {kind: 'error', body: String(err)});
      });
      this.reset();

      this.$router.push({path: '/', query: {a: Object.keys(this.$store.state.accounts)}});
    },
  },
};
</script>

<style scoped>
input.address {
  width: 32em;
}

.loading::after {
  margin-left: 1em;
  padding: 2px 5px;
  line-height: 1em;
  border-radius: 3px;
  vertical-align: middle;
  content: "LOADING...";
  font-size: 10px;
  font-weight: bold;
  background: rgba(0, 100, 200, 0.6);
  color: rgba(255, 255, 255, 0.9);
}
</style>

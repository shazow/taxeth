<template>
  <form v-on:submit.prevent="addAccount">
    <h2>Accounts</h2>
    <ul v-for="(_, account) in $store.state.accounts">
      <li>{{account}}</li>
    </ul>
    <input type="text" v-model="newAccount" />
    <input type="submit" value="Add" v-on:click="addAccount" />

    <ul v-for="tx in getTransactions($store.state.accounts)">
      <li>{{tx}}</li>
    </ul>
  </form>
</template>

<script>
export default {
  name: 'Index',
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
      this.$store.dispatch('saveAccount', account).catch(err => {
        this.$store.commit('message', {kind: 'error', body: String(err)});
      });
      this.reset();
    },
    getTransactions (accounts) {
      const txns = [];
      for (let account in accounts) {
        for (let tx in account.transactions) {
          txns.push(tx);
        }
      }
      return txns;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

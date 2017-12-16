<template>
  <form v-on:submit.prevent="addAccount">
    <h2>Accounts</h2>
    <ul v-for="(_, account) in $store.state.accounts">
      <li>{{account}}</li>
    </ul>
    <input type="text" v-model="newAccount" />
    <input type="submit" value="Add" v-on:click="addAccount" />

    <table>
      <thead>
        <td class="date">Date</td>
        <td class="address">From</td>
        <td class="kind" colspan=2>Value</td>
        <td class="kind" colspan=2>Conversion</td>
      </thead>
      <tr v-for="tx in $store.state.transactions">
        <td class="date">{{tx.date}}</td>
        <td class="address">{{tx.from}}</td>
        <td class="value">{{tx.value.toNumber().toPrecision(3)}}</td>
        <td class="kind">{{tx.kind}}</td>
        <td class="value">${{$store.getters.priceByDate(tx.kind, 'USD', tx.date)}}</td>
        <td class="kind">USD</td>
      </tr>
    </table>
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

<template>
  <form v-on:submit.prevent="addAccount">
    <h2>Accounts</h2>
    <ul v-for="(_, account) in $store.state.accounts">
      <li>{{account}}</li>
    </ul>
    <input type="text" v-model="newAccount" class="address" placeholder="Ethereum Address" />
    <input type="submit" value="Add" v-on:click="addAccount" />
  </form>
</template>

<script>
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
      this.$store.dispatch('saveAccount', account).catch(err => {
        this.$store.commit('message', {kind: 'error', body: String(err)});
      });
      this.reset();
    },
  },
};
</script>

<style scoped>
input.address {
  width: 32em;
}
</style>

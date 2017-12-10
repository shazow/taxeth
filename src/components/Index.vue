<template>
  <form v-on:submit.prevent="addAccount">
    <h2>Accounts</h2>
    <ul v-for="(_, account) in $store.state.accounts">
      <li>{{account}}</li>
    </ul>
    <input type="text" v-model="newAccount" />
    <input type="submit" value="Add" v-on:click="addAccount" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Index',
  data () {
    return {
      newAccount: '',
    }
  },
  methods: {
    reset() {
      this.newAccount = '';
    },
    addAccount(e:Event) {
      if (!this.newAccount) return; // Ignore event
      // TODO: Validate?
      this.$store.commit('addAccount', this.newAccount);
      this.reset();
    }
  },
})
</script>

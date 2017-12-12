<template>
  <form v-on:submit.prevent="addAccount">
    <div class="error" v-if="$store.state.error">
      {{$store.state.error}}
    </div>
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
      const account = this.newAccount;
      if (!account) return; // Ignore event
      // TODO: Validate?
      this.$store.commit('addAccount', account);
      this.reset();

      const vm = this;
      window.web3.eth.filter({'address': account}, function(error:any, result:any) {
        console.log("filering");
        if (error) {
          // TODO: Undo addAccount?
          vm.$store.commit('error', JSON.stringify(error));
          return;
        }
        console.log(result);
      });
    }
  },
})
</script>

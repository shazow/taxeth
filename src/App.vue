<template>
  <div id="app">
    <ul class="messages" v-if="$store.state.messages" v-for="message in $store.state.messages">
      <li :class="message.kind">{{ message.body }}</li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0.5em 1em;
}

h2 {
  margin: 1em 0 0.5em 0;
  line-height: 1em;
}
form {
  margin-bottom: 2em;
}
</style>

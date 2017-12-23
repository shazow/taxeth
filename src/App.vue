<template>
  <div id="app">
    <div class="warning">
      <h3>WARNING</h3>
      <p>
        Do not use this for anything serious.
        It's a personal tool that is made to cover my own cases and has not been completed for general consumption.
      </p>
    </div>
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
.warning {
  width: 600px;
  display: block;
  text-align: center;
  color: rgba(150, 0, 0, 0.9);
  border: 1px solid rgba(200, 0, 0, 0.3);
  background-color:rgba(200, 0, 0, 0.1);
  margin: 0.5rem;
  font-weight: bold;
  font-size: 0.9rem;
}

.warning h3 {
  margin: 0.5rem 0rem;
  color: rgba(255, 0, 0, 0.9);
}
</style>

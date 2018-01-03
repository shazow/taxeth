<template>
  <div id="app">
    <ul class="messages" v-if="$store.state.messages" v-for="message in $store.state.messages">
      <li :class="message.kind">{{ message.body }}</li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
@import 'assets/css/style.css';
</style>

<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" id="vue-logo">
    <AppGame/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AppGame from './app-game/AppGame.vue';

  @Component({
    components: {
      AppGame,
    },
  })
  export default class App extends Vue {
  }
</script>

<style lang="scss">
  $top: 60px;

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: $top;
  }

  #vue-logo {
    position: absolute;
    z-index: -1;
    top: $top;
    left: 50%;
    margin-left: -100px;
    opacity: 0.5;
  }
</style>

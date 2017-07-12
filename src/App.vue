<template>
  <div id="app">
    <appHeader></appHeader>
    <router-view></router-view>
  </div>
</template>

<script src="../static/js/frozen.js"></script>
<script>
  import 'frozenui'
  import appHeader from '@/components/header'
  export default {
    name: 'app',
    components: {
      appHeader,
    },
    created() {
      //初始化rem
      let windowHeight = window.innerHeight;
      document.documentElement.style.minHeight = windowHeight + 'px';
      function resize() {
        let windowWidth = window.innerWidth;
        document.documentElement.style.fontSize = windowWidth/10 + 'px';
      }
      resize();
      window.onresize = resize;
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    border: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>

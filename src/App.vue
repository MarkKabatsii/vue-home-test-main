<template>
  <div id="app">
    <Header/>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";


export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style lang="scss">
@import "src/assets/style/variables";
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: $primary-font;
}

#app {
  margin: 0;
  padding: 0;
  color: $primary-color;
}
.container {
  width: 1250px;
  margin: 0 auto;
}
</style>

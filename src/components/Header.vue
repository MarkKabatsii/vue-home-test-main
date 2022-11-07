<template>
  <header class="Header">
    <h1>Spectr<span>u</span>m</h1>
    <div class="Header-line"></div>
    <router-link :to="{name: 'catalog'}"><h5>Home</h5></router-link>
  </header>
</template>

<script>
export default {
name: "Header"
}
</script>

<style lang="scss">
@import "src/assets/style/styles";

.Header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 175px;
  background-color: $bg-color;
}

.Header-line {
  width: 1250px;
  height: 1px;
  background-color: #d7d7d7;
}

h1 span {
  color: $secondary-color;
  font-size: 40px;
}

</style>
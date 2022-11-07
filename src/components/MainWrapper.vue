<template>
  <div class="MainWrapper" >
    <Header />
    <Catalog />
  </div>
</template>

<script>
import Catalog from '@/components/Catalog'
import Header from "@/components/Header";

export default {
name: "MainWrapper",
  components: {Header, Catalog},
}
</script >

<style lang="scss" scoped>
@import "src/assets/style/variables";

</style>
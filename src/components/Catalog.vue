<template>
  <div class="Catalog">
    <h2>Products</h2>
    <ul class="Catalog-wrapper">
      <CatalogItem
          v-for="product in PRODUCTS"
          :key="product.id"
          :products_data="product"
      />
    </ul>
  </div>

</template>

<script>
import CatalogItem from '@/components/CatalogItem'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "Catalog",
  components: {CatalogItem},
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'PRODUCTS'
    ])
  },
  methods: {...mapActions(['GET_PRODUCTS_FROM_API'])},
  mounted() {
    this.GET_PRODUCTS_FROM_API()
  }

}
</script>

<style lang="scss">

.Catalog {
    padding-top: 52px;
}

.Catalog-wrapper {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin-top: 80px;
  align-content: flex-start;
  padding: 0;
}
</style>
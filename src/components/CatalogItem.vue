<template>
    <li class="CatalogItem">
      <router-link
          :to="{name: 'product', params: {userID: products_data.id}}"
          class="CatalogItem_link">
        <img
            class="CatalogItem_image"
            :src="imager(products_data.images[0].url)" />
      </router-link>
      <p class="CatalogItem_title">{{products_data.title}}</p>
      <p class="CatalogItem_text">&#36;{{ products_data.min_price }}</p>
    </li>
</template>

<script>
export default {
name: "CatalogItem",
  props: {
  products_data: {
    type: Object,
    default(){
      return {}
    }
  }
  },
  methods: {
    imager(url) {
      return `https://fedtest.monolith.co.il/api/imager.php?url=${url}&type=fit&width=1000&height=1000&quality=70`
    }
  }
}
</script>

<style  lang="scss">
@import "src/assets/style/variables";
  .CatalogItem {
    width: 280px;
    height: 400px;
    margin: 0 16px 46px 16px;
  }
  .CatalogItem_link {
    display: block;
    height: 281px;
    overflow: hidden;
  }

  .CatalogItem_image {
    width: 100%;
  }

  .CatalogItem_title {
    font-family: $secondary-font;
    font-weight: $fw-bold;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.8px;
    color: $primary-color;
  }

  .CatalogItem_text {
    font-family: $secondary-font;
    font-weight: $fw-regular;
    font-size: 15px;
    line-height: 8px;
    letter-spacing: 0.6px;
  }
</style>
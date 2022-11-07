<template>
  <div class="Product">
    <!--    Product images-->
    <div
        v-if="variant_id === null"
        class="Product-images">
      <div class="Primary-image">
        <img :src="imager(productData.images[0].url)"/>
      </div>
      <div class="Secondary-image">
        <img
            v-for="image in productData.images"
            :key="image.id"
            :src="imager(image.url)"/>
      </div>
    </div>
    <!--Product Image Selected-->
    <div v-else class="Product-images">
      <div class="Primary-image">
        <img :src="imager(checkoutToCart[variant_id].image.url)"/>
      </div>
      <div class="Secondary-image">
        <img
            v-for="image in productData.images"
            :key="image.id"
            :src="imager(image.url)"/>
      </div>
    </div>
    <!--    Product Description-->
    <div v-if="variant_id === null" class="Product-description">
      <h3>{{ productData.title }}</h3>
      <p>&#36;{{ productData.min_price }}</p>
      <p>{{ productData.description }}</p>
    </div>
    <!--    Product Description Selected-->
    <div v-else class="Product-description">
      <h3>{{ checkoutToCart[variant_id].title }}</h3>
      <p>&#36;{{ checkoutToCart[variant_id].price }}</p>
      <p>{{ productData.description }}</p>
    </div>
    <!--    Select Form-->
    <div class="Product-select">
      <div>
        <m-select
            v-for="option in productData.attributes"
            :key="option.id"
            :options="option"
            :chooseAttributesFromSelect="chooseAttributesFromSelect"
        />
      </div>
      <div class="Product-Checkout">
        <p class="checkout">Quantity:</p>
        <div class="Product-Checkout__Group">
          <button
              class="btn-secondary"
              @click="removeQuantity">
            <i class="bi bi-dash"></i>
          </button>
          <div class="Product-quantity">{{ quantity }}</div>
          <button
              class="btn-secondary"
              @click="addQuantity">
            <i class="bi bi-plus"></i>
          </button>
        </div>
      </div>
      <div>
      </div>
<!--Click button / response add to cart-->
      <button
          :disabled="variant_id===null"
          class="btn-primary"
          @click.prevent="addToCart"
          :sel="reindexingProductData"
          :checkout="checkoutProduct"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import MSelect from "@/components/m-select";

export default {
  name: "Product",
  data() {
    return {
      productData: {},
      quantity: 1,
      checkoutToCart: {},
      arrayChooseAttributesFromSelect: [],
      variant_id: null
    }
  },
  components: {
    MSelect
  },
  methods: {
    chooseAttributesFromSelect(id, val) {
      for (let i = 0; i < this.arrayChooseAttributesFromSelect.length; i++) {
        if (this.arrayChooseAttributesFromSelect[i].attribute_id === id) {
          this.arrayChooseAttributesFromSelect[i].label_id = val;
        }
      }
    },
    imager(url) {
      return `https://fedtest.monolith.co.il/api/imager.php?url=${url}&type=fit&width=1000&height=1000&quality=70`
    },
    removeQuantity() {
      if (this.quantity <= 1) return false
      this.quantity = this.quantity - 1
    },
    addQuantity() {
      this.quantity = this.quantity + 1
    },
    addToCart() {
      axios.get('https://fedtest.monolith.co.il/api/cart/add?variant_id='+this.variant_id+'&quantity='+ this.quantity)
    }
  },
  computed: {
    reindexingProductData() {
      return this.productData.variants.reduce((accumulator, item) => {
        accumulator[item['id']] = item
        return accumulator
      }, this.checkoutToCart)
    },
    checkoutProduct() {
      const arr1 = this.arrayChooseAttributesFromSelect.map(item => Object.keys(item).map(key => item[key])).flat();
      let arg = null
      Object.keys(this.checkoutToCart).map(item =>
          this.checkoutToCart[item].labels
              .map(key => Object.keys(key)
                  .map(arg => key[arg]))
              .flat())
          .map((i, index) => {
            if (i.join() === arr1.join()) {
              Object.keys(this.checkoutToCart)
                  .filter((item, i) => {
                        if (index === i) {
                          arg = item
                        }
                      }
                  )
            }
          })
      return Object.keys(this.checkoutToCart).map(item => {
        if(item !== arg) this.variant_id = null
        this.variant_id = arg
      })
    }
  },
  mounted() {
    axios
        .get(`https://fedtest.monolith.co.il/api/catalog/get?id=` + this.$route.params.userID)
        .then(response => {
          this.productData = response.data.data
          for (let i = 0; i < this.productData.attributes.length; i++) {
            this.arrayChooseAttributesFromSelect.push({
              attribute_id: this.productData.attributes[i]['id'],
              label_id: null
            })
          }
        })
        .catch(error => {
          console.log(error);
        });
  },

}
</script>

<style lang="scss">
@import "src/assets/style/variables";

.Product {
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding-top: 69px;
}

.Product-images {
  width: 425px;
}

.Primary-image {
  width: 100%;
  height: 425px;
  overflow: hidden;
}

.Primary-image img {
  width: 100%;
}

.Secondary-image {
  width: 425px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 22px;
}

.Secondary-image img {
  max-width: 127px;
  width: 100%;
  margin-bottom: 21px;
}

.Product-description {
  width: 402px;
}

.Product-select {
  width: 290px;
}

.Product-Checkout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-left: 22px;
}

.Product-Checkout__Group {
  display: flex;
  align-items: center;
}

.checkout {
  font-family: $secondary-font;
  font-weight: $fw-light;
  color: $title-color;
  line-height: $text-height;
  letter-spacing: 0.38px;
}

.Product-quantity {
  width: 85px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $border-color;
  border-radius: 5px;
  font-family: $secondary-font;
  font-weight: $fw-light;
  font-size: $f-size-16;
  line-height: $text-height;
  letter-spacing: 0.4px;
  color: $title-color;
  margin: 0 9px;
}

select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d5d5d5;
  background: linear-gradient(#fff, #f7fcfb);
  text-align: start;
  padding: 14px 18px 15px 21px;
  font-family: $secondary-font;
  font-weight: $fw-light;
  font-size: 15px;
  line-height: 31px;
  letter-spacing: .4px;
  color: $title-color;
  cursor: pointer;
  width: 100%;
  margin-bottom: 20px;
}

button:disabled,
button[disabled]{
  border: 1px solid #999999;
  background: #ccc;
  color: #666666;
}
</style>
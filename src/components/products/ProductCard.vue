<template>
  <div class="product-card pb-2">
    <div class="product-details mb-1" :style="{'background-image': `url(${`${apiConfig.BASE_URL}/storage/images/${product.thumbnail}`})`}">
      <div class="product-info">
        <RouterLink :to="`products/${product.id}`" class="text-decoration-none product-name fs-3 fw-bold text-primary text-capitalize">{{ product.name }}</RouterLink>
        <p class="product-price fw-semibold text-black"><span>{{ formattedPrice }}</span></p>
      </div>
    </div>
    <div class="product-description-container px-2">
      <p class="product-description">{{ product.short_description }}</p>
      <button v-if="cartStatus === 0" class="btn btn-primary w-100 fw-bold text-white" @click="cartStatus = 1">Add to Cart</button>
      <div class="input-group" v-if="cartStatus === 1">
        <input type="number" min="1" v-model="quantity" class="form-control" >
        <button class="btn btn-primary fw-bold text-white" type="button" @click="handleAddToCart">Add to Cart</button>
      </div>
      <span v-if="cartStatus === 2" class="w-100 d-block rounded p-2 bg-primary text-center text-white fw-bold">
        Added to Cart
      </span>
    </div>
  </div>
</template>
<script>
import { USDollar } from '@/helpers/formatters';
import apiConfig from '@/config/api';
import { useProductStore } from '@/stores/productStore';
import cartSVG from '@/assets/svg/cart.svg';
import { RouterLink } from 'vue-router';

export default {
  setup() {
    const productStore = useProductStore();
      return {
          apiConfig,
          productStore,
          cartSVG,
      };
  },
  props: ['product'],
  data() {
    return {
      quantity: 1,
      cartStatus: 0,
    }
  },
  computed: {
    formattedPrice() {
      return USDollar.format(this.product.price);
    }
  },
  methods: {
    handleAddToCart() {
      if (this.quantity < 1) {
        this.quantity = 1;
      }
      this.productStore.addProductToCart(this.product, this.quantity);
      this.cartStatus = 2;
      setTimeout(() => {
        this.cartStatus = 0;
      }, 2000);
    }
  },
}
</script>

<style lang="scss" scoped>
  .product-card {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 10px;
    .product-details {
      border-radius: 10px 10px 0 0;
      position: relative;
      width: 100%;
      height: 300px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      Filter: Chroma(Color = #CCC);
      .product-info {
        position: absolute;
        bottom: 0;
        left: 10px;
      }
    }
    .product-description-container {
      .product-description {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
                line-clamp: 2; 
        -webkit-box-orient: vertical;
        line-height: 1.5em;
        height: 3em;
      }
    }
  }
</style>
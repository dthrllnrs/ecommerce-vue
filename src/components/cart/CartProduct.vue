<template>
  <div class="cart-product">
    <img class="cart-image me-2 d-none d-md-block" :src="`${apiConfig.BASE_URL}/storage/images/${product.thumbnail}`" alt="" srcset="">
    <div class="product-details">
      <p class="product-name text-capitalize mb-0 text-primary fs-6 fs-md-5 fw-bold">{{ product.name }}</p>
      <p class="product-price mb-0 fs-6 d-block d-md-none">{{ USDollar.format(product.price) }}</p>
      <p class="product-description mb-0 d-none d-md-block">{{ product.short_description }}</p>
    </div>
  </div>
</template>
<script>
import apiConfig from '@/config/api';
import { useProductStore } from '@/stores/productStore';
import { USDollar } from '@/helpers/formatters';

export default {
  setup() {
    const productStore = useProductStore();
      return {
          apiConfig,
          productStore,
          USDollar
      };
  },
  props: ['product'],
}
</script>

<style lang="scss" scoped>
  .cart-product {
    display: flex;
    justify-content: start;
    align-items: center;
    .cart-image {
      width: 80px;
      height: 80px;
      display: block;
    }
  }
</style>
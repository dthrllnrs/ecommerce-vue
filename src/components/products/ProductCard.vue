<template>
  <div class="product-card pb-2">
    <div class="product-details mb-1" :style="{'background-image': `url(${`${apiConfig.BASE_URL}/storage/images/${product.thumbnail}`})`}">
      <div class="product-info">
        <span class="product-name fs-3 fw-bold text-primary text-capitalize">{{ product.name }}</span>
        <p class="product-price fw-semibold text-black"><span>{{ formattedPrice }}</span></p>
      </div>
    </div>
    <div class="product-description-container px-2">
      <p class="product-description">{{ product.short_description }}</p>
      <button class="btn btn-primary w-100 fw-bold text-white">Add to Cart</button>
    </div>
  </div>
</template>
<script>
import { USDollar } from '@/helpers/formatters';
import apiConfig from '@/config/api';

export default {
  setup() {
      return {
          apiConfig,
      };
  },
  props: ['product'],
  data() {
    return {
    }
  },
  computed: {
    formattedPrice() {
      return USDollar.format(this.product.price);
    }
  }
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
<template>
  <div class="header text-center mb-5">
    <h3 class="fs-3 fw-semibold">Products</h3>
    <h2 class="fs-1 fw-bold text-primary">Featured Products</h2>
  </div>
  <div class="row">
    <ThePageLoader v-if="showLoading"/>
    <template v-else>
        <div class="col-12 col-md-3 mb-3" v-for="product in products" :key="product.id">
          <ProductCard :product="product"></ProductCard>
        </div>
    </template>
  </div>
</template>
<script>
import ProductCard from '../components/products/ProductCard.vue';
import { useProductStore } from '@/stores/productStore';
import { mapState } from 'pinia';
import ThePageLoader from '@/components/parts/ThePageLoader.vue';
import { useLoading } from '@/composables/loading.js';

export default {
  setup() {
      const { showLoading } = useLoading();
      const productStore = useProductStore();
      return {
          showLoading,
          productStore,
      };
  },
  components: {
    ProductCard,
    ThePageLoader,
  },
  computed: {
    ...mapState(useProductStore, ['products']),
  },
  mounted() {
    if (this.products.length === 0) {
      this.showLoading = true;
      this.productStore.fetchProducts().finally(() => {
        this.showLoading = false;
      });
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
<template>
    <ThePageLoader v-if="showLoading"/>
    <template v-else>
      <template v-if="apiError || !product">
        <div class="text-center">
          <span class="fw-bold fs-4 text-danger">Error loading product</span>
        </div>
      </template>
      <div v-else class="row">
        <div class="col-12 col-md-6">
          <img :src="`${apiConfig.BASE_URL}/storage/images/${product.thumbnail}`" class="me-3 rounded d-block w-100">
        </div>
        <div class="col-12 col-md-6">
          <div class="product-details pt-3">
            <p class="product-name fw-bold text-primary fs-3 text-capitalize"><span>{{ product.name }}</span></p>
            <p class="product-price fw-bold fs-4"><span>{{ USDollar.format(product.price) }}</span></p>
            <p class="product-description"><span>{{ product.description }}</span></p>
          </div>
          <div class="add-to-cart">
            <div class="row">
              <div class="col-12 col-md-3">
                <div class="input-group mb-3">
                  <span class="input-group-text">QTY</span>
                  <input min="1" type="number" class="form-control" v-model="quantity">
                </div>
              </div>
              <div class="col-12">
                <button class="btn btn-primary w-100 fw-bold text-white mb-2" @click="handleAddToCart">Add to Cart</button>
                <RouterLink to="/" custom v-slot="{ navigate }">
                  <button class="btn btn-secondary w-100 fw-bold" @click="navigate">Back to product list</button>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
  </template>
</template>
<script>
import { USDollar } from '@/helpers/formatters';
import apiConfig from '@/config/api';
import { useProductStore } from '@/stores/productStore';
import cartSVG from '@/assets/svg/cart.svg';
import ThePageLoader from '@/components/parts/ThePageLoader.vue';
import { useLoading } from '@/composables/loading.js';
import { RouterLink } from 'vue-router';

export default {
  setup() {
    const productStore = useProductStore();
    const { showLoading } = useLoading();
    return {
        apiConfig,
        productStore,
        cartSVG,
        showLoading,
        USDollar
    };
  },
  components: {
    ThePageLoader,
  },  
  data() {
    return {
      quantity: 1,
      product: {},
      apiError: false,
    }
  },
  methods: {
    handleAddToCart() {
      if (this.quantity < 1) {
        this.quantity = 1;
      }
      this.productStore.addProductToCart(this.product, this.quantity);
    },
  },
  mounted() {
    this.showLoading = true;
    const id = this.$route.params.id;
    this.productStore.fetchProductById(id).then((product) => {
      this.product = product;
    }).catch(() => {
      this.apiError = true;
    }).finally(() => {
      this.showLoading = false;
    });
  },
}
</script>
<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <div class="grand-total mb-3">
        <span class="label">Order Total</span>
        <p class="fs-3 fw-bold"><span>{{ USDollar.format(grandTotal) }}</span></p>
      </div>
      <div class="order-details">
        <table class="table table-borderless">
          <tbody>
            <template v-for="(cartProduct, index) in cartProducts" :key="index">
              <tr>
                <td style="width: 60px;"><img class="product-image" :src="`${apiConfig.BASE_URL}/storage/images/${cartProduct.product.thumbnail}`"></td>
                <td>
                  <p class="product-name text-capitalize fw-bold mb-0"><span>{{ cartProduct.product.name }}</span></p>
                  <p class="order-quantity">Qty: <span class="fw-bold">{{ cartProduct.quantity }}</span></p>
                </td>
                <td class="text-end">
                  <p class="product-total fw-bold mb-0"><span>{{ USDollar.format(cartProduct.total) }}</span></p>
                  <p class="order-quantity"><span>{{ USDollar.format(cartProduct.product.price) }}</span> each</p>
                </td>
              </tr>
            </template>
            <tr class="border-top">
              <td></td>
              <td>
                <p class="fw-bold fs-5">Order Total: </p>
              </td>
              <td class="text-end">
                <p class="fw-bold fs-5"><span>{{ USDollar.format(grandTotal) }}</span></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="container">
      <template v-if="Object.keys(cartProducts).length === 0">
        <div class="text-center mb-3">
          You don't have any products in your cart
        </div>
        <RouterLink to="/" custom v-slot="{ navigate }">
          <button class="btn btn-primary fw-bold text-white w-100" @click="navigate">Browse Products</button>
        </RouterLink>
      </template>
      <template v-else>
        <form @submit.prevent="handleSubmit">
          <p class="fw-bold">Customer Details</p>
          <div class="mb-3">
            <label for="firstname">Firstname</label>
            <input v-model="customer.firstname" required type="text" placeholder="Firstname" name="firstname" id="firstname" class="form-control">
          </div>
          <div class="mb-3">
            <label for="lastname">Lastname</label>
            <input v-model="customer.lastname" required type="text" placeholder="Lastname" name="lastname" id="lastname" class="form-control">
          </div>
          <div class="mb-3">
            <label for="email">Email</label>
            <input v-model="customer.email" required type="email" placeholder="Email" name="email" id="email" class="form-control">
          </div>
          <span class="text-danger d-block mb-3" v-if="apiError">Uncaught server error</span>
          <span class="text-primary d-block mb-3" v-if="apiSuccess">Order successful. Redirecting...</span>
          <button v-else class="btn btn-primary fw-bold text-white w-100" type="submit" :disabled="loading">{{ loading ? 'Loading...' : 'Checkout' }}</button>
        </form>
      </template>
      </div>
    </div>
  </div>
</template>
<script>
import { USDollar } from '@/helpers/formatters';
import { useProductStore } from '@/stores/productStore';
import { mapState } from 'pinia';
import apiConfig from '@/config/api';
import { RouterLink } from 'vue-router';

export default {
  setup() {
    const productStore = useProductStore();
      return {
          productStore,
          USDollar,
          apiConfig,
      };
  },
  computed: {
    ...mapState(useProductStore, ['cartProducts']),
    grandTotal() {
      return this.productStore.cartTotal;
    },    
  },
  data() {
    return {
      customer: {
        firstname: '',
        lastname: '',
        email: '',
      },
      apiError: false,
      loading: false,
      apiSuccess: false,
    }
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      this.apiError = false;
      this.productStore.checkout(this.customer).then((response) => {
        this.apiSuccess = true;
        setTimeout(() => {
          this.productStore.clearCart();
          this.$router.push('/');
        }, 3000);
      }).catch((error) => {
        this.apiError = true;
      }).finally(() => {
        this.loading = false;
      });
    }
  },
}
</script>

<style lang="scss" scoped>
  .product-image {
    width: 60px;
    height: 60px;
  }
</style>
<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container">
      <router-link to="/" class="navbar-brand text-primary fw-bold">PurchasePro</router-link>
      <CartButton />
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router';
import CartButton from '@/components/cart/CartButton.vue';
export default {
  components: {
    CartButton,
  }
}
</script>
<template>
  <TheNavbar />
  <div class="main-container">
    <div class="container py-5">
      <main>
        <RouterView />
      </main>
    </div>
  </div>
  <CartModal />
</template>
<script>
import { RouterView } from 'vue-router'
import TheNavbar from '@/components/parts/TheNavbar.vue';
import CartModal from '@/components/cart/CartModal.vue';
export default {
  components: {
    TheNavbar,
    CartModal,
  },
}
</script>
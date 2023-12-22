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
import { useModalStore } from '@/stores/modalStore';
import { mapWritableState } from 'pinia';
import { Modal } from 'bootstrap';

export default {
  setup() {
    const modalStore = useModalStore();
    return {
      modalStore,
    }
  },
  components: {
    TheNavbar,
    CartModal,
  },
  computed: {
    ...mapWritableState(useModalStore, ['cartModal']),
  },
  mounted() {
    this.cartModal = new Modal(document.getElementById('cartModal'));
  },
  beforeRouteLeave() {
    this.cartModal.hide();
  },
}
</script>

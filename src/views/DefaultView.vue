<template>
  <TheNavbar />
  <div class="main-container">
    <div class="container py-5">
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>
<script>
import { RouterView } from 'vue-router'
import TheNavbar from '@/components/parts/TheNavbar.vue';
export default {
  components: {
    TheNavbar
  },
}
</script>
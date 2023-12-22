import { createRouter, createWebHistory } from 'vue-router'
import DefaultView from '@/views/DefaultView.vue'
import HomePage from '@/pages/HomePage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import CheckoutPage from '@/pages/CheckoutPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DefaultView,
      children: [
        {
          path: '/',
          component: HomePage,
          name: 'home page',
        },
        {
          path: 'products/:id',
          component: ProductPage,
          name: 'product page',
        },
        {
          path: 'checkout',
          component: CheckoutPage,
          name: 'checkout page',
        },
      ]
    },
  ]
})

export default router

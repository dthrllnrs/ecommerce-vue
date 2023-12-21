import { createRouter, createWebHistory } from 'vue-router'
import DefaultView from '@/views/DefaultView.vue'
import HomePage from '@/pages/HomePage.vue'

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
        }
      ]
    },
  ]
})

export default router

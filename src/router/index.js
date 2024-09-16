import { createRouter, createWebHistory } from 'vue-router';
import DealsView from '../views/DealsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'deals',
      component: DealsView
    }
  ]
});

export default router;

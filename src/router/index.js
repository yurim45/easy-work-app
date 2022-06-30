import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/point',
    name: 'point',
    component: () =>
      import(
        /* webpackChunkName: 'point', webpackPrefetch: true */ '../views/PointView.vue'
      ),
  },
  {
    path: '/point/record',
    name: 'pointRecord',
    component: () =>
      import(
        /* webpackChunkName: 'pointRecord', webpackPrefetch: true */ '../views/RecordPorinsView.vue'
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

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
        /* webpackChunkName: 'pointRecord', webpackPrefetch: true */ '../components/point/common/RecordPorinsView.vue'
      ),
    props: true,
  },
  {
    path: '/admin',
    name: 'admin',
    component: () =>
      import(
        /* webpackChunkName: 'admin', webpackPrefetch: true */ '../views/AdminView.vue'
      ),
  },
  {
    path: '/admin/issuance',
    name: 'pointsIssuance',
    component: () =>
      import(
        /* webpackChunkName: 'adminPoint', webpackPrefetch: true */ '../components/point/admin/PointsIssuance.vue'
      ),
  },
  {
    path: '/admin/status',
    name: 'PointStatus',
    component: () =>
      import(
        /* webpackChunkName: 'adminPoint', webpackPrefetch: true */ '../components/point/admin/PointStatus.vue'
      ),
  },
  {
    path: '/day-off',
    name: 'dayOff',
    component: () =>
      import(
        /* webpackChunkName: 'dayOff', webpackPrefetch: true */ '../views/DayOff.vue'
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

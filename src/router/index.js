import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MenuView from '../views/MenuView.vue';
import NewsView from '../views/NewsView.vue';

import store from '@/store';

const beforeAuth = (isAuth, isAdminCheck) => (from, to, next) => {
  const isAuthenticated = store.getters['isAuthenticated'];
  const isAdmin = store.getters.me.role !== 'User' ? true : false;

  if ((isAuthenticated && isAuth) || (!isAuthenticated && !isAuth)) {
    if (
      (isAdminCheck && isAdmin) ||
      (!isAdminCheck && !isAdmin) ||
      (!isAdminCheck && isAdmin)
    ) {
      return next();
    } else {
      alert('관리자만 이용 가능합니다.');
      next('/');
    }
  } else {
    next('/');
  }
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView,
  },
  {
    path: '/news',
    name: 'newsView',
    component: NewsView,
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: () =>
      import(/* webpackChunkName: "mypage" */ '../views/MypageView.vue'),
    beforeEnter: beforeAuth(true),
    props: true,
  },

  /*
   * admin
   */
  {
    path: '/admin',
    name: 'admin',
    component: () =>
      import(/* webpackChunkName: "admin" */ '../views/AdminView.vue'),
    beforeEnter: beforeAuth(true, true),
    props: true,
  },

  /*
   * admin day-off
   */
  {
    path: '/admin/day-off',
    name: 'adminDayOff',
    component: () =>
      import(
        /* webpackChunkName: "admin" */ '@/components/admin/AdminDayOff.vue'
      ),
    beforeEnter: beforeAuth(true, true),
    props: true,
  },
  {
    path: '/admin/day-off/detail',
    name: 'adminDayOffDetail',
    component: () =>
      import(
        /* webpackChunkName: "admin" */ '@/components/day-off/DayOffDetail.vue'
      ),
    beforeEnter: beforeAuth(true, true),
    props: true,
  },
  {
    path: '/admin/day-off/user-detail',
    name: 'dayOffUserDetail',
    component: () =>
      import(
        /* webpackChunkName: "admin" */ '@/components/admin/day-off/DayOffUserDetail.vue'
      ),
    beforeEnter: beforeAuth(true, true),
    props: true,
  },
  {
    path: '/admin/day-off/create',
    name: 'CreateDayOff',
    component: () =>
      import(
        /* webpackChunkName: "admin" */ '@/components/admin/day-off/CreateDayOff.vue'
      ),
    beforeEnter: beforeAuth(true, true),
    props: true,
  },

  /*
   * admin point
   */
  {
    path: '/admin/point',
    name: 'adminPoint',
    component: () =>
      import(
        /* webpackChunkName: "admin" */ '@/components/admin/AdminPoint.vue'
      ),
    beforeEnter: beforeAuth(true, true),
    props: true,
  },
  {
    path: '/admin/point/item-detail',
    name: 'pointItemDetail',
    component: () =>
      import(
        /* webpackChunkName: "admin" */ '@/components/admin//point/PointItemDetail.vue'
      ),
    beforeEnter: beforeAuth(true, true),
    props: true,
  },
  {
    path: '/admin/point/user-detail',
    name: 'pointUserDetail',
    component: () =>
      import(
        /* webpackChunkName: "admin" */ '@/components/admin//point/PointUserDetail.vue'
      ),
    beforeEnter: beforeAuth(true, true),
    props: true,
  },
  {
    path: '/admin/point/create',
    name: 'createPoint',
    component: () =>
      import(
        /* webpackChunkName: "admin" */ '@/components/admin//point/CreatePoint.vue'
      ),
    beforeEnter: beforeAuth(true, true),
    props: true,
  },
  {
    path: '/admin/point/detail',
    name: 'adminPointDetail',
    component: () =>
      import(
        /* webpackChunkName: "admin" */ '@/components/admin/point/AdminPointDetail.vue'
      ),
    beforeEnter: beforeAuth(true, true),
    props: true,
  },

  /*
   * admin item
   */
  {
    path: '/admin/supply',
    name: 'adminSupply',
    component: () =>
      import(
        /* webpackChunkName: "admin" */ '@/components/admin/AdminSupply.vue'
      ),
    beforeEnter: beforeAuth(true, true),
    props: true,
  },
  {
    path: '/admin/supply/user-detail',
    name: 'supplyUserDetail',
    component: () =>
      import(
        /* webpackChunkName: "admin" */ '@/components/admin/item/SupplyUserDetail.vue'
      ),
    beforeEnter: beforeAuth(true, true),
    props: true,
  },

  /*
   * day-off
   */
  {
    path: '/day-off',
    name: 'dayOff',
    component: () =>
      import(/* webpackChunkName: "dayOff" */ '../views/DayOffView.vue'),
    beforeEnter: beforeAuth(true),
    props: true,
  },
  {
    path: '/day-off/apply',
    name: 'applyDayOff',
    component: () =>
      import(
        /* webpackChunkName: "dayOff" */ '@/components/day-off/ApplyDayOff.vue'
      ),
    beforeEnter: beforeAuth(true),
    props: true,
  },
  {
    path: '/day-off/detail',
    name: 'dayOffDetail',
    component: () =>
      import(
        /* webpackChunkName: "dayOff" */ '@/components/day-off/DayOffDetail.vue'
      ),
    beforeEnter: beforeAuth(true),
    props: true,
  },

  /*
   * point
   */
  {
    path: '/point',
    name: 'point',
    component: () =>
      import(/* webpackChunkName: "point" */ '../views/PointView.vue'),
    beforeEnter: beforeAuth(true),
    props: true,
  },
  {
    path: '/point/detail',
    name: 'pointDetail',
    component: () =>
      import(
        /* webpackChunkName: "point" */ '@/components/point/PointDetail.vue'
      ),
    beforeEnter: beforeAuth(true),
    props: true,
  },
  {
    path: '/point/share',
    name: 'pointShare',
    component: () =>
      import(
        /* webpackChunkName: "point" */ '@/components/point/PointShare.vue'
      ),
    beforeEnter: beforeAuth(true),
    props: true,
  },
  {
    path: '/point/input',
    name: 'pointInput',
    component: () =>
      import(
        /* webpackChunkName: "point" */ '@/components/point/PointInput.vue'
      ),
    beforeEnter: beforeAuth(true),
    props: true,
  },

  /*
   * item
   */
  {
    path: '/item',
    name: 'item',
    component: () =>
      import(/* webpackChunkName: "item" */ '../views/ItemView.vue'),
    beforeEnter: beforeAuth(true),
    props: true,
  },
  {
    path: '/item/supply',
    name: 'supplyItem',
    component: () =>
      import(/* webpackChunkName: "item" */ '@/components/item/SupplyItem.vue'),
    beforeEnter: beforeAuth(true),
    props: true,
  },
  {
    path: '/item/detail',
    name: 'supplyDetail',
    component: () =>
      import(
        /* webpackChunkName: "item" */ '@/components/item/SupplyDetail.vue'
      ),
    beforeEnter: beforeAuth(true),
    props: true,
  },

  /*
   * board
   */
  {
    path: '/board',
    name: 'board',
    component: () =>
      import(/* webpackChunkName: "board" */ '../views/BoardView.vue'),
    beforeEnter: beforeAuth(true),
    props: true,
  },

  /*
   * voting
   */
  {
    path: '/voting',
    name: 'voting',
    component: () =>
      import(/* webpackChunkName: "voting" */ '../views/VoteView.vue'),
    beforeEnter: beforeAuth(true),
    props: true,
  },

  /*
   * gacha
   */
  {
    path: '/gacha',
    name: 'gacha',
    component: () =>
      import(/* webpackChunkName: "gacha" */ '../views/GachaView.vue'),
    beforeEnter: beforeAuth(true),
    props: true,
  },

  /*
   * dailyMenu
   */
  {
    path: '/daily-menu',
    name: 'dailyMenu',
    component: () =>
      import(/* webpackChunkName: "dailyMenu" */ '../views/DailyMenuView.vue'),
    beforeEnter: beforeAuth(true),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(), //process.env.BASE_URL
  routes,
});

export default router;

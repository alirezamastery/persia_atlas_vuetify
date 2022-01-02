import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Login from '@/views/auth/Login'
import Brands from '@/views/Products/Brands'
import NotFound from '@/views/NotFound'
import Panel from '@/views/auth/Panel'
import BrandDetail from '@/views/Products/BrandDetail'
import ActualProducts from '@/views/Products/ActualProducts'
import ActualProductDetail from '@/views/Products/ActualProductDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Brands',
    component: Brands,
    meta: {requiresAuth: true},
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {requiresAuth: true},
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      key: 'login',
      title: 'login',
      guest: true,
    },
    component: Login,
  },
  {
    path: '/panel',
    component: Panel,
    name: 'Panel',
    meta: {requiresAuth: true},
  },
  {
    path: '/brands',
    component: Brands,
    name: 'Brands',
    meta: {requiresAuth: true},
  },
  {
    path: '/brands/:id',
    component: BrandDetail,
    name: 'BrandDetail',
    meta: {requiresAuth: true},
    props: true,
  },
  {
    path: '/actual-products',
    component: ActualProducts,
    name: 'ActualProducts',
    meta: {requiresAuth: true},
  },
  {
    path: '/actual-products/:id',
    component: ActualProductDetail,
    name: 'ActualProductDetail',
    meta: {requiresAuth: true},
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
]

export const routesObj = {
  home: {
    path: '/',
    name: 'Brands',
    component: Brands,
    meta: {requiresAuth: false},
  },
  login: {
    path: '/login',
    name: 'Login',
    meta: {
      key: 'login',
      title: 'login',
      guest: true,
    },
    component: Login,
  },
  brands: {
    path: '/brands',
    component: Brands,
    name: 'Brands',
    meta: {
      titleI18n: 'general.routes.units',
      icon: 'mdi-home',
      requiresAuth: false,
    },
  },
  '404': {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // routes,
  routes: Object.values(routesObj),
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta['requiresAuth'])) {
    if (store.getters['auth/isAuthenticated']) {
      next()
      return
    }
    next({name: 'Login'})
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta['guest'])) {
    if (store.getters['auth/isAuthenticated']) {
      next({name: 'Brands'})
      return
    }
    next()
  } else {
    next()
  }
})

export default router

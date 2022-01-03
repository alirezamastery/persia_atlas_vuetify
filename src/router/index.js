import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Home from '@/views/Home'
import Login from '@/views/auth/Login'
import Brands from '@/views/products/Brands'
import NotFound from '@/views/NotFound'
import Panel from '@/views/auth/Panel'
import BrandDetail from '@/views/products/BrandDetail'
import ActualProducts from '@/views/products/ActualProducts'
import ActualProductDetail from '@/views/products/ActualProductDetail'
import * as views from './chunks'

Vue.use(VueRouter)

const actualProductsList = () => import(/* webpackChunkName: "products" */ '../views/products/actualProducts/List.vue')
const actualProductsDetails = () => import(/* webpackChunkName: "products" */ '../views/products/actualProducts/Details.vue')

const brandsDetails = () => import(/* webpackChunkName: "products" */ '../views/products/actualProducts/List.vue')
const brandsList = () => import(/* webpackChunkName: "products" */ '../views/products/actualProducts/Details.vue')

const Details = () => import(/* webpackChunkName: "products" */ '../views/products/actualProducts/List.vue')
const List = () => import(/* webpackChunkName: "products" */ '../views/products/actualProducts/Details.vue')

export const routesObj = {
  // Auth
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
  home: {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      titleI18n: 'general.routes.home',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  // Products
  actualProductsList: {
    path: '/actual-products',
    component: views.actualProductsList,
    name: 'actualProductsList',
    meta: {
      titleI18n: 'general.routes.actualProducts',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  actualProductsDetails: {
    path: '/actual-products/:id',
    component: views.actualProductsDetails,
    name: 'actualProductsDetails',
    meta: {
      titleI18n: 'general.routes.actualProducts',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },

  brandsList: {
    path: '/brands',
    component: views.brandsList,
    name: 'brandsList',
    meta: {
      titleI18n: 'general.routes.brands',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  brandsDetails: {
    path: '/brands/:id',
    component: views.brandsDetails,
    name: 'brandsDetails',
    meta: {
      titleI18n: 'general.routes.brands',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },

  productsList: {
    path: '/products',
    component: views.productsList,
    name: 'productsList',
    meta: {
      titleI18n: 'general.routes.products',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  productsDetails: {
    path: '/products/:id',
    component: views.productsDetails,
    name: 'productsDetails',
    meta: {
      titleI18n: 'general.routes.products',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },

  productTypesList: {
    path: '/product-types',
    component: views.productTypesList,
    name: 'productTypesList',
    meta: {
      titleI18n: 'general.routes.productTypes',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  productTypesDetails: {
    path: '/product-types/:id',
    component: views.productTypesDetails,
    name: 'productTypesDetails',
    meta: {
      titleI18n: 'general.routes.productTypes',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },

  productTypeSelectorsList: {
    path: '/product-type-selectors',
    component: views.productTypeSelectorsList,
    name: 'productTypeSelectorsList',
    meta: {
      titleI18n: 'general.routes.productTypes',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  productTypeSelectorsDetails: {
    path: '/product-type-selectors/:id',
    component: views.productTypeSelectorsDetails,
    name: 'productTypeSelectorsDetails',
    meta: {
      titleI18n: 'general.routes.productTypeSelectors',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },

  productTypeSelectorValuesList: {
    path: '/product-type-selector-values',
    component: views.productTypeSelectorValuesList,
    name: 'productTypeSelectorValuesList',
    meta: {
      titleI18n: 'general.routes.productTypeSelectorValues',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  productTypeSelectorValuesDetails: {
    path: '/product-type-selector-values/:id',
    component: views.productTypeSelectorValuesDetails,
    name: 'productTypeSelectorValuesDetails',
    meta: {
      titleI18n: 'general.routes.productTypeSelectorValues',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },

  variantsList: {
    path: '/variants',
    component: views.variantsList,
    name: 'variantsList',
    meta: {
      titleI18n: 'general.routes.variants',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  variantsDetails: {
    path: '/variants/:id',
    component: views.variantsDetails,
    name: 'variantsDetails',
    meta: {
      titleI18n: 'general.routes.variants',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  // Error
  '404': {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    props: true,
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

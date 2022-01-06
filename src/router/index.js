import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Home from '@/views/Home'
import Login from '@/views/auth/Login'
import NotFound from '@/views/NotFound'
import * as views from './chunks'

Vue.use(VueRouter)

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

  // Products App
  // ***************** Actual Products *****************
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
  actualProductAdd: {
    path: '/actual-products/add',
    component: views.actualProductAddEdit,
    name: 'actualProductAdd',
    meta: {
      requiresAuth: true,
    },
  },
  actualProductEdit: {
    path: '/actual-products/edit/:id',
    component: views.actualProductAddEdit,
    name: 'actualProductEdit',
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  // ***************** Brands *****************
  brandList: {
    path: '/brands',
    component: views.brandList,
    name: 'brandList',
    meta: {
      titleI18n: 'general.routes.brands',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  brandAdd: {
    path: '/brands/add',
    component: views.brandAddEdit,
    name: 'brandAdd',
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  brandEdit: {
    path: '/brands/edit/:id',
    component: views.brandAddEdit,
    name: 'brandEdit',
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  // ***************** Products *****************
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
  productAddEdit: {
    path: '/products/:id',
    component: views.productAddEdit,
    name: 'productAddEdit',
    props: true,
    meta: {
      titleI18n: 'general.routes.products',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  // ***************** Product Types *****************
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
  productTypeAddEdit: {
    path: '/product-types/:id',
    component: views.productTypeAddEdit,
    name: 'productTypeAddEdit',
    props: true,
    meta: {
      titleI18n: 'general.routes.productTypes',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  // ***************** Product Type Selectors *****************
  productTypeSelectorsList: {
    path: '/product-type-selectors',
    component: views.productTypeSelectorsList,
    name: 'productTypeSelectorsList',
    meta: {
      titleI18n: 'general.routes.productTypeSelectors',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  productTypeSelectorAddEdit: {
    path: '/product-type-selectors/:id',
    component: views.productTypeSelectorAddEdit,
    name: 'productTypeSelectorAddEdit',
    props: true,
    meta: {
      titleI18n: 'general.routes.productTypeSelectors',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  // ***************** Product Type Selector Values *****************
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
  productTypeSelectorValueAddEdit: {
    path: '/product-type-selector-values/:id',
    component: views.productTypeSelectorValueAddEdit,
    name: 'productTypeSelectorValueAddEdit',
    props: true,
    meta: {
      titleI18n: 'general.routes.productTypeSelectorValues',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  // ***************** Variants *****************
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
  variantAdd: {
    path: '/variants/add',
    component: views.variantAddEdit,
    name: 'variantAdd',
    meta: {
      requiresAuth: true,
    },
  },
  variantEdit: {
    path: '/variants/edit/:id?',
    component: views.variantAddEdit,
    name: 'variantEdit',
    props: true,
    meta: {
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

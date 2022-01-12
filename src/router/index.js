import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Home from '@/views/Home'
import Login from '@/views/auth/Login'
import NotFound from '@/views/NotFound'
import Profile from '@/views/dashboard/Profile'
import JustRain from '@/views/JustRain'
import * as views from './chunks'
import {editVariantStatus} from './chunks'

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
    redirect: {name: 'editVariantStatus'},
    meta: {
      titleI18n: 'general.routes.home',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },

  profile: {
    path: '/user/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },

  // Products App
  // ***************** Actual Products *****************
  actualProductList: {
    path: '/actual-products',
    component: views.actualProductsList,
    name: 'actualProductList',
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
  productList: {
    path: '/products',
    component: views.productsList,
    name: 'productList',
    meta: {
      titleI18n: 'general.routes.products',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  productAdd: {
    path: '/products/add',
    component: views.productAddEdit,
    name: 'productAdd',
    meta: {
      requiresAuth: true,
    },
  },
  productEdit: {
    path: '/products/edit/:id',
    component: views.productAddEdit,
    name: 'productEdit',
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  // ***************** Product Types *****************
  productTypeList: {
    path: '/product-types',
    component: views.productTypesList,
    name: 'productTypeList',
    meta: {
      titleI18n: 'general.routes.productTypes',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  productTypeAdd: {
    path: '/product-types/add',
    component: views.productTypeAddEdit,
    name: 'productTypeAdd',
    meta: {
      requiresAuth: true,
    },
  },
  productTypeEdit: {
    path: '/product-types/edit/:id',
    component: views.productTypeAddEdit,
    name: 'productTypeEdit',
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  // ***************** Product Type Selectors *****************
  productTypeSelectorList: {
    path: '/product-type-selectors',
    component: views.productTypeSelectorsList,
    name: 'productTypeSelectorList',
    meta: {
      titleI18n: 'general.routes.productTypeSelectors',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  productTypeSelectorAdd: {
    path: '/product-type-selectors/add',
    component: views.productTypeSelectorAddEdit,
    name: 'productTypeSelectorAdd',
    meta: {
      requiresAuth: true,
    },
  },
  productTypeSelectorEdit: {
    path: '/product-type-selectors/edit/:id',
    component: views.productTypeSelectorAddEdit,
    name: 'productTypeSelectorEdit',
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  // ***************** Product Type Selector Values *****************
  productTypeSelectorValueList: {
    path: '/product-type-selector-values',
    component: views.productTypeSelectorValuesList,
    name: 'productTypeSelectorValueList',
    meta: {
      titleI18n: 'general.routes.productTypeSelectorValues',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  productTypeSelectorValueAdd: {
    path: '/product-type-selector-values/add',
    component: views.productTypeSelectorValueAddEdit,
    name: 'productTypeSelectorValueAdd',
    meta: {
      requiresAuth: true,
    },
  },
  productTypeSelectorValueEdit: {
    path: '/product-type-selector-values/edit/:id',
    component: views.productTypeSelectorValueAddEdit,
    name: 'productTypeSelectorValueEdit',
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  // ***************** Variants *****************
  variantList: {
    path: '/variants',
    component: views.variantsList,
    name: 'variantList',
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

  // Robot
  // ***************** Variant Status *****************
  editVariantStatus: {
    path: '/robot/variant-status',
    component: views.editVariantStatus,
    name: 'editVariantStatus',
    meta: {
      titleI18n: 'general.routes.variantStatus',
      requiresAuth: true,
    },
  },

  // Matrix Rain
  justRain: {
    path: '/just-rain',
    component: JustRain,
    name: 'JustRain',
    meta: {guest: true},
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

router.beforeEach((to, from, next) => {
  store.commit('CLEAR_ALERTS')
  store.commit('CLEAR_HTTP_QUEUE')
  const pendingAlerts = store.state.pendingAlerts
  for (const pendingAlert of pendingAlerts) {
    store.commit('ADD_ALERT', pendingAlert)
  }
  store.commit('CLEAR_PENDING_ALERTS')
  next()
})

export default router

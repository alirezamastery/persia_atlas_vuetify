import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Login from '@/views/auth/Login'
import Logout from '@/views/auth/Logout'
import NotFound from '@/views/NotFound'
import Profile from '@/views/dashboard/Profile'
import JustRain from '@/views/JustRain'
import * as views from './chunks'
import {costList, editVariantStatus} from './chunks'

Vue.use(VueRouter)

export const routesObj = {
  Home: {
    path: '/',
    name: 'Home',
    redirect: {name: 'editVariantStatus'},
    meta: {
      titleI18n: 'general.routes.home',
      icon: 'mdi-home',
      requiresAuth: true,
    },
  },
  // #################### Auth ####################
  Login: {
    path: '/login',
    name: 'Login',
    meta: {
      key: 'login',
      title: 'login',
      guest: true,
    },
    component: Login,
  },
  Logout: {
    path: '/logout',
    name: 'Logout',
    meta: {
      requiresAuth: true,
    },
    component: Logout,
  },
  Profile: {
    path: '/user/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },

  // #################### Products App ####################
  // ********** Actual Products **********
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
  // ********** Brands **********
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
  // ********** Products **********
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
  // ********** Product Types **********
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
  // ********** Product Type Selectors **********
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
  // ********** Product Type Selector Values **********
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
  // ********** Variants **********
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

  // #################### Robot ####################
  // ********** Variant Status **********
  editVariantStatus: {
    path: '/robot/variant-status',
    component: views.editVariantStatus,
    name: 'editVariantStatus',
    meta: {
      titleI18n: 'general.routes.variantStatus',
      requiresAuth: true,
    },
  },
  // ********** Invoice Download **********
  invoiceDownload: {
    path: '/robot/invoice-download',
    component: views.invoiceDownload,
    name: 'invoiceDownload',
    meta: {
      titleI18n: 'general.routes.invoices',
      requiresAuth: true,
    },
  },
  // ********** Digi Credentials **********
  digiCredentials: {
    path: '/robot/digi-creds',
    component: views.digiCredentials,
    name: 'digiCredentials',
    meta: {
      titleI18n: 'general.routes.digiPassword',
      requiresAuth: true,
    },
  },

  // #################### Accounting ####################
  // ********** Cost **********
  costList: {
    path: '/accounting/costs',
    component: views.costList,
    name: 'costList',
    meta: {
      titleI18n: 'acc.costs',
      requiresAuth: true,
    },
  },
  costAdd: {
    path: '/accounting/costs/add',
    component: views.costAddEdit,
    name: 'costAdd',
    meta: {
      requiresAuth: true,
    },
  },
  costEdit: {
    path: '/accounting/costs/edit/:id?',
    component: views.costAddEdit,
    name: 'costEdit',
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  // ********** Cost Type **********
  costTypeList: {
    path: '/accounting/cost-types',
    component: views.costTypeList,
    name: 'costTypeList',
    meta: {
      titleI18n: 'acc.costTypes',
      requiresAuth: true,
    },
  },
  costTypeAdd: {
    path: '/accounting/costs-types/add',
    component: views.costTypeAddEdit,
    name: 'costTypeAdd',
    meta: {
      requiresAuth: true,
    },
  },
  costTypeEdit: {
    path: '/accounting/costs-types/edit/:id?',
    component: views.costTypeAddEdit,
    name: 'costTypeEdit',
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  // ********** Income **********
  incomeList: {
    path: '/accounting/income',
    component: views.incomeList,
    meta: {
      titleI18n: 'acc.incomes',
      requiresAuth: true,
    },
  },
  incomeAdd: {
    path: '/accounting/income/add',
    component: views.incomeAddEdit,
    meta: {
      requiresAuth: true,
    },
  },
  incomeEdit: {
    path: '/accounting/income/edit/:id?',
    component: views.incomeAddEdit,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  // ********** Product Cost **********
  productCostList: {
    path: '/accounting/product-cost',
    component: views.productCostList,
    meta: {
      titleI18n: 'acc.productCosts',
      requiresAuth: true,
    },
  },
  productCostAdd: {
    path: '/accounting/product-cost/add',
    component: views.productCostAddEdit,
    meta: {
      requiresAuth: true,
    },
  },
  productCostEdit: {
    path: '/accounting/product-cost/edit/:id?',
    component: views.productCostAddEdit,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  // #################### Other ####################
  // ********** Matrix Rain **********
  justRain: {
    path: '/just-rain',
    component: JustRain,
    name: 'justRain',
  },
  // ********** 404 **********
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
  routes: Object.entries(routesObj).map(([name, route]) => {
    route.name = name
    route.meta = route.meta || {}
    return route
  }),
})

router.beforeEach((to, from, next) => {
  const needsAuthentication = to.matched.some((record) => record.meta['requiresAuth'])
  const isAuthenticated = store.getters['auth/isAuthenticated']
  if (needsAuthentication) {
    if (isAuthenticated)
      next()
    else
      next({name: 'Login'})
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  const guestRoute = to.matched.some((record) => record.meta['guest'])
  const isAuthenticated = store.getters['auth/isAuthenticated']
  if (guestRoute) {
    if (isAuthenticated)
      next({name: 'Home'})
    else
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

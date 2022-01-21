import {routesObj} from '@/router'

const getRoute = route => {
  return {
    routeName: routesObj[route].name,
    titleI18n: routesObj[route].meta.titleI18n,
    permission: routesObj[route].meta.permission || [],
    apps: routesObj[route].meta.apps || [],
    icon: routesObj[route].meta.icon,
  }
}

const menuItems = [
  // {
  //   icon: 'products',
  //   order: 10,
  //   titleI18n: 'general.routes.home',
  //   children: [getRoute('usersList')],
  // },
  {
    icon: 'mdi-warehouse',
    order: 20,
    titleI18n: 'general.routes.products',
    collapsed: false,
    children: [
      getRoute('brandList'),
      getRoute('productTypeList'),
      getRoute('actualProductList'),
      getRoute('productList'),
      // getRoute('productTypeSelectorList'),
      // getRoute('productTypeSelectorValueList'),
      getRoute('variantList'),
    ],
  },
  {
    icon: 'mdi-robot-industrial',
    order: 30,
    titleI18n: 'general.routes.robot',
    collapsed:false,
    children: [
      getRoute('editVariantStatus'),
      getRoute('invoiceDownload'),
      getRoute('digiCredentials'),
    ],
  },
  {
    icon: 'mdi-calculator',
    order: 40,
    titleI18n: 'acc.accounting',
    collapsed:false,
    children: [
      getRoute('costTypeList'),
      getRoute('costList'),
      getRoute('incomeList'),
      getRoute('productCostList'),
    ],
  },
]

export default menuItems
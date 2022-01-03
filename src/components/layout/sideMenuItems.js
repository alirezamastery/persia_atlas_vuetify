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
    order: 30,
    titleI18n: 'general.routes.products',
    children: [
      getRoute('actualProductsList'),
      getRoute('brandsList'),
      getRoute('productsList'),
      getRoute('productTypesList'),
      getRoute('productTypeSelectorsList'),
      getRoute('productTypeSelectorValuesList'),
      getRoute('variantsList'),
    ],
  },
]

export default menuItems
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
  //   order: 20,
  //   titleI18n: 'general.routes.login',
  //   children: [getRoute('usersList')],
  // },
  {
    icon: 'mdi-home',
    order: 30,
    titleI18n: 'general.routes.products',
    children: [
      getRoute('brands'),
    ],
  },
]

export default menuItems
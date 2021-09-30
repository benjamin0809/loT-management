import { Constant } from './_utils'
const { ApiPrefix } = Constant

const database = [
  {
    id: '1',
    icon: 'dashboard',
    name: 'Dashboard',
    zh: {
      name: '首页'
    },
    'pt-br': {
      name: 'Dashboard'
    },
    route: '/dashboard',
  },
  {
    id: '2',
    breadcrumbParentId: '1',
    name: 'Users',
    zh: {
      name: '用户管理'
    },
    'pt-br': {
      name: 'Usuário'
    },
    icon: 'user',
  },
  {
    id: '21',
    breadcrumbParentId: '2',
    menuParentId: '2',
    name: 'Users',
    zh: {
      name: '租户管理'
    },
    icon: 'team', 
    
    route: '/tenant',
  },
  {
    id: '22',
    breadcrumbParentId: '2',
    menuParentId: '2',
    name: 'Users',
    zh: {
      name: '用户管理'
    },
    'pt-br': {
      name: 'Usuário'
    },
    icon: 'user',  
    route: '/user',
  },
  {
    id: '23',
    breadcrumbParentId: '2',
    menuParentId: '2',
    name: 'Users',
    zh: {
      name: '用户协议'
    },
    'pt-br': {
      name: 'Usuário'
    },
    icon: 'book', 
    route: '/user/agreement',
  },
  {
    id: '201',
    menuParentId: '-1',
    breadcrumbParentId: '2',
    name: 'User Detail',
    zh: {
      name: '用户详情'
    },
    'pt-br': {
      name: 'Detalhes do usuário'
    },
    route: '/user/:id',
  },
  // {
  //   id: '7',
  //   breadcrumbParentId: '1',
  //   name: 'Posts',
  //   zh: {
  //     name: '帖子管理'
  //   },
  //   'pt-br': {
  //     name: 'Posts'
  //   },
  //   icon: 'shopping-cart',
  //   route: '/post',
  // },
  
  // {
  //   id: '3',
  //   breadcrumbParentId: '1',
  //   name: 'Request',
  //   zh: {
  //     name: 'Request'
  //   },
  //   'pt-br': {
  //     name: 'Requisição'
  //   },
  //   icon: 'api',
  //   route: '/request',
  // },
  // {
  //   id: '4',
  //   breadcrumbParentId: '1',
  //   name: 'UI Element',
  //   zh: {
  //     name: 'UI组件'
  //   },
  //   'pt-br': {
  //     name: 'Elementos UI'
  //   },
  //   icon: 'camera-o',
  // },
  // {
  //   id: '45',
  //   breadcrumbParentId: '4',
  //   menuParentId: '4',
  //   name: 'Editor',
  //   zh: {
  //     name: 'Editor'
  //   },
  //   'pt-br': {
  //     name: 'Editor'
  //   },
  //   icon: 'edit',
  //   route: '/editor',
  // },
  // {
  //   id: '5',
  //   breadcrumbParentId: '1',
  //   name: 'Charts',
  //   zh: {
  //     name: 'Charts'
  //   },
  //   'pt-br': {
  //     name: 'Graficos'
  //   },
  //   icon: 'code-o',
  // },
  // {
  //   id: '51',
  //   breadcrumbParentId: '5',
  //   menuParentId: '5',
  //   name: 'ECharts',
  //   zh: {
  //     name: 'ECharts'
  //   },
  //   'pt-br': {
  //     name: 'ECharts'
  //   },
  //   icon: 'line-chart',
  //   route: '/chart/ECharts',
  // },
  // {
  //   id: '52',
  //   breadcrumbParentId: '5',
  //   menuParentId: '5',
  //   name: 'HighCharts',
  //   zh: {
  //     name: 'HighCharts'
  //   },
  //   'pt-br': {
  //     name: 'HighCharts'
  //   },
  //   icon: 'bar-chart',
  //   route: '/chart/highCharts',
  // },
  // {
  //   id: '53',
  //   breadcrumbParentId: '5',
  //   menuParentId: '5',
  //   name: 'Rechartst',
  //   zh: {
  //     name: 'Rechartst'
  //   },
  //   'pt-br': {
  //     name: 'Rechartst'
  //   },
  //   icon: 'area-chart',
  //   route: '/chart/Recharts',
  // },
  {
    id: '513',
    breadcrumbParentId: '1',
    name: 'Permission',
    zh: {
      name: '权限管理'
    },
    icon: 'setting',
  },
  {
    id: '5131',
    breadcrumbParentId: '513',
    menuParentId: '513',
    name: '角色管理',
    zh: {
      name: 'Role Management'
    },
    icon: 'role',
    route: '/permissions/role',
  },
  {
    id: '5132',
    breadcrumbParentId: '513',
    menuParentId: '513',
    name: 'Menu_Management',
    zh: {
      name: '菜单管理'
    },
    icon: 'menu',
    route: '/permissions/menu',
  },
  {
    id: '5133',
    breadcrumbParentId: '513',
    menuParentId: '513',
    name: 'Interface_Management',
    zh: {
      name: '接口管理'
    },
    icon: 'api'
  }
  ,
  {
    id: '51331',
    breadcrumbParentId: '5133',
    menuParentId: '5133',
    name: 'Interface_Management',
    zh: {
      name: '接口管理'
    },
    icon: 'api',
    route: '/permissions/interface/category',
  }
  ,
  {
    id: '51332',
    breadcrumbParentId: '5133',
    menuParentId: '5133',
    name: 'category_Management',
    zh: {
      name: '目录管理'
    },
    icon: 'category',
    route: '/permissions/interface/category',
  }
]

module.exports = {
  [`GET ${ApiPrefix}/routes`](req, res) {
    res.status(200).json(database)
  },
}

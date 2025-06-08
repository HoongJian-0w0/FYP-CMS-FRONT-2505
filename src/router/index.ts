import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login.vue'),
    meta: { breadcrumb: 'Login' },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/auth/forgotPassword.vue'),
    meta: { breadcrumb: 'Forgot Password' },
  },
  {
    path: '/dashboard',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: () => import('@/views/cms/dashboard/dashboard.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'HomeFilled',
          roles: ['cms:dashboard'],
        },
      },
    ],
  },
  {
    path: '/cms',
    component: () => import('@/layout/index.vue'),
    name: 'cms',
    meta: {
      title: 'System Management',
      icon: 'Setting',
      roles: ['cms:manage'],
    },
    children: [
      {
        path: 'userList',
        name: 'userList',
        component: () => import('@/views/cms/user/userList.vue'),
        meta: {
          title: 'User Management',
          icon: 'UserFilled',
          roles: ['cms:user'],
        },
      },
      {
        path: 'roleList',
        name: 'roleList',
        component: () => import('@/views/cms/role/roleList.vue'),
        meta: {
          title: 'Role Management',
          icon: 'Wallet',
          roles: ['cms:role'],
        },
      },
      {
        path: 'menuList',
        name: 'menuList',
        component: () => import('@/views/cms/menu/menuList.vue'),
        meta: {
          title: 'Menu Management',
          icon: 'Menu',
          roles: ['cms:menu'],
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

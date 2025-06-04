import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login.vue'),
    meta: { breadcrumb: 'Login' }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/auth/forgotPassword.vue'),
    meta: { breadcrumb: 'Forgot Password' }
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

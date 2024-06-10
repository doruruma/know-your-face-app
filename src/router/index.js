import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/core/LocalStorageService'
import LayoutView from '@/views/LayoutView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: LayoutView,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView,
          meta: {
            auth: true,
            title: 'Dashboard'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        auth: false,
        title: 'Login'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // page title
  document.title = `Know My Face ${to.meta?.title ? `| ${to.meta.title}` : ''}`
  // login check
  if (to.matched.some((record) => record.meta.auth)) {
    if (getToken() == null) router.push({ name: 'login' })
    else next()
  } else {
    if (getToken() != null) router.push({ name: 'dashboard' })
    else next()
  }
  next()
})

export default router

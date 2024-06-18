import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/core/LocalStorageService'
import LayoutView from '@/views/LayoutView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import SettingView from '@/views/setting/SettingView.vue'
import PresenceListView from '@/views/presence/PresenceListView.vue'
import PresenceDetailView from '@/views/presence/PresenceDetailView.vue'
import UserListView from '@/views/user/UserListView.vue'
import UserFormView from '@/views/user/UserFormView.vue'
import UserDetailView from '@/views/user/UserDetailView.vue'

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
        },
        {
          path: 'setting',
          name: 'setting',
          component: SettingView,
          meta: {
            auth: true,
            title: 'Pengaturan'
          }
        },
        {
          path: 'presence',
          name: 'presence',
          component: PresenceListView,
          meta: {
            auth: true,
            title: 'Kehadiran'
          }
        },
        {
          path: 'presence/:id',
          name: 'presence-detail',
          component: PresenceDetailView,
          meta: {
            auth: true,
            title: 'Kehadiran'
          }
        },
        {
          path: 'user',
          name: 'user',
          component: UserListView,
          meta: {
            auth: true,
            title: 'Pegawai'
          }
        },
        {
          path: 'add-user',
          name: 'add-user',
          component: UserFormView,
          meta: {
            auth: true,
            title: 'Tambah Pegawai'
          }
        },
        {
          path: 'edit-user/:id',
          name: 'edit-user',
          component: UserFormView,
          meta: {
            auth: true,
            title: 'Edit Pegawai'
          }
        },
        {
          path: 'user-detail/:id',
          name: 'user-detail',
          component: UserDetailView,
          meta: {
            auth: true,
            title: 'Detail Pegawai'
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
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/core/LocalStorageService'
import LayoutView from '@/views/LayoutView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import SettingView from '@/views/setting/SettingView.vue'
import PresenceListView from '@/views/presence/PresenceListView.vue'
import PresenceDetailView from '@/views/presence/PresenceDetailView.vue'
import HolidayListView from '@/views/holiday/HolidayListView.vue'
import HolidayFormView from '@/views/holiday/HolidayFormView.vue'
import ScheduleListView from '@/views/schedule/ScheduleListView.vue'
import ScheduleFormView from '@/views/schedule/ScheduleFormView.vue'
import LeaveListView from '@/views/leave/LeaveListView.vue'
import LeaveFormView from '@/views/leave/LeaveFormView.vue'
import LeaveActionView from '@/views/leave/LeaveActionView.vue'
import LeaveDetailView from '@/views/leave/LeaveDetailView.vue'
import UserListView from '@/views/user/UserListView.vue'
import UserFormView from '@/views/user/UserFormView.vue'
import UserDetailView from '@/views/user/UserDetailView.vue'
import { isManagement } from '@/core/Constants'

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
            management: true,
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
          path: 'holiday',
          name: 'holiday',
          component: HolidayListView,
          meta: {
            auth: true,
            title: 'Jadwal Libur'
          }
        },
        {
          path: 'add-holiday',
          name: 'add-holiday',
          component: HolidayFormView,
          meta: {
            auth: true,
            title: 'Tambah Jadwal Libur'
          }
        },
        {
          path: 'edit-holiday/:id',
          name: 'edit-holiday',
          component: HolidayFormView,
          meta: {
            auth: true,
            title: 'Edit Jadwal Libur'
          }
        },
        {
          path: 'leave',
          name: 'leave',
          component: LeaveListView,
          meta: {
            auth: true,
            title: 'Pengajuan Cuti'
          }
        },
        {
          path: 'add-leave',
          name: 'add-leave',
          component: LeaveFormView,
          meta: {
            auth: true,
            title: 'Ajukan Cuti'
          }
        },
        {
          path: 'edit-leave/:id',
          name: 'edit-leave',
          component: LeaveFormView,
          meta: {
            auth: true,
            title: 'Edit Pengajuan Cuti'
          }
        },
        {
          path: 'leave-action/:id',
          name: 'leave-action',
          component: LeaveActionView,
          meta: {
            auth: true,
            title: 'Tindak Lanjuti Cuti'
          }
        },
        {
          path: 'leave/:id',
          name: 'leave-detail',
          component: LeaveDetailView,
          meta: {
            auth: true,
            title: 'Detail Pengajuan Cuti'
          }
        },
        {
          path: 'schedule',
          name: 'schedule',
          component: ScheduleListView,
          meta: {
            auth: true,
            title: 'Jadwal WFH'
          }
        },
        {
          path: 'add-schedule',
          name: 'add-schedule',
          component: ScheduleFormView,
          meta: {
            auth: true,
            title: 'Tambah Jadwal WFH'
          }
        },
        {
          path: 'edit-schedule/:id',
          name: 'edit-schedule',
          component: ScheduleFormView,
          meta: {
            auth: true,
            title: 'Edit Jadwal WFH'
          }
        },
        {
          path: 'user',
          name: 'user',
          component: UserListView,
          meta: {
            auth: true,
            management: true,
            title: 'Pegawai'
          }
        },
        {
          path: 'add-user',
          name: 'add-user',
          component: UserFormView,
          meta: {
            auth: true,
            management: true,
            title: 'Tambah Pegawai'
          }
        },
        {
          path: 'edit-user/:id',
          name: 'edit-user',
          component: UserFormView,
          meta: {
            auth: true,
            management: true,
            title: 'Edit Pegawai'
          }
        },
        {
          path: 'user/:id',
          name: 'user-detail',
          component: UserDetailView,
          meta: {
            auth: true,
            management: true,
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
  if (to.matched.some((record) => record.meta.management)) {
    if (!isManagement()) router.push({ name: 'dashboard' })
    else next()
  } else {
    next()
  }
})

export default router

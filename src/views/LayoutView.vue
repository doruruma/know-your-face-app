<template>
  <v-navigation-drawer
    v-model="isShowDrawer"
    :width="360"
    :elevation="0">
    <v-list-item height="64">
      <template v-slot:title>
        <div class="d-flex align-center justify-center">
          <v-icon icon="mdi-emoticon-outline" size="large" color="primary"></v-icon>
          <div class="text-h6 text-primary ml-1">Know My <span class="font-weight-bold">Face</span></div>
        </div>
      </template>
    </v-list-item>
    <v-divider />
    <router-link custom :to="{ name: 'dashboard' }" v-slot="{ href, navigate, isActive }">
      <v-list-item link :active="isActive" subtitle="Dashboard" height="48" @click="() => navigate(href)">
        <template v-slot:prepend>
          <v-icon icon="mdi-view-dashboard-outline" color="primary"></v-icon>
        </template>
      </v-list-item>
    </router-link>
    <v-list-item link subtitle="Kehadiran" height="48">
      <template v-slot:prepend>
        <v-icon icon="mdi-account-multiple-check-outline" color="primary"></v-icon>
      </template>
    </v-list-item>
    <v-list-item link subtitle="Pengajuan Cuti" height="48">
      <template v-slot:prepend>
        <v-icon icon="mdi-calendar-remove" color="primary"></v-icon>
      </template>
    </v-list-item>
    <v-divider />
    <v-list-item link subtitle="Jadwal Kerja" height="48">
      <template v-slot:prepend>
        <v-icon icon="mdi-calendar-range" color="primary"></v-icon>
      </template>
    </v-list-item>
    <v-list-item link subtitle="Jam Kerja" height="48">
      <template v-slot:prepend>
        <v-icon icon="mdi-clock-outline" color="primary"></v-icon>
      </template>
    </v-list-item>
    <router-link custom :to="{ name: 'user' }" v-slot="{ href, navigate, isActive }">
      <v-list-item link :active="isActive" subtitle="Pegawai" height="48" @click="() => { navigate(href) }">
        <template v-slot:prepend>
          <v-icon icon="mdi-account-group-outline" color="primary"></v-icon>
        </template>
      </v-list-item>
    </router-link>
    <v-divider />
    <router-link custom :to="{ name: 'setting' }" v-slot="{ href, navigate, isActive }">
      <v-list-item link :active="isActive" subtitle="Pengaturan" height="48" @click="() => { navigate(href) }">
        <template v-slot:prepend>
          <v-icon icon="mdi-cogs" color="primary"></v-icon>
        </template>
      </v-list-item>
    </router-link>
    <v-list-item link subtitle="Profil Saya" height="48">
      <template v-slot:prepend>
        <v-icon icon="mdi-account-edit-outline" color="primary"></v-icon>
      </template>
    </v-list-item>
    <v-list-item link subtitle="Logout" height="48">
      <template v-slot:prepend>
        <v-icon icon="mdi-logout" color="red"></v-icon>
      </template>
    </v-list-item>
  </v-navigation-drawer>

  <v-app-bar :elevation="0">
    <v-app-bar-nav-icon @click="isShowDrawer = !isShowDrawer" color="primary"></v-app-bar-nav-icon>
    <v-app-bar-title>
      <div class="text-subtitle-1 text-grey-darken-1">Hai, Admin</div>
    </v-app-bar-title>
    <template v-slot:append>
      <v-btn icon="mdi-bell-outline" color="primary"></v-btn>
      <v-btn icon="mdi-logout" color="red"></v-btn>
    </template>
  </v-app-bar>

  <v-main>
    <transition enter-active-class="animate__animated animate__fadeInRight animate__faster" appear>
      <v-container :key="key">
        <RouterView />
      </v-container>
    </transition>
  </v-main>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isShowDrawer = ref(true)
const key = ref(true)
const route = useRoute()

watch(route, () => {
  key.value = !key.value
})
</script>
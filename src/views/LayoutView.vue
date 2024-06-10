<template>
  <v-app class="bg-grey-lighten-4">
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
      <v-list-item link :active="currentRouteName == 'dashboard'" subtitle="Dashboard" height="48">
        <template v-slot:prepend>
          <v-icon icon="mdi-view-dashboard-outline" color="primary"></v-icon>
        </template>
      </v-list-item>
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
      <v-list-item link subtitle="Pegawai" height="48">
        <template v-slot:prepend>
          <v-icon icon="mdi-account-group-outline" color="primary"></v-icon>
        </template>
      </v-list-item>
      <v-divider />
      <v-list-item link subtitle="Profil Saya" height="48">
        <template v-slot:prepend>
          <v-icon icon="mdi-account-edit-outline" color="primary"></v-icon>
        </template>
      </v-list-item>
      <v-list-item link subtitle="Logout" height="48">
        <template v-slot:prepend>
          <v-icon icon="mdi-logout"></v-icon>
        </template>
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar :elevation="0">
      <v-app-bar-nav-icon @click="isShowDrawer = !isShowDrawer" color="grey"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <div class="text-subtitle-1 text-grey-darken-1">Hai, Admin</div>
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn icon="mdi-bell-outline" color="grey"></v-btn>
        <v-btn icon="mdi-logout" color="grey"></v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const isShowDrawer = ref(true)
const route = useRoute()
const currentRouteName = route.name
</script>
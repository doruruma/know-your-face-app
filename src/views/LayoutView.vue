<template>
  <v-navigation-drawer
    v-model="isShowDrawer"
    :width="360"
    :elevation="0"
  >
    <v-list-item height="64">
      <template v-slot:title>
        <div class="d-flex align-center justify-center">
          <v-icon
            icon="mdi-emoticon-outline"
            size="large"
            color="primary"
          />
          <div class="text-h6 text-primary ml-1">
            Know My
            <span class="font-weight-bold">Face</span>
          </div>
        </div>
      </template>
    </v-list-item>
    <v-divider />
    <router-link
      custom
      :to="{ name: 'dashboard' }"
      v-slot="{ href, navigate, isActive }"
    >
      <v-list-item
        link
        :active="isActive"
        subtitle="Home"
        height="48"
        @click="() => navigate(href)"
      >
        <template v-slot:prepend>
          <v-icon
            icon="mdi-view-dashboard-outline"
            color="primary"
          />
        </template>
      </v-list-item>
    </router-link>
    <router-link
      custom
      :to="{ name: 'presence' }"
      v-slot="{ href, navigate, isActive }"
    >
      <v-list-item
        link
        :active="isActive"
        subtitle="Kehadiran"
        height="48"
        @click="() => navigate(href)"
      >
        <template v-slot:prepend>
          <v-icon
            icon="mdi-account-multiple-check-outline"
            color="primary"
          />
        </template>
      </v-list-item>
    </router-link>
    <router-link
      custom
      :to="{ name: 'leave' }"
      v-slot="{ href, navigate, isActive }"
    >
      <v-list-item
        link
        :active="isActive"
        subtitle="Pengajuan Cuti"
        height="48"
        @click="() => navigate(href)"
      >
        <template v-slot:prepend>
          <v-icon
            icon="mdi-file-document"
            color="primary"
          />
        </template>
      </v-list-item>
    </router-link>
    <v-divider />
    <!-- <router-link
      custom
      :to="{ name: 'calendar' }"
      v-slot="{ href, navigate, isActive }"
    >
      <v-list-item
        link
        :active="isActive"
        subtitle="Kalender"
        height="48"
        @click="() => navigate(href)"
      >
        <template v-slot:prepend>
          <v-icon
            icon="mdi-calendar-month"
            color="primary"
          />
        </template>
      </v-list-item>
    </router-link> -->
    <router-link
      custom
      :to="{ name: 'schedule' }"
      v-slot="{ href, navigate, isActive }"
    >
      <v-list-item
        link
        :active="isActive"
        subtitle="Jadwal WFH"
        height="48"
        @click="() => navigate(href)"
      >
        <template v-slot:prepend>
          <v-icon
            icon="mdi-calendar-range"
            color="primary"
          />
        </template>
      </v-list-item>
    </router-link>
    <router-link
      custom
      :to="{ name: 'holiday' }"
      v-slot="{ href, navigate, isActive }"
    >
      <v-list-item
        link
        :active="isActive"
        subtitle="Jadwal Libur"
        height="48"
        @click="() => navigate(href)"
      >
        <template v-slot:prepend>
          <v-icon
            icon="mdi-calendar-remove"
            color="primary"
          />
        </template>
      </v-list-item>
    </router-link>
    <router-link
      v-if="isManagement()"
      custom
      :to="{ name: 'user' }"
      v-slot="{ href, navigate, isActive }"
    >
      <v-list-item
        link
        :active="isActive"
        subtitle="Pegawai"
        height="48"
        @click="
          () => {
            navigate(href)
          }
        "
      >
        <template v-slot:prepend>
          <v-icon
            icon="mdi-account-group-outline"
            color="primary"
          />
        </template>
      </v-list-item>
    </router-link>
    <v-divider />
    <router-link
      v-if="isManagement()"
      custom
      :to="{ name: 'setting' }"
      v-slot="{ href, navigate, isActive }"
    >
      <v-list-item
        link
        :active="isActive"
        subtitle="Pengaturan"
        height="48"
        @click="() => navigate(href)"
      >
        <template v-slot:prepend>
          <v-icon
            icon="mdi-cogs"
            color="primary"
          />
        </template>
      </v-list-item>
    </router-link>
    <router-link
      custom
      :to="{ name: 'update-profile' }"
      v-slot="{ href, navigate, isActive }"
    >
      <v-list-item
        link
        :active="isActive"
        subtitle="Profil Saya"
        height="48"
        @click="() => navigate(href)"
      >
        <template v-slot:prepend>
          <v-icon
            icon="mdi-account-edit-outline"
            color="primary"
          />
        </template>
      </v-list-item>
    </router-link>
    <v-list-item
      link
      subtitle="Logout"
      height="48"
      @click="onLogout"
    >
      <template v-slot:prepend>
        <v-icon
          icon="mdi-logout"
          color="red"
        />
      </template>
    </v-list-item>
  </v-navigation-drawer>

  <v-app-bar :elevation="0">
    <v-app-bar-nav-icon
      @click="isShowDrawer = !isShowDrawer"
      color="primary"
    ></v-app-bar-nav-icon>
    <v-app-bar-title>
      <div class="text-subtitle-1 text-grey-darken-1">Hai, {{ userName }}</div>
    </v-app-bar-title>
    <template v-slot:append>
      <!-- <v-btn
        icon="mdi-bell-outline"
        color="primary"
      ></v-btn> -->
      <v-btn
        icon="mdi-logout"
        color="red"
        @click="onLogout"
      />
    </template>
  </v-app-bar>

  <v-main>
    <transition
      enterActiveClass="animate__animated animate__fadeInRight animate__faster"
      appear
    >
      <v-container :key="key">
        <RouterView />
      </v-container>
    </transition>
  </v-main>
</template>

<script setup>
import { isManagement } from "@/core/Constants"
import { destroyCredential } from "@/core/LocalStorageService"
import { Prompt } from "@/core/Swal"
import router from "@/router"
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import { globalState } from "@/core/State"
import { toRefs } from "vue"

const { userName } = toRefs(globalState)
const route = useRoute()
const isShowDrawer = ref(true)
const key = ref(true)

watch(route, () => {
  key.value = !key.value
})

const onLogout = () => {
  Prompt.fire({
    title: "Anda yakin ingin keluar?",
    icon: "warning",
  }).then((result) => {
    if (result.value) {
      destroyCredential()
      router.replace({ name: "login" })
    }
  })
}
</script>

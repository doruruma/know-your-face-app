<template>
  <div class="text-h5 mb-3">Dashboard</div>
  <v-row v-if="isManagement()">
    <v-col
      cols="6"
      lg="4"
      sm="6"
      xs="6"
    >
      <div class="pa-4 bg-white rounded-lg">
        <div class="text-body-2 mb-4 text-center">Pengajuan Cuti</div>
        <div class="text-h4 text-center">
          {{ requestedLeaveCount }}
        </div>
      </div>
    </v-col>
    <v-col
      cols="6"
      lg="4"
      sm="6"
      xs="6"
    >
      <div class="pa-4 bg-white rounded-lg">
        <div class="text-body-2 text-center">Pegawai Hadir</div>
        <div class="text-h4 mt-4 text-center">
          {{ presenceCount }} / {{ userCount }}
        </div>
      </div>
    </v-col>
    <v-col
      cols="6"
      lg="4"
      sm="6"
      xs="6"
    >
      <div class="pa-4 bg-white rounded-lg">
        <div class="text-body-2 text-center">Pegawai Cuti</div>
        <div class="text-h4 mt-4 text-center">
          {{ approvedLeaveCount }} / {{ userCount }}
        </div>
      </div>
    </v-col>
    <v-col
      cols="6"
      lg="4"
      sm="6"
      xs="6"
    >
      <div class="pa-4 bg-white rounded-lg">
        <div class="text-body-2 text-center">Pegawai Sakit</div>
        <div class="text-h4 mt-4 text-center">
          {{ approvedSickCount }} / {{ userCount }}
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import Api from "@/core/ApiService"
import { isManagement } from "@/core/Constants"
import { onMounted, ref } from "vue"

const requestedLeaveCount = ref(0)
const approvedSickCount = ref(0)
const approvedLeaveCount = ref(0)
const userCount = ref(0)
const presenceCount = ref(0)

const getTodayRequestedLeaveCount = async () => {
  const response = await Api.get("leave/get-today-requested-count")
  if (response.status === 200)
    requestedLeaveCount.value = response.data.data.count
}

const getTodayApprovedSickCount = async () => {
  const response = await Api.get("leave/get-today-approved-sick-count")
  if (response.status === 200)
    approvedSickCount.value = response.data.data.count
}

const getTodayApprovedLeaveCount = async () => {
  const response = await Api.get("leave/get-today-approved-leave-count")
  if (response.status === 200)
    approvedLeaveCount.value = response.data.data.count
}

const getPresenceCount = async () => {
  const response = await Api.get("presence/get-today-count")
  if (response.status === 200) presenceCount.value = response.data.data.count
}

const getUserCount = async () => {
  const response = await Api.get("users/count")
  if (response.status === 200) userCount.value = response.data.data.count
}

onMounted(() => {
  if (isManagement()) {
    getUserCount()
    getTodayRequestedLeaveCount()
    getTodayApprovedSickCount()
    getTodayApprovedLeaveCount()
    getPresenceCount()
  }
})
</script>

<style lang="scss" scoped></style>

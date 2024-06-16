<template>
  <div class="text-h5 mb-3">
    <BackButton />
    Detail Pegawai
  </div>
  <div class="bg-white pa-6 rounded-lg">
    <CircularProgress :show="isLoading" />
    <v-row v-if="!isLoading">
      <v-col cols="12" lg="4" md="6" xs="12" class="text-center">
        <img
          id="imgProfile"
          :src="`${API_URL}${data.profile_image}`" />
      </v-col>
      <v-col cols="12" lg="8" md="6" xs="12">
        <div class="mb-4">
          <div class="text-subtitle-1 font-weight-medium">Nama :</div>
          <div>{{ data.name }}</div>
        </div>
        <div class="mb-4">
          <div class="text-subtitle-1 font-weight-medium">NIK :</div>
          <div>{{ data.nik }}</div>
        </div>
        <div class="mb-4">
          <div class="text-subtitle-1 font-weight-medium">Email :</div>
          <div>{{ data.email }}</div>
        </div>
        <div class="mb-4">
          <div class="text-subtitle-1 font-weight-medium">Nomor HP :</div>
          <div>{{ data.phone }}</div>
        </div>
        <div class="mb-4">
          <div class="text-subtitle-1 font-weight-medium">Jenis Kelamin :</div>
          <div>{{ data.gender }}</div>
        </div>
        <div class="mb-4">
          <div class="text-subtitle-1 font-weight-medium">Posisi :</div>
          <div>{{ data.position.name ?? '-' }}</div>
        </div>
        <v-btn
          class="mr-2"
          prepend-icon="mdi-pencil"
          variant="flat"
          color="teal">Edit</v-btn>
        <v-btn
          prepend-icon="mdi-trash-can"
          variant="flat"
          color="red">Hapus</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import BackButton from '@/components/utils/BackButton.vue'
import CircularProgress from '@/components/utils/CircularProgress.vue'
import Api from '@/core/ApiService'
import { API_URL } from '@/core/Constants'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const data = ref(null)
const isLoading = ref(true)
const isNotFound = ref(false)

const getData = async () => {
  isLoading.value = true
  try {
    const response = await Api.get(`user/${id}`)
    if (response.status === 204)
      isNotFound.value = true
    if (response.status === 200)
      data.value = response.data.data
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

getData()
</script>

<style lang="scss" scoped>
#imgProfile {
  width: 320px;
  height: 320px;
  object-fit: contain;
}
</style>
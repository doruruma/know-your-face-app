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
          <div>{{ data.formatted_gender }}</div>
        </div>
        <div class="mb-4">
          <div class="text-subtitle-1 font-weight-medium">Posisi :</div>
          <div>{{ data.position.name ?? '-' }}</div>
        </div>
        <v-btn
          class="mr-2"
          prepend-icon="mdi-pencil"
          variant="flat"
          color="teal"
          @click="onEdit">Edit</v-btn>
        <v-btn
          prepend-icon="mdi-trash-can"
          variant="flat"
          color="red"
          @click="onDelete">Hapus</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import BackButton from '@/components/utils/BackButton.vue'
import CircularProgress from '@/components/utils/CircularProgress.vue'
import Api from '@/core/ApiService'
import { API_URL } from '@/core/Constants'
import router from '@/router'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { globalState } from '@/core/State'
import { toRefs } from 'vue'
import { Prompt, Toast } from '@/core/Swal'

const global = toRefs(globalState)
const route = useRoute()
const id = route.params.id
const data = ref(null)
const isLoading = ref(true)
const isNotFound = ref(false)

const onEdit = () => {
  router.push({ name: 'edit-user', params: { id } })
}

const onDelete = () => {
  Prompt.fire({ title: 'Hapus pegawai ini?' }).then(result => {
    if (result.value)
      deleteData(id)
  })
}

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

const deleteData = async (id) => {
  try {
    global.isLoading.value = true
    const response = await Api.post(`user/${id}`, { _method: 'delete' })
    if (response.status === 200) {
      Toast.fire({
        title: 'Pegawai terhapus',
        icon: 'success'
      })
      router.back()
    }
  } catch (error) {
    console.log(error)
  } finally {
    global.isLoading.value = false
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
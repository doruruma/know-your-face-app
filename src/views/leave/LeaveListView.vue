<template>
  <div class="d-flex justify-space-between align-center mb-2">
    <div class="text-h5 mb-3">Pengajuan Cuti</div>
    <v-btn
      v-if="getUser().position_id > 2"
      prependIcon="mdi-plus"
      @click="() => router.push({ name: 'add-leave' })"
      >Ajukan Cuti</v-btn
    >
  </div>
  <div class="bg-white pa-6 rounded-lg">
    <LeaveTable
      :data="data"
      :lastPage="lastPage"
      @pageChange="handlePageChange"
      @userChange="handleUserChange"
      @statusChange="handleStatusChange"
      @detail="handleDetail"
      @action="handleAction"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
import LeaveTable from "@/components/leave/LeaveTable.vue"
import Api from "@/core/ApiService"
import router from "@/router"
import { onMounted, ref, toRefs } from "vue"
import { getUser } from "@/core/LocalStorageService"
import { Prompt, Toast } from "@/core/Swal"
import { globalState } from "@/core/State"

const global = toRefs(globalState)
const data = ref([])
const lastPage = ref(1)
const page = ref(1)
const statusId = ref(null)
const userId = ref(null)

const handlePageChange = (value) => {
  page.value = value
  getData()
}

const handleUserChange = (value) => {
  userId.value = value
  page.value = 1
  getData()
}

const handleStatusChange = (value) => {
  statusId.value = value
  page.value = 1
  getData()
}

const handleDetail = (id) => {
  router.push({ name: "leave-detail", params: { id } })
}

const handleAction = (id) => {
  router.push({ name: "leave-action", params: { id } })
}

const handleCancel = (id) => {
  Prompt.fire({
    title: "Batalkan pengajuan cuti?",
  }).then((result) => {
    if (result.value) cancelData(id)
  })
}

const getData = async () => {
  try {
    let url = `leaves?page=${page.value}`
    if (userId.value !== null) url += `&user_id=${userId.value}`
    if (statusId.value !== null) url += `&workstate_id=${statusId.value}`
    const response = await Api.get(url)
    if (response.status === 200) {
      const result = response.data
      data.value = result.data
      lastPage.value = result.meta.last_page
    }
  } catch (error) {
    console.log(error)
  }
}

const cancelData = async (id) => {
  try {
    global.isLoading.value = true
    const response = await Api.post(`leave/cancel/${id}`, { _method: "put" })
    if (response.status === 200) {
      page.value = 1
      getData()
      Toast.fire({
        title: "Pengajuan berhasil dibatalkan",
        icon: "success",
      })
    }
  } catch (error) {
    console.log(error)
  } finally {
    global.isLoading.value = false
  }
}

onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped></style>

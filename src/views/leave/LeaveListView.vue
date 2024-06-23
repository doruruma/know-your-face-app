<template>
  <div class="d-flex justify-space-between align-center mb-2">
    <div class="text-h5 mb-3">Pengajuan Cuti</div>
    <v-btn
      v-if="getUser().position_id > 2"
      prepend-icon="mdi-plus"
      @click="() => router.push({ name: 'add-leave' })">Ajukan Cuti</v-btn>
  </div>
  <div class="bg-white pa-6 rounded-lg">
    <LeaveTable
      :data="data"
      :last-page="lastPage"
      @pageChange="handlePageChange"
      @userChange="handleUserChange"
      @statusChange="handleStatusChange"
      @detail="handleDetail"
      @action="handleAction" />
  </div>
</template>

<script setup>
import LeaveTable from '@/components/leave/LeaveTable.vue'
import Api from '@/core/ApiService'
import router from '@/router'
import { ref } from 'vue'
import { getUser } from '@/core/LocalStorageService'

const data = ref([])
const lastPage = ref(1)
const page = ref(1)
const statusId = ref(null)
const userId = ref(null)

const handlePageChange = value => {
  page.value = value
  getData()
}

const handleUserChange = value => {
  userId.value = value
  page.value = 1
  getData()
}

const handleStatusChange = value => {
  statusId.value = value
  page.value = 1
  getData()
}

const handleDetail = id => {
  router.push({ name: 'leave-detail', params: { id } })
}

const handleAction = id => {
  router.push({ name: 'leave-action', params: { id } })
}

const getData = async () => {
  try {
    let url = `leaves?page=${page.value}`
    if (userId.value !== null)
      url += `&user_id=${userId.value}`
    if (statusId.value !== null)
      url += `&workstate_id=${statusId.value}`
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

getData()
</script>

<style lang="scss" scoped></style>
<template>
  <div class="text-h5 mb-3">Kehadiran</div>
  <div class="bg-white pa-6 rounded-lg">
    <PresenceTable
      :data="data"
      :last-page="lastPage"
      @pageChange="handlePageChange"
      @statusChange="handleStatusChange"
      @detail="handleDetail" />
  </div>
</template>

<script setup>
import PresenceTable from '@/components/presence/PresenceTable.vue'
import Api from '@/core/ApiService'
import router from '@/router'
import { ref } from 'vue'

const data = ref([])
const lastPage = ref(1)
const page = ref(1)
const statusId = ref(null)

const handlePageChange = (value) => {
  page.value = value
  getData()
}

const handleStatusChange = (value) => {
  switch (value) {
    case 1:
      statusId.value = 0
      break;
    case 2:
      statusId.value = 1
      break;
    default:
      statusId.value = null
      break;
  }
  getData()
}

const handleDetail = (id) => {
  router.push({ name: 'presence-detail', params: { id } })
}

const getData = async () => {
  try {
    let url = `presences?page=${page.value}`
    if (statusId.value !== null)
      url += `&is_remote=${statusId.value}`
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
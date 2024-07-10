<template>
  <div class="text-h5 mb-3">Kehadiran</div>
  <div class="bg-white pa-6 rounded-lg">
    <PresenceTable
      :data="data"
      :last-page="lastPage"
      @userChange="handleUserChange"
      @pageChange="handlePageChange"
      @statusChange="handleStatusChange"
      @isLateChange="handleIsLateChange"
      @detail="handleDetail"
    />
  </div>
</template>

<script setup>
import PresenceTable from "@/components/presence/PresenceTable.vue"
import Api from "@/core/ApiService"
import router from "@/router"
import { ref } from "vue"

const data = ref([])
const lastPage = ref(1)
const page = ref(1)
const statusId = ref(null)
const isLate = ref(null)
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
  switch (value) {
    case 1:
      statusId.value = 0
      break
    case 2:
      statusId.value = 1
      break
    default:
      statusId.value = null
      break
  }
  page.value = 1
  getData()
}

const handleIsLateChange = (value) => {
  switch (value) {
    case -1:
      isLate.value = 0
      break
    case 1:
      isLate.value = 1
      break
    default:
      isLate.value = null
      break
  }
  page.value = 1
  getData()
}

const handleDetail = (id) => {
  router.push({ name: "presence-detail", params: { id } })
}

const getData = async () => {
  try {
    let url = `presences?page=${page.value}`
    if (statusId.value !== null) url += `&is_remote=${statusId.value}`
    if (userId.value !== null) url += `&user_id=${userId.value}`
    if (isLate.value !== null) url += `&is_late=${isLate.value}`
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

<template>
  <div class="d-flex justify-space-between align-center mb-2">
    <div class="text-h5 mb-3">Pegawai</div>
    <v-btn
      prepend-icon="mdi-plus"
      @click="() => router.push({ name: 'add-user' })">Tambah</v-btn>
  </div>
  <div class="bg-white pa-6 rounded-lg">
    <UserTable
      :data="data"
      :last-page="lastPage"
      @pageChange="handlePageChange"
      @search="handleSearch"
      @detail="handleDetail"
      @edit="handleEdit" />
  </div>
</template>

<script setup>
import UserTable from '@/components/user/UserTable.vue'
import Api from '@/core/ApiService'
import router from '@/router'
import { ref } from 'vue'

const data = ref([])
const lastPage = ref(1)
const page = ref(1)
const search = ref(null)

const handlePageChange = (value) => {
  page.value = value
  getData()
}

const handleSearch = (value) => {
  search.value = value
  page.value = 1
  getData()
}

const handleDetail = (id) => {
  router.push({ name: 'user-detail', params: { id } })
}

const handleEdit = (id) => {
  router.push({ name: 'edit-user', params: { id } })
}

const getData = async () => {
  try {
    let url = `users?page=${page.value}`
    if (search.value)
      url += `&search=${search.value}`
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
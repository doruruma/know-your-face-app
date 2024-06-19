<template>
  <div class="d-flex justify-space-between align-center mb-2">
    <div class="text-h5 mb-3">Jadwal Libur</div>
    <v-btn
      prepend-icon="mdi-plus"
      @click="() => router.push({ name: 'add-holiday' })">Tambah</v-btn>
  </div>
  <div class="bg-white pa-6 rounded-lg">
    <v-tabs
      v-model="tab"
      class="mb-4"
      @update:model-value="onTabChange">
      <v-tab value="1">Tabel</v-tab>
      <v-tab value="2">Kalender</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="1">
        <HolidayTable
          :data="dataTable"
          :last-page="lastPage"
          @pageChange="handlePageChange"
          @search="handleSearch"
          @edit="handleEdit"
          @delete="handleDelete" />
      </v-tabs-window-item>
      <v-tabs-window-item value="2">
        <CalendarView :data="dataCalendar" />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup>
import { globalState } from '@/core/State'
import CalendarView from '@/components/utils/CalendarView.vue'
import { ref, toRefs } from 'vue'
import Api from '@/core/ApiService'
import moment from 'moment'
import HolidayTable from '@/components/holiday/HolidayTable.vue'
import router from '@/router'
import { Prompt, Toast } from '@/core/Swal'

const global = toRefs(globalState)
const dataTable = ref([])
const dataCalendar = ref([])
const lastPage = ref(1)
const page = ref(1)
const year = ref(moment().year())
const search = ref(null)
const tab = ref(null)

const onTabChange = (value) => {
  switch (value) {
    case '1':
      getDataTable()
      break;
    case '2':
      getDataCalendar()
      break;
    default:
      break;
  }
}

const handlePageChange = (value) => {
  page.value = value
  getDataTable()
}

const handleSearch = (value) => {
  search.value = value
  page.value = 1
  getDataTable()
}

const handleEdit = (id) => {
  router.push({ name: 'edit-holiday', params: { id } })
}

const handleDelete = (id) => {
  Prompt.fire({ title: 'Hapus data ini?' }).then(result => {
    if (result.value)
      deleteData(id)
  })
}

const getDataCalendar = async () => {
  const response = await Api.get(`holidays/${year.value}`)
  if (response.status === 200)
    dataCalendar.value = response.data.data
}

const getDataTable = async () => {
  let url = `holidays?page=${page.value}`
  if (search.value)
    url += `&search=${search.value}`
  const response = await Api.get(url)
  if (response.status === 200) {
    const result = response.data
    dataTable.value = result.data
    lastPage.value = result.meta.last_page
  }
}

const deleteData = async (id) => {
  try {
    global.isLoading.value = true
    const response = await Api.post(`holiday/${id}`, { _method: 'delete' })
    if (response.status === 200) {
      page.value = 1
      getDataTable()
      Toast.fire({
        title: 'Data terhapus',
        icon: 'success'
      })
    }
  } catch (error) {
    console.log(error)
  } finally {
    global.isLoading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
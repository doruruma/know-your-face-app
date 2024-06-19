<template>
  <div class="d-flex justify-space-between align-center mb-2">
    <div class="text-h5 mb-3">Jadwal WFH</div>
    <v-btn
      prepend-icon="mdi-plus"
      @click="() => router.push({ name: 'add-schedule' })">Tambah</v-btn>
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
        <ScheduleTable
          :data="dataTable"
          :last-page="lastPage"
          @pageChange="handlePageChange"
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
import ScheduleTable from '@/components/schedule/ScheduleTable.vue'
import CalendarView from '@/components/utils/CalendarView.vue'
import Api from '@/core/ApiService'
import { globalState } from '@/core/State'
import { Prompt } from '@/core/Swal'
import router from '@/router'
import moment from 'moment'
import { ref, toRefs } from 'vue'

const global = toRefs(globalState)
const dataTable = ref([])
const dataCalendar = ref([])
const lastPage = ref(1)
const page = ref(1)
const year = ref(moment().year())
const tab = ref(null)

const onTabChange = value => {
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

const handleEdit = (id) => {
  router.push({ name: 'edit-schedule', params: { id } })
}

const handleDelete = (id) => {
  Prompt.fire({ title: 'Hapus data ini?' }).then(result => {
    if (result.value)
      deleteData(id)
  })
}

const getDataTable = async () => {
  const response = await Api.get(`remote-schedules?page=${page.value}`)
  if (response.status === 200) {
    const result = response.data
    dataTable.value = result.data
    lastPage.value = result.meta.last_page
  }
}

const getDataCalendar = async () => {
  const response = await Api.get(`remote-schedules/${year.value}`)
  if (response.status === 200) {
    const responseData = response.data.data
    responseData.map(value => {
      value.name = value.user.name ?? '-'
    })
    dataCalendar.value = responseData
  }
}

const deleteData = async () => {

}
</script>

<style lang="scss" scoped></style>
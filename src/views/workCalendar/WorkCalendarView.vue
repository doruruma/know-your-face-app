<template>
  <div class="text-h5 mb-3">Kalender</div>
  <div class="bg-white pa-6 rounded-lg">
    <CalendarView :data="finalData" />
  </div>
</template>

<script setup>
import CalendarView from "@/components/utils/CalendarView.vue"
import Api from "@/core/ApiService"
import moment from "moment"
import { onMounted, ref } from "vue"

const finalData = ref([])

const getHolidays = async () => {
  const response = await Api.get(`holidays/${moment().year()}`)
  if (response.status === 200) {
    const responseData = response.data.data
    responseData.forEach((value) => {
      finalData.value.push({
        name: value.name,
        date: value.date,
      })
    })
  }
}

const getRemoteSchedules = async () => {
  const response = await Api.get(`remote-schedules/${moment().year()}`)
  if (response.status === 200) {
    const responseData = response.data.data
    responseData.forEach((value) => {
      finalData.value.push({
        name: `${value.user.name} WFH` ?? "-",
        date: value.date,
      })
    })
  }
}

const getApprovedLeaves = async () => {
  const response = await Api.get(`leaves/${moment().year()}`)
  if (response.status === 200) {
    const responseData = response.data.data
    responseData.forEach((value) => {
      value.leave_details.data.forEach((detail) => {
        finalData.value.push({
          name: `Cuti ${value.user.name}`,
          date: detail.leave_date,
        })
      })
    })
  }
}

onMounted(() => {
  getHolidays()
  getRemoteSchedules()
  getApprovedLeaves()
})
</script>

<style lang="scss" scoped></style>

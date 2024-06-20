<template>
  <ScheduleForm :id="id" />
</template>

<script setup>
import ScheduleForm from '@/components/schedule/ScheduleForm.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = parseInt(typeof route.params.id !== 'undefined' ? route.params.id : 0)
</script>

<style lang="scss" scoped></style>
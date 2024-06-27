<template>
  <LeaveForm :id="id" />
</template>

<script setup>
import LeaveForm from "@/components/leave/LeaveForm.vue"
import { useRoute } from "vue-router"

const route = useRoute()
const id = parseInt(
  typeof route.params.id !== "undefined" ? route.params.id : 0,
)
</script>

<style lang="scss" scoped></style>

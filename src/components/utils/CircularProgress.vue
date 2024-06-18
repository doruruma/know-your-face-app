<template>
  <div
    v-if="show"
    class="d-flex w-full h-full align-center justify-center">
    <v-progress-circular color="primary" indeterminate :size="50"></v-progress-circular>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped></style>
<template>
  <v-btn
    icon="mdi-arrow-left"
    variant="plain"
    color="grey"
    @click="() => { router.back() }" />
</template>

<script setup>
import router from '@/router'
</script>

<style lang="scss" scoped></style>
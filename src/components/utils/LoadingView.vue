<template>
  <div
    id="overlay"
    class="animate__animated animate__fadeIn d-flex align-center justify-center">
    <CircularProgress show />
  </div>
</template>

<script setup>
import CircularProgress from '@/components/utils/CircularProgress.vue'
</script>

<style lang="scss" scoped>
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.6);
  z-index: 999999;
}
</style>
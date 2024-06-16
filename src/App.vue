<template>
  <transition enter-active-class="animate__animated animate__fadeIn animate__faster" appear>
    <v-app class="bg-secondary">
      <RouterView />
    </v-app>
  </transition>
</template>

<script setup>
</script>

<style scoped></style>

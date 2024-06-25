<template>
  <transition
    enterActiveClass="animate__animated animate__fadeIn animate__faster"
    appear
  >
    <v-app class="bg-secondary">
      <LoadingView v-if="isLoading" />
      <RouterView />
    </v-app>
  </transition>
</template>

<script setup>
import { globalState } from "@/core/State"
import { toRefs } from "vue"
import LoadingView from "@/components/utils/LoadingView.vue"

const { isLoading } = toRefs(globalState)
</script>

<style scoped></style>

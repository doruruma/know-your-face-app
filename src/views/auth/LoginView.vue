<template>
  <v-app class="bg-secondary">
    <v-container class="h-100">
      <v-row class="justify-center align-center h-100">

        <v-col cols="10" xl="3" lg="4" md="6" sm="8">
          <v-alert
            closable
            v-model="isError"
            type="error"
            icon="mdi-alert-circle-outline"
            variant="tonal"
            density="comfortable"
            :text="serverError"
            class="mb-4" />
          <v-form
            class="pa-6 bg-white rounded-lg"
            @submit.prevent="formOnSubmit()">
            <div class="text-h5 text-center mb-8">Login to <span class="font-weight-bold">Know My Face</span></div>
            <TextField
              label="Email"
              hint="Ketik email akun anda"
              icon="mdi-email"
              type="email"
              :error-msg="formError.username[0]"
              v-model="formData.username" />
            <TextField
              label="Password"
              hint="Ketik password anda"
              icon="mdi-lock"
              type="password"
              :error-msg="formError.password[0]"
              v-model="formData.password" />
            <v-btn
              block
              type="submit"
              :loading="isLoading"
              variant="flat"
              prepend-icon="mdi-login"
              size="large">
              Masuk
            </v-btn>
          </v-form>
        </v-col>

      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { useRouter } from "vue-router"
import { ref } from 'vue'
import Api from '@/core/ApiService'
import TextField from '@/components/textfield/TextField.vue'
import { saveRefreshToken, saveToken } from "@/core/LocalStorageService"

const initFormData = {
  username: '',
  password: ''
}
const initFormError = {
  username: [],
  password: []
}

const router = useRouter()
const isLoading = ref(false)
const formData = ref(initFormData)
const formError = ref(initFormError)
const isError = ref(false)
const serverError = ref('')

const formOnSubmit = async () => {
  try {
    isLoading.value = true
    formError.value = initFormError
    const response = await Api.post('login', formData.value)
    if (response.status === 200) {
      const data = response.data
      saveToken(data.access_token)
      saveRefreshToken(data.refresh_token)
      router.push({ name: 'dashboard' })
    }
  } catch (error) {
    if (error.response) {
      const errorContent = error.response
      if (errorContent.status === 422)
        formError.value = errorContent.data.errors
      if (errorContent.status === 400) {
        isError.value = true
        serverError.value = errorContent.data.message
      }
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
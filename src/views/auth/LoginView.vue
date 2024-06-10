<template>
  <v-app class="bg-grey-lighten-4">
    <v-container class="h-100">
      <v-row class="justify-center align-center h-100">

        <v-col cols="10" xl="3" lg="4" md="6" sm="8" class="bg-white rounded-lg">
          <div class="pa-4">
            <div class="text-h5 text-center mb-8">Login to <span class="font-weight-bold">Know My Face</span></div>
            <TextField
              label="Email"
              hint="Ketik email akun anda"
              icon="mdi-email"
              type="email"
              v-model="email" />
            <TextField
              label="Password"
              hint="Ketik password anda"
              icon="mdi-lock"
              type="password"
              v-model="password" />
            <v-btn
              block
              prepend-icon="mdi-login"
              variant="flat"
              size="large"
              @click="btnLoginOnClick()">
              Masuk
            </v-btn>
          </div>
        </v-col>

      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { useRouter } from "vue-router"
import { ref } from 'vue'
import TextField from '@/components/textfields/TextField.vue'

const router = useRouter()
const email = ref('')
const password = ref('')

// btn login @click
const btnLoginOnClick = () => {
  router.push({ name: 'dashboard' })
}
</script>

<style lang="scss" scoped></style>
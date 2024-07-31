<template>
  <div class="text-h5 mb-3">Profil Saya</div>
  <div class="bg-white pa-6 rounded-lg">
    <v-form
      ref="DOM_form"
      @submit.prevent="onSubmit"
    >
      <TextField
        v-model="form.name"
        label="Nama lengkap"
        :error-msg="error.name[0]"
      />
      <TextField
        v-model="form.phone"
        label="Nomor HP"
        type="number"
        :error-msg="error.phone[0]"
      />
      <TextField
        v-model="form.old_password"
        label="Password lama (opsional)"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :error-msg="error.old_password[0]"
        @append-inner-on-click="onToggleShowPassword"
      />
      <v-row no-gutters>
        <v-col
          cols="12"
          md="6"
          xs="12"
          class="pr-md-4"
        >
          <TextField
            v-model="form.new_password"
            label="Password Baru"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :error-msg="error.new_password[0]"
            @append-inner-on-click="onToggleShowPassword"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
          xs="12"
          class="pl-md-4"
        >
          <TextField
            v-model="form.new_password_confirmation"
            label="Ulangi Password Baru"
            :type="showPasswordConfirm ? 'text' : 'password'"
            :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
            @append-inner-on-click="onToggleShowPasswordConfirm"
          />
        </v-col>
      </v-row>
    </v-form>
    <v-divider class="my-4" />
    <v-row
      no-gutters
      class="align-center"
    >
      <v-col
        cols="12"
        md="4"
        xs="12"
        class="pl-md-4 text-center"
      >
        <img
          class="img-preview"
          :src="imgProfile"
        />
      </v-col>
      <v-col
        cols="12"
        md="8"
        xs="12"
        class="pl-md-4"
      >
        <InputFileField
          v-model="form.profile_image"
          label="Foto Profil"
          icon="mdi-paperclip"
          @change="onProfileChange"
          @clear="onProfileReset"
          :error-msg="error.profile_image[0]"
        />
      </v-col>
    </v-row>
    <v-btn
      :loading="isLoading"
      variant="flat"
      @click="onSubmit"
    >
      Simpan Perubahan
    </v-btn>
  </div>
</template>

<script setup>
import InputFileField from "@/components/textfield/InputFileField.vue"
import TextField from "@/components/textfield/TextField.vue"
import Api from "@/core/ApiService"
import { API_URL } from "@/core/Constants"
import { getUser, saveUser } from "@/core/LocalStorageService"
import { Toast } from "@/core/Swal"
import { onMounted, ref, toRefs } from "vue"
import { globalState } from "@/core/State"

const initForm = {
  _method: "PUT",
  name: "",
  phone: "",
  old_password: "",
  new_password: "",
  new_password_confirmation: "",
  profile_image: null,
}
const initError = {
  name: [],
  phone: [],
  old_password: [],
  new_password: [],
  new_password_confirmation: [],
  profile_image: [],
}
const initImgDefault = `${API_URL}storage/profile-images/default-profile.png`

const global = toRefs(globalState)
const DOM_form = ref(null)
const isLoading = ref(false)
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const imgProfile = ref(initImgDefault)
const form = ref(initForm)
const error = ref(initError)
const user = getUser()

const onProfileChange = (e) => {
  try {
    imgProfile.value = URL.createObjectURL(e.target.files[0])
  } catch (error) {
    console.log(error)
  }
}

const onProfileReset = () => {
  imgProfile.value = initImgDefault
}

const onToggleShowPassword = () => {
  showPassword.value = !showPassword.value
}

const onToggleShowPasswordConfirm = () => {
  showPasswordConfirm.value = !showPasswordConfirm.value
}

const onSubmit = async () => {
  const formData = new FormData()
  for (const key in form.value) {
    if (form.value[key]) formData.append(key, form.value[key])
  }
  try {
    isLoading.value = true
    error.value = { ...initError }
    const response = await Api.post(`user/update-profile/${user.id}`, formData)
    if (response.status === 201 || response.status === 200) {
      Toast.fire({
        title: "Data tersimpan",
        icon: "success",
      })
      saveUser(response.data.data)
      global.userName.value = response.data.data.name
    }
  } catch (axiosErr) {
    if (axiosErr.response) {
      const errorContent = axiosErr.response
      if (errorContent.status === 422) {
        Object.assign(error.value, errorContent.data.errors)
        console.log(error.value)
      }
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  const formValue = form.value
  formValue.name = user.name
  formValue.phone = user.phone
  imgProfile.value = `${API_URL}${user.profile_image}`
})
</script>

<style lang="scss" scoped>
.img-preview {
  width: 240px;
  height: 240px;
  object-fit: contain;
}
</style>

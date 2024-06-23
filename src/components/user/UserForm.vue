<template>
  <div class="text-h5 mb-3">
    <BackButton />
    {{ id === 0 ? 'Tambah' : 'Edit' }} Pegawai
  </div>
  <div class="bg-white pa-6 rounded-lg">

    <v-form
      ref="DOM_form"
      @submit.prevent="onSubmit">

      <TextField
        v-model="form.nik"
        label="NIK"
        type="number"
        :error-msg="error.nik[0]" />

      <v-row no-gutters>
        <v-col cols="12" md="6" xs="12" class="pr-md-4">
          <TextField
            v-model="form.name"
            label="Nama pegawai"
            :error-msg="error.name[0]" />
        </v-col>
        <v-col cols="12" md="6" xs="12" class="pl-md-4">
          <TextField
            v-model="form.phone"
            label="Nomor HP"
            type="number"
            :error-msg="error.phone[0]" />
        </v-col>
      </v-row>

      <TextField
        v-model="form.email"
        label="Email"
        icon="mdi-email"
        type="email"
        :error-msg="error.email[0]" />

      <v-radio-group
        inline
        class="mb-4"
        v-model="form.gender"
        :error-messages="error.gender[0]">
        <v-radio
          color="primary"
          label="Laki-laki"
          value="M" />
        <v-radio
          color="primary"
          label="Perempuan"
          value="F" />
      </v-radio-group>

      <SelectField
        v-model="form.position_id"
        label="Posisi"
        item-value="id"
        item-title="name"
        place-holder="Posisi Pegawai"
        :items="positions"
        :error-msg="error.position_id[0]" />

      <v-row
        v-if="id === 0"
        no-gutters>
        <v-col cols="12" md="6" xs="12" class="pr-md-4">
          <TextField
            v-model="form.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :error-msg="error.password[0]"
            @append-inner-on-click="onToggleShowPassword" />
        </v-col>
        <v-col cols="12" md="6" xs="12" class="pl-md-4">
          <TextField
            v-model="form.password_confirmation"
            label="Ulangi Password"
            :type="showPasswordConfirm ? 'text' : 'password'"
            :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
            @append-inner-on-click="onToggleShowPasswordConfirm" />
        </v-col>
      </v-row>

    </v-form>

    <v-row no-gutters class="align-center">
      <v-col cols="12" md="4" xs="12" class="pl-md-4 text-center">
        <img
          class="img-preview"
          :src="imgProfile" />
      </v-col>
      <v-col cols="12" md="8" xs="12" class="pl-md-4">
        <InputFileField
          v-model="form.profile_image"
          label="Foto Profil"
          icon="mdi-paperclip"
          @change="onProfileChange"
          @clear="onProfileReset" />
      </v-col>
    </v-row>

    <v-row no-gutters class="align-center">
      <v-col cols="12" md="4" xs="12" class="pl-md-4 text-center">
        <img
          class="img-preview"
          :src="imgFace" />
      </v-col>
      <v-col cols="12" md="8" xs="12" class="pl-md-4">
        <InputFileField
          v-model="form.face_image"
          label="Foto Wajah"
          icon="mdi-paperclip"
          @change="onFaceChange"
          @clear="onFaceReset" />
      </v-col>
    </v-row>

    <v-btn
      class="mr-2"
      color="secondary"
      variant="flat"
      @click="onReset">
      Reset
    </v-btn>

    <v-btn
      :loading="isLoading"
      variant="flat"
      @click="onSubmit">
      Simpan
    </v-btn>
  </div>
</template>

<script setup>
import TextField from '@/components/textfield/TextField.vue'
import SelectField from '@/components/textfield/SelectField.vue'
import BackButton from '@/components/utils/BackButton.vue'
import Api from '@/core/ApiService'
import { API_URL } from '@/core/Constants'
import { onMounted, ref } from 'vue'
import InputFileField from '@/components/textfield/InputFileField.vue'
import router from '@/router'
import { Toast } from '@/core/Swal'

const props = defineProps({
  id: {
    type: Number,
    default: 0
  }
})

const initForm = {
  _method: 'POST',
  position_id: null,
  name: '',
  nik: '',
  email: '',
  phone: '',
  gender: 'asal',
  password: '',
  password_confirmation: '',
  profile_image: null,
  face_image: null
}
const initError = {
  position_id: [],
  name: [],
  nik: [],
  email: [],
  phone: [],
  gender: [],
  password: [],
  profile_image: [],
  face_image: []
}
const initPositions = [
  { id: null, name: 'Pilih Posisi Pegawai' }
]
const initImgDefault = `${API_URL}storage/profile-images/default-profile.png`

const DOM_form = ref(null)
const isLoading = ref(false)
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const imgProfile = ref(initImgDefault)
const imgFace = ref(initImgDefault)
const form = ref(initForm)
const error = ref(initError)
const positions = ref(initPositions)
const endpoint = ref('user')

const onToggleShowPassword = () => {
  showPassword.value = !showPassword.value
}

const onToggleShowPasswordConfirm = () => {
  showPasswordConfirm.value = !showPasswordConfirm.value
}

const onProfileChange = e => {
  try {
    imgProfile.value = URL.createObjectURL(e.target.files[0])
  } catch (error) {
    console.log(error)
  }
}

const onProfileReset = () => {
  imgProfile.value = initImgDefault
}

const onFaceChange = e => {
  try {
    imgFace.value = URL.createObjectURL(e.target.files[0])
  } catch (error) {
    console.log(error)
  }
}

const onFaceReset = () => {
  imgFace.value = initImgDefault
}

const onReset = () => {
  try {
    error.value = initError
    form.value.profile_image = null
    form.value.face_image = null
    onProfileReset()
    onFaceReset()
    DOM_form.value.reset()
  } catch (error) {
    console.log(error)
  }
}

const onSubmit = async () => {
  const formData = new FormData
  for (const key in form.value) {
    if (form.value[key])
      formData.append(key, form.value[key])
  }
  try {
    isLoading.value = true
    error.value = { ...initError }
    const response = await Api.post(endpoint.value, formData)
    if (response.status === 201 || response.status === 200) {
      Toast.fire({
        title: 'Data tersimpan',
        icon: 'success'
      })
      router.back()
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

const getPositions = async () => {
  const response = await Api.get('positions/get-staff-no-paging')
  if (response.status === 200)
    positions.value = response.data.data
}

const getData = async () => {
  const response = await Api.get(endpoint.value)
  if (response.status === 204) {
    Toast.fire({
      title: 'Data tidak ditemukan',
      icon: 'warning'
    })
    router.back()
    return
  }
  if (response.status === 200) {
    const responseData = response.data.data
    Object.keys(responseData).forEach(key => {
      if (key !== 'profile_image' && key !== 'face_image')
        form.value[key] = responseData[key]
    })
    imgProfile.value = `${API_URL}${responseData.profile_image}`
    if (responseData.face_image)
      imgFace.value = `${API_URL}${responseData.face_image}`
  }
}

onMounted(() => {
  if (props.id !== 0) {
    form.value._method = 'PUT'
    endpoint.value = `user/${props.id}`
    getData()
  }
  getPositions()
})
</script>

<style lang="scss" scoped>
.img-preview {
  width: 240px;
  height: 240px;
  object-fit: contain;
}
</style>
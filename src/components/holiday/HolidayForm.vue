<template>
  <div class="text-h5 mb-3">
    <BackButton />
    {{ id === 0 ? 'Tambah' : 'Edit' }} Jadwal Libur
  </div>
  <v-form
    ref="DOM_form"
    class="bg-white pa-6 rounded-lg"
    @submit.prevent="onSubmit">

    <TextField
      v-model="form.name"
      label="Keterangan"
      :error-msg="error.name[0]" />

    <DateField
      label="Tanggal Libur"
      :value="form.date"
      :error-msg="error.date[0]"
      @on-value-change="handleDateChange" />

    <v-btn
      class="mr-2"
      color="secondary"
      variant="flat"
      @click="onReset">
      Reset
    </v-btn>

    <v-btn
      type="submit"
      :loading="isLoading"
      variant="flat">
      Simpan
    </v-btn>

  </v-form>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import BackButton from '../utils/BackButton.vue'
import TextField from '../textfield/TextField.vue'
import Api from '@/core/ApiService'
import { Toast } from '@/core/Swal'
import router from '@/router'
import DateField from '../textfield/DateField.vue'
import moment from 'moment'

const initForm = {
  _method: 'POST',
  name: '',
  date: ''
}
const initError = {
  name: [],
  date: []
}

const DOM_form = ref(null)
const isLoading = ref(false)
const form = ref(initForm)
const error = ref(initError)
const endpoint = ref('holiday')

const props = defineProps({
  id: {
    type: Number,
    default: 0
  }
})

const handleDateChange = value => {
  form.value.date = moment(value).format('YYYY-MM-DD')
}

const onReset = () => {
  try {
    error.value = initError
    DOM_form.value.reset()
  } catch (error) {
    console.log(error)
  }
}

const onSubmit = async () => {
  try {
    isLoading.value = true
    error.value = { ...initError }
    const response = await Api.post(endpoint.value, form.value)
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
      if (typeof form.value[key] !== 'undefined')
        form.value[key] = responseData[key]
    })
  }
}

onMounted(() => {
  if (props.id === 0)
    return
  form.value._method = 'PUT'
  endpoint.value = `holiday/${props.id}`
  getData()
})
</script>

<style lang="scss" scoped></style>
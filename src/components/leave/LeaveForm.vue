<template>
  <div class="text-h5 mb-3">
    <BackButton />
    {{ id === 0 ? 'Tambah' : 'Edit' }} Pengajuan Cuti
  </div>
  <div class="bg-white pa-6 rounded-lg">
    <v-form
      ref="DOM_form"
      @submit.prevent="onSubmit">

      <SelectField
        v-model="form.leave_type_id"
        label="Cuti / Sakit"
        item-value="id"
        item-title="name"
        place-holder="salah satu"
        :items="leaveTypes"
        :error-msg="error.leave_type_id[0]" />

      <TextareaField
        v-model="form.notes"
        label="Keterangan"
        placeholder="Masukan keterangan"
        :error-msg="error.notes[0]" />

      <v-row
        class="mx-n3"
        no-gutters>
        <v-col
          v-for="(date, index) in form.dates"
          :key="index"
          class="px-3"
          cols="12" md="4" xs="12">
          <DateField
            hide-details
            label="Tanggal Cuti"
            container-styles="mb-8"
            :allowed-dates="getAllowedDates"
            :value="date"
            :dismissable="index > 0"
            @dismiss="() => handleDateDismiss(index)"
            @on-value-change="value => handleDateChange(index, value)" />
        </v-col>
        <v-col
          class="px-3"
          cols="12" md="4" xs="12">
          <v-btn
            block
            class="mb-8"
            style="height: 56px"
            color="teal"
            variant="outlined"
            prepend-icon="mdi-plus"
            @click="onAddDateClick">
            Tambah tanggal cuti
          </v-btn>
        </v-col>
      </v-row>

      <v-alert
        closable
        v-model="showAlert"
        type="error"
        icon="mdi-alert-circle-outline"
        variant="tonal"
        density="comfortable"
        :text="error.dates[0]"
        class="mb-8" />

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
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import SelectField from '../textfield/SelectField.vue'
import BackButton from '../utils/BackButton.vue'
import Api from '@/core/ApiService'
import TextareaField from '../textfield/TextareaField.vue'
import DateField from '../textfield/DateField.vue'
import moment from 'moment'
import { Toast } from '@/core/Swal'
import router from '@/router'
import { getUserId } from '@/core/LocalStorageService'

const props = defineProps({
  id: {
    type: Number,
    default: 0
  }
})

const initForm = {
  _method: 'POST',
  leave_type_id: null,
  user_id: getUserId(),
  attachment: null,
  notes: '',
  dates: ['']
}
const initError = {
  leave_type_id: [],
  user_id: [],
  attachment: [],
  notes: [],
  dates: []
}
const initLeaveTypes = [
  { id: null, name: 'Pilih Jenis Cuti' }
]

const DOM_form = ref(null)
const isLoading = ref(false)
const form = ref(initForm)
const error = ref(initError)
const leaveTypes = ref(initLeaveTypes)
const endpoint = ref('leave')
const showAlert = ref(false)

const onAddDateClick = () => {
  form.value.dates.push('')
}

const handleDateChange = (index, value) => {
  form.value.dates[index] = moment(value).format('YYYY-MM-DD')
}

const handleDateDismiss = index => {
  if (form.value.dates.length === 1)
    return
  form.value.dates.splice(index, 1)
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
  const finalForm = { ...form.value }
  finalForm.dates = finalForm.dates.filter(x => x !== '')
  const formData = new FormData
  for (const key in finalForm) {
    if (form.value[key] && key !== 'dates')
      formData.append(key, form.value[key])
  }
  finalForm.dates.forEach(date => {
    formData.append('dates[]', date)
  })
  try {
    showAlert.value = false
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
        showAlert.value = typeof error.value.dates[0] !== 'undefined'
      }
    }
  } finally {
    isLoading.value = false
  }
}

const getAllowedDates = date => {
  return !form.value.dates.includes(moment(date).format('YYYY-MM-DD'))
}

const getLeaveTypes = async () => {
  const response = await Api.get('leave-types')
  if (response.status === 200)
    leaveTypes.value = response.data.data
}

onMounted(() => {
  if (props.id !== 0) {
    form.value._method = 'PUT'
    endpoint.value = `leave/${props.id}`
    // TODO: get data
  }
  getLeaveTypes()
})
</script>

<style lang="scss" scoped></style>
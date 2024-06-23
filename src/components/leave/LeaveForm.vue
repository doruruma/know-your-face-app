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
        label="Jenis Cuti"
        item-value="id"
        item-title="name"
        place-holder="Jenis Cuti"
        :items="leaveTypes"
        :error-msg="error.leave_type_id[0]" />

    </v-form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import SelectField from '../textfield/SelectField.vue'
import BackButton from '../utils/BackButton.vue'
import Api from '@/core/ApiService'

const props = defineProps({
  id: {
    type: Number,
    default: 0
  }
})

const initForm = {
  _method: 'POST',
  leave_type_id: null,
  user_id: '',
  attachment: null,
  notes: '',
  dates: []
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

const onSubmit = async () => {

}

const getLeaveTypes = async () => {
  const response = await Api.get('leave-types')
  if (response.status === 200)
    leaveTypes.value = response.data.data
}

onMounted(() => {
  getLeaveTypes()
})
</script>

<style lang="scss" scoped></style>
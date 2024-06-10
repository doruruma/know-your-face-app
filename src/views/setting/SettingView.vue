<template>
  <div class="text-h5 mb-3">Pengaturan</div>
  <v-form
    @submit.prevent="formOnSubmit"
    class="bg-white pa-6 rounded-lg">
    <TextField
      label="Alamat Kantor"
      hint="Ketik alamat kantor"
      icon="mdi-office-building"
      :error-msg="error.office_address[0]"
      v-model="form.office_address"
      class="mb-4" />
    <TextField
      label="Koordinat longitude"
      hint="Ketik longitude"
      icon="mdi-longitude"
      :error-msg="error.office_longitude[0]"
      v-model="form.office_longitude"
      class="mb-4" />
    <TextField
      label="Koordinat latitude"
      hint="Ketik latitude"
      icon="mdi-latitude"
      :error-msg="error.office_latitude[0]"
      v-model="form.office_latitude" />
    <TextField
      label="Toleransi jarak"
      hint="Ketik batas toleransi jarak meter (M)"
      type="number"
      icon="mdi-radar"
      :error-msg="error.max_distance[0]"
      v-model="form.max_distance" />
    <v-btn
      block
      type="submit"
      :loading="isLoading"
      size="large"
      variant="flat"
      rounded="lg">
      Simpan Perubahan
    </v-btn>
  </v-form>
</template>

<script setup>
import Api from '@/core/ApiService'
import { Toast } from '@/core/Swal'
import TextField from '@/components/textfields/TextField.vue'
import { onMounted, ref } from 'vue'

const initForm = {
  id: 0,
  office_address: '',
  office_longitude: '',
  office_latitude: '',
  max_distance: 0
}

const initError = {
  office_address: [],
  office_longitude: [],
  office_latitude: [],
  max_distance: []
}

const form = ref(initForm)
const error = ref(initError)
const isLoading = ref(false)

const getData = async () => {
  try {
    const response = await Api.get('setting')
    if (response.status === 200)
      form.value = response.data.data
  } catch (error) {
    console.log(error)
  }
}

const formOnSubmit = async () => {
  try {
    isLoading.value = true
    const response = await Api.post('setting', { ...form.value, _method: 'put' })
    if (response.status === 200) {
      Toast.fire({
        title: 'Data tersimpan',
        icon: 'success'
      })
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped></style>
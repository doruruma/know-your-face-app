<template>
  <div class="text-h5 mb-3">
    <BackButton />
    {{ id === 0 ? 'Tambah' : 'Edit' }} Jadwal WFH
  </div>
  <v-form
    ref="DOM_form"
    class="bg-white pa-6 rounded-lg"
    @submit.prevent="onSubmit">

    <TextField
      v-model="userName"
      readonly
      :disabled="id !== 0"
      label="Pegawai"
      placeholder="Pilih Pegawai"
      @click="handleInputUserClick" />

    <DateField
      label="Tanggal WFH"
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

  <v-dialog
    v-model="showUserDialog"
    class="align-start">
    <div class="bg-white pa-6 rounded-lg">
      <UserTable
        :data="users"
        :last-page="usersLastPage"
        :is-crud="false"
        :selected-id="form.user_id"
        @pageChange="handleUsersPageChange"
        @search="handleUsersSearch"
        @click="handleUsersClick" />
    </div>
  </v-dialog>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import BackButton from '../utils/BackButton.vue'
import TextField from '../textfield/TextField.vue'
import DateField from '../textfield/DateField.vue'
import moment from 'moment'
import Api from '@/core/ApiService'
import { Toast } from '@/core/Swal'
import router from '@/router'
import UserTable from '../user/UserTable.vue'

const initForm = {
  _method: 'POST',
  user_id: '',
  date: ''
}
const initError = {
  user_id: [],
  date: []
}

const DOM_form = ref(null)
const isLoading = ref(false)
const showUserDialog = ref(false)
const form = ref(initForm)
const error = ref(initError)
const userName = ref('')
const users = ref([])
const usersPage = ref(1)
const usersLastPage = ref(1)
const usersSearch = ref(null)
const endpoint = ref('remote-schedule')

const props = defineProps({
  id: {
    type: Number,
    default: 0
  }
})

const handleUsersPageChange = value => {
  usersPage.value = value
}

const handleUsersSearch = value => {
  usersSearch.value = value
  usersPage.value = 1
  getUsers()
}

const handleUsersClick = value => {
  form.value.user_id = value.id
  userName.value = value.name
  showUserDialog.value = false
}

const handleDateChange = value => {
  form.value.date = moment(value).format('YYYY-MM-DD')
}

const handleInputUserClick = () => {
  showUserDialog.value = true
}

const onReset = () => {
  try {
    error.value = initError
    DOM_form.value.reset()
    userName.value = ''
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
      if (errorContent.status === 500) {
        Toast.fire({
          title: errorContent.data.message,
          icon: 'error'
        })
        if (props.id !== 0)
          router.back()
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
    userName.value = responseData.user.name ?? '-'
    Object.keys(responseData).forEach(key => {
      if (typeof form.value[key] !== 'undefined')
        form.value[key] = responseData[key]
    })
  }
}

const getUsers = async () => {
  let url = `users?page=${usersPage.value}`
  if (usersSearch.value)
    url += `&search=${usersSearch.value}`
  const response = await Api.get(url)
  if (response.status === 200) {
    const result = response.data
    users.value = result.data
    usersLastPage.value = result.meta.last_page
  }
}

watch(showUserDialog, () => {
  if (showUserDialog.value)
    getUsers()
})

onMounted(() => {
  if (props.id === 0)
    return
  form.value._method = 'PUT'
  endpoint.value = `remote-schedule/${props.id}`
  getData()
})
</script>

<style lang="scss" scoped></style>
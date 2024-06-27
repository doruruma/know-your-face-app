<template>
  <div class="text-h5 mb-3">
    <BackButton />
    {{ id === 0 ? "Tambah" : "Edit" }} Pengajuan Cuti
  </div>
  <div class="bg-white pa-6 rounded-lg">
    <v-form
      ref="DOM_form"
      @submit.prevent="onSubmit"
    >
      <SelectField
        :disabled="id > 0"
        v-model="form.leave_type_id"
        label="Cuti / Sakit"
        itemValue="id"
        itemTitle="name"
        placeHolder="salah satu"
        :items="leaveTypes"
        :errorMsg="error.leave_type_id[0]"
        @change="handleLeaveTypeIdChange"
      />

      <v-row
        v-if="form.leave_type_id === SICK_LEAVE_ID"
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
            :src="imgAttachment"
          />
        </v-col>
        <v-col
          cols="12"
          md="8"
          xs="12"
          class="pl-md-4"
        >
          <InputFileField
            v-model="form.attachment"
            label="Lampiran"
            icon="mdi-paperclip"
            @change="onAttachmentChange"
            @clear="onAttachmentReset"
            :error-msg="error.attachment[0]"
          />
        </v-col>
      </v-row>

      <TextareaField
        v-model="form.notes"
        label="Keterangan"
        placeholder="Masukan keterangan"
        :errorMsg="error.notes[0]"
      />

      <v-row
        class="mx-n3"
        noGutters
      >
        <v-col
          v-for="(date, index) in form.dates"
          :key="index"
          class="px-3"
          cols="12"
          md="4"
          xs="12"
        >
          <DateField
            hideDetails
            label="Tanggal Cuti"
            containerStyles="mb-8"
            :allowedDates="getAllowedDates"
            :value="date"
            :dismissable="index > 0"
            @dismiss="() => handleDateDismiss(index)"
            @on-value-change="(value) => handleDateChange(index, value)"
          />
        </v-col>
        <v-col
          class="px-3"
          cols="12"
          md="4"
          xs="12"
        >
          <v-btn
            block
            class="mb-8"
            style="height: 56px"
            color="teal"
            variant="outlined"
            prependIcon="mdi-plus"
            @click="onAddDateClick"
          >
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
        class="mb-8"
      />

      <v-btn
        class="mr-2"
        color="secondary"
        variant="flat"
        @click="onReset"
      >
        Reset
      </v-btn>

      <v-btn
        type="submit"
        :loading="isLoading"
        variant="flat"
      >
        {{ id > 0 ? "Simpan Perubahan" : "Simpan" }}
      </v-btn>
    </v-form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import SelectField from "../textfield/SelectField.vue"
import BackButton from "../utils/BackButton.vue"
import Api from "@/core/ApiService"
import TextareaField from "../textfield/TextareaField.vue"
import DateField from "../textfield/DateField.vue"
import moment from "moment"
import { Toast } from "@/core/Swal"
import router from "@/router"
import { getUserId } from "@/core/LocalStorageService"
import InputFileField from "../textfield/InputFileField.vue"
import { API_URL, LEAVE_ID, SICK_LEAVE_ID } from "@/core/Constants"

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
})

const initForm = {
  _method: "POST",
  leave_type_id: null,
  user_id: getUserId(),
  attachment: null,
  notes: "",
  dates: [""],
}
const initError = {
  leave_type_id: [],
  user_id: [],
  attachment: [],
  notes: [],
  dates: [],
}
const initLeaveTypes = [{ id: null, name: "Pilih Jenis Cuti" }]
const initImgDefault = `${API_URL}storage/leave-attachments/default-attachment.png`

const DOM_form = ref(null)
const isLoading = ref(false)
const persistLeaveTypeId = ref(0)
const persistAttachment = ref(initImgDefault)
const imgAttachment = ref(initImgDefault)
const form = ref(initForm)
const error = ref(initError)
const leaveTypes = ref(initLeaveTypes)
const endpoint = ref("leave")
const showAlert = ref(false)

const onAddDateClick = () => {
  form.value.dates.push("")
}

const onAttachmentChange = (e) => {
  try {
    imgAttachment.value = URL.createObjectURL(e.target.files[0])
  } catch (error) {
    console.log(error)
  }
}

const onAttachmentReset = () => {
  imgAttachment.value = initImgDefault
}

const handleLeaveTypeIdChange = (value) => {
  if (value === LEAVE_ID) {
    form.value.attachment = null
    imgAttachment.value = persistAttachment.value
  }
}

const handleDateChange = (index, value) => {
  form.value.dates[index] = moment(value).format("YYYY-MM-DD")
}

const handleDateDismiss = (index) => {
  if (form.value.dates.length === 1) return
  form.value.dates.splice(index, 1)
}

const onReset = () => {
  try {
    error.value = initError
    if (props.id > 0) form.value.leave_type_id = persistLeaveTypeId.value
    form.value.attachment = null
    imgAttachment.value = persistAttachment
    DOM_form.value.reset()
  } catch (error) {
    console.log(error)
  }
}

const onSubmit = async () => {
  const finalForm = { ...form.value }
  finalForm.dates = finalForm.dates.filter((x) => x !== "")
  const formData = new FormData()
  for (const key in finalForm) {
    if (form.value[key] && key !== "dates")
      formData.append(key, form.value[key])
  }
  finalForm.dates.forEach((date) => {
    formData.append("dates[]", date)
  })
  try {
    showAlert.value = false
    isLoading.value = true
    error.value = { ...initError }
    const response = await Api.post(endpoint.value, formData)
    if (response.status === 201 || response.status === 200) {
      Toast.fire({
        title: "Data tersimpan",
        icon: "success",
      })
      router.back()
    }
  } catch (axiosErr) {
    if (axiosErr.response) {
      const errorContent = axiosErr.response
      if (errorContent.status === 422) {
        Object.assign(error.value, errorContent.data.errors)
        showAlert.value = typeof error.value.dates[0] !== "undefined"
      }
    }
  } finally {
    isLoading.value = false
  }
}

const getAllowedDates = (date) => {
  return !form.value.dates.includes(moment(date).format("YYYY-MM-DD"))
}

const getLeaveTypes = async () => {
  const response = await Api.get("leave-types")
  if (response.status === 200) leaveTypes.value = response.data.data
}

const getData = async (id) => {
  const response = await Api.get(`leave/${id}?detailed=true`)
  if (response.status === 204) {
    Toast.fire({
      title: "Data tidak ditemukan",
      icon: "warning",
    })
    router.back()
    return
  }
  if (response.status === 200) {
    const responseData = response.data.data
    const details = responseData.leave_details.data
    persistLeaveTypeId.value = responseData.leave_type_id
    persistAttachment.value = `${API_URL}${responseData.attachment}`
    imgAttachment.value = persistAttachment.value
    form.value.leave_type_id = responseData.leave_type_id
    form.value.user_id = responseData.user_id
    form.value.notes = responseData.notes
    const dates = []
    details.forEach((detail) => {
      dates.push(detail.leave_date)
    })
    form.value.dates = [...dates]
  }
}

onMounted(() => {
  if (props.id !== 0) {
    form.value._method = "PUT"
    endpoint.value = `leave/${props.id}`
    getData(props.id)
  }
  getLeaveTypes()
})
</script>

<style lang="scss" scoped>
.img-preview {
  width: 240px;
  height: 240px;
  object-fit: contain;
}
</style>

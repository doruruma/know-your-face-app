<template>
  <div class="text-h5 mb-3">
    <BackButton />
    Tinjau Pengajuan Cuti
  </div>

  <div class="bg-white pa-6 rounded-lg">
    <CircularProgress :show="isLoading" />
    <div v-if="!isLoading">
      <v-chip
        variant="tonal"
        :color="chipWorkstateColor(data.workstate_id)"
      >
        {{ data.workstate?.name }}
      </v-chip>
      <v-divider class="my-4" />
      <v-row>
        <v-col
          cols="12"
          lg="4"
          md="6"
          xs="12"
        >
          <div class="mb-6">
            <div class="text-subtitle-2 font-weight-medium">Pemohon :</div>
            <div>{{ user.name ?? "-" }}</div>
            <div>
              <i>{{ user.nik ?? "-" }}</i>
            </div>
          </div>
          <div class="mb-6">
            <div class="text-subtitle-2 font-weight-medium">
              Kontak Pemohon :
            </div>
            <div>{{ user.phone ?? "-" }}</div>
          </div>
          <div class="mb-6">
            <div class="text-subtitle-2 font-weight-medium">Urgensi :</div>
            <div>{{ data?.leave_type?.name ?? "-" }}</div>
          </div>
        </v-col>
        <v-col
          cols="12"
          lg="4"
          md="6"
          xs="12"
        >
          <div class="mb-6">
            <div class="text-subtitle-2 font-weight-medium">
              Tanggal Pengajuan :
            </div>
            <div>{{ data.created_at }}</div>
          </div>
          <div class="mb-6">
            <div class="text-subtitle-2 font-weight-medium">Catatan :</div>
            <div>{{ data.notes }}</div>
          </div>
          <div class="mb-6">
            <div class="text-subtitle-2 font-weight-medium">Lampiran :</div>
            <i v-if="data.attachment === null">Tidak ada lampiran</i>
            <div v-if="data.attachment">
              <img
                id="imgPreview"
                :src="`${API_URL}${data.attachment}`"
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>

  <div class="text-subtitle-1 font-weight-medium my-3">
    Tanggal Yang Diajukan
  </div>
  <div class="bg-white pa-6 rounded-lg mb-3">
    <CircularProgress :show="isLoading" />
    <template v-if="!isLoading">
      <v-table
        fixedHeader
        style="max-height: 540px"
      >
        <thead>
          <tr class="text-left">
            <th>#</th>
            <th>Tanggal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in details"
            :key="index"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.formatted_leave_date }}</td>
            <td>
              <template v-if="showManage">
                <v-btn
                  v-if="item.workstate_id !== 1"
                  class="mr-2"
                  variant="tonal"
                  :color="
                    item.workstate_id === 2
                      ? 'teal'
                      : item.workstate_id === 3
                        ? 'red'
                        : 'grey'
                  "
                  size="small"
                >
                  {{
                    item.workstate_id === 2
                      ? "Disetujui"
                      : item.workstate_id === 3
                        ? "Ditolak"
                        : "-"
                  }}
                </v-btn>
                <div
                  v-if="item.workstate_id === 1"
                  class="d-flex align-center"
                >
                  <v-btn
                    class="mr-2"
                    variant="flat"
                    prependIcon="mdi-check"
                    color="teal"
                    size="small"
                    @click="() => onApproveClick(item.id, index)"
                  >
                    Setujui
                  </v-btn>
                  <v-btn
                    variant="flat"
                    prependIcon="mdi-close"
                    color="red"
                    size="small"
                    @click="() => onRejectClick(item.id, index)"
                  >
                    Tolak
                  </v-btn>
                </div>
              </template>
            </td>
          </tr>
        </tbody>
      </v-table>
      <div
        v-if="error.details[0] != ''"
        class="text-caption text-error mt-1"
      >
        {{ error.details[0] }}
      </div>
      <v-divider
        class="my-6"
        thickness="3"
      />
      <TextareaField
        v-if="showManage"
        v-model="form.approval_notes"
        label="Catatan (opsional)"
        placeholder="Masukan catatan tambahan"
      />
      <v-btn
        v-if="showManage"
        type="submit"
        :loading="isSubmitLoading"
        variant="flat"
        @click="onSubmit"
      >
        Simpan
      </v-btn>
      <template v-if="showAction">
        <v-btn
          class="mr-2"
          prepend-icon="mdi-pencil"
          variant="flat"
          color="teal"
          @click="onEdit"
        >
          Edit
        </v-btn>
        <v-btn
          prepend-icon="mdi-close"
          variant="flat"
          color="red"
          @click="onDelete"
        >
          Batalkan
        </v-btn>
      </template>
    </template>
  </div>
</template>

<script setup>
import TextareaField from "@/components/textfield/TextareaField.vue"
import BackButton from "@/components/utils/BackButton.vue"
import CircularProgress from "@/components/utils/CircularProgress.vue"
import Api from "@/core/ApiService"
import { API_URL, STATE_REQUESTED_ID, isManagement } from "@/core/Constants"
import { chipWorkstateColor } from "@/core/Helper"
import { Prompt, Toast } from "@/core/Swal"
import router from "@/router"
import { onMounted, ref, toRefs } from "vue"
import { useRoute } from "vue-router"
import { globalState } from "@/core/State"

const initForm = {
  _method: "PUT",
  approval_notes: "",
  details: [],
}
const initError = {
  approval_notes: "",
  details: [],
}

const route = useRoute()
const id = parseInt(
  typeof route.params.id !== "undefined" ? route.params.id : 0,
)
const global = toRefs(globalState)
const showManage = ref(false)
const showAction = ref(false)
const isLoading = ref(false)
const isSubmitLoading = ref(false)
const data = ref({})
const user = ref({})
const details = ref([])
const form = ref(initForm)
const error = ref(initError)

const getData = async () => {
  try {
    isLoading.value = true
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
      data.value = responseData
      user.value = responseData.user
      details.value = responseData.leave_details.data
      showManage.value =
        isManagement() && responseData.workstate_id === STATE_REQUESTED_ID
      showAction.value =
        !isManagement() && responseData.workstate_id === STATE_REQUESTED_ID
      console.log(showAction.value)
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const onApproveClick = (id, index) => {
  details.value[index].workstate_id = 2
  form.value.details.push({
    id,
    workstate_id: 2,
  })
}

const onRejectClick = (id, index) => {
  details.value[index].workstate_id = 3
  form.value.details.push({
    id,
    workstate_id: 3,
  })
}

const onEdit = () => {
  router.push({ name: "edit-leave", params: { id } })
}

const onDelete = () => {
  Prompt.fire({
    title: "Batalkan pengajuan cuti?",
  }).then((result) => {
    if (result.value) cancelData(id)
  })
}

const onSubmit = async () => {
  if (form.value.details.length < details.value.length) {
    Toast.fire({
      title: "Anda belum menentukan status pengajuan cuti",
      icon: "error",
    })
    return
  }
  try {
    isSubmitLoading.value = true
    const response = await Api.post(`leave/approve/${id}`, form.value)
    if (response.status === 200) {
      Toast.fire({
        title: "Data tersimpan",
        icon: "success",
      })
      router.back()
    }
  } catch (axiosErr) {
    if (axiosErr.response) {
      console.log(axiosErr)
    }
  } finally {
    isSubmitLoading.value = false
  }
}

const cancelData = async (id) => {
  try {
    global.isLoading.value = true
    const response = await Api.post(`leave/cancel/${id}`, { _method: "put" })
    if (response.status === 200) {
      Toast.fire({
        title: "Pengajuan berhasil dibatalkan",
        icon: "success",
      })
      router.back()
    }
  } catch (error) {
    console.log(error)
  } finally {
    global.isLoading.value = false
  }
}

onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
#imgPreview {
  width: 320px;
  height: 320px;
  object-fit: contain;
}
</style>

<template>
  <div class="text-h5 mb-3">
    <BackButton />
    Detail Pengajuan Cuti
  </div>
  <div class="bg-white pa-6 rounded">
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
              <!-- TODO -->
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import BackButton from "@/components/utils/BackButton.vue"
import CircularProgress from "@/components/utils/CircularProgress.vue"
import Api from "@/core/ApiService"
import { chipWorkstateColor } from "@/core/Helper"
import { Toast } from "@/core/Swal"
import router from "@/router"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const id = parseInt(
  typeof route.params.id !== "undefined" ? route.params.id : 0,
)
const isLoading = ref(false)
const data = ref({})
const user = ref({})
const details = ref([])

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

<template>
  <div class="text-h5 mb-3">
    <BackButton />
    Detail Kehadiran
  </div>
  <div class="bg-white pa-6 rounded-lg">
    <CircularProgress :show="isLoading" />
    <template v-if="!isLoading">
      <div class="text-body-1 font-weight-medium">Clock In</div>
      <v-row>
        <v-col
          cols="12"
          lg="4"
          md="6"
          xs="12"
        >
          <div class="text-center">
            <img
              class="img-presence"
              :src="`${API_URL}${data.face_image_clock_in}`"
            />
          </div>
        </v-col>
        <v-col
          cols="12"
          lg="8"
          md="6"
          xs="12"
        >
          <div class="mb-4">
            <div class="text-subtitle-1 font-weight-medium">Pegawai :</div>
            <div>{{ data.user.name ?? "-" }}</div>
          </div>
          <div class="mb-4">
            <div class="text-subtitle-1 font-weight-medium">Status :</div>
            <div>{{ data.is_remote === 1 ? "WFH" : "WFO" }}</div>
            <v-chip
              variant="tonal"
              :color="chipIsLateColor(data.is_late)"
            >
              <small class="font-weight-medium">{{ data.is_late_label }}</small>
            </v-chip>
          </div>
          <div class="mb-4">
            <div class="text-subtitle-1 font-weight-medium">Clock In :</div>
            <div>{{ data.time_in }}</div>
          </div>
          <div class="mb-4">
            <div class="text-subtitle-1 font-weight-medium">Koordinat :</div>
            <div><b>Long : </b>{{ data.longitude_clock_in }}</div>
            <div><b>Lat : </b>{{ data.latitude_clock_in }}</div>
            <v-btn
              prepend-icon="mdi-map-search-outline"
              class="mt-2"
              variant="flat"
              @click="onClockInMapClick"
            >
              Lihat di google map
            </v-btn>
          </div>
          <div class="mb-4">
            <div class="text-subtitle-1 font-weight-medium">
              Jarak dari kantor :
            </div>
            <div>{{ data.clock_in_distance ?? "-" }}</div>
          </div>
        </v-col>
      </v-row>
      <template v-if="data.time_out != null">
        <v-divider
          :thickness="2"
          class="my-4"
        ></v-divider>
        <div class="text-body-1 font-weight-medium">Clock Out</div>
        <v-row>
          <v-col
            cols="12"
            lg="4"
            md="6"
            xs="12"
          >
            <div class="text-center">
              <img
                class="img-presence"
                :src="`${API_URL}${data.face_image_clock_out}`"
              />
            </div>
          </v-col>
          <v-col
            cols="12"
            lg="8"
            md="6"
            xs="12"
          >
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Clock Out :</div>
              <div>{{ data.time_out }}</div>
            </div>
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">Koordinat :</div>
              <div><b>Long : </b>{{ data.longitude_clock_out }}</div>
              <div><b>Lat : </b>{{ data.latitude_clock_out }}</div>
              <v-btn
                prepend-icon="mdi-map-search-outline"
                class="mt-2"
                variant="flat"
                @click="onClockOutMapClick"
              >
                Lihat di google map
              </v-btn>
            </div>
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium">
                Jarak dari kantor :
              </div>
              <div>{{ data.clock_out_distance ?? "-" }}</div>
            </div>
          </v-col>
        </v-row>
      </template>
    </template>
  </div>
</template>

<script setup>
import BackButton from "@/components/utils/BackButton.vue"
import CircularProgress from "@/components/utils/CircularProgress.vue"
import Api from "@/core/ApiService"
import { API_URL } from "@/core/Constants"
import { chipIsLateColor } from "@/core/Helper"
import { ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const id = route.params.id
const data = ref(null)
const isLoading = ref(true)
const isNotFound = ref(false)

const onClockInMapClick = () => {
  window.open(
    `https://maps.google.com/?q=${data.value.latitude_clock_in},${data.value.longitude_clock_in}`,
  )
}

const onClockOutMapClick = () => {
  window.open(
    `https://maps.google.com/?q=${data.value.latitude_clock_out},${data.value.longitude_clock_out}`,
  )
}

const getData = async () => {
  isLoading.value = true
  try {
    const response = await Api.get(`presence/${id}`)
    if (response.status === 204) isNotFound.value = true
    if (response.status === 200) data.value = response.data.data
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

getData()
</script>

<style lang="scss" scoped>
.img-presence {
  width: 320px;
  height: 320px;
  object-fit: contain;
}
</style>

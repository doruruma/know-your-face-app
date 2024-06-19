<template>

  <v-row class="justify-end pb-3">
    <v-col cols="12" lg="4" sm="6" xs="12">
      <SelectField
        v-model="statusId"
        label="Filter Status"
        place-holder="Status"
        item-value="id"
        item-title="name"
        :items="statuses"
        clearable
        @update:modelValue="onStatusChange" />
    </v-col>
  </v-row>

  <v-table
    fixed-header
    style="max-height: 540px">
    <thead>
      <tr class="text-left">
        <th>Pegawai</th>
        <th>Status</th>
        <th>Clock In</th>
        <th>Clock Out</th>
        <th>Jarak Clock In</th>
        <th>Jarak Clock Out</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in data"
        :key="`${item.id}-${index}`">
        <td>{{ item.user.name ?? '-' }}</td>
        <td>{{ item.is_remote === 1 ? 'WFH' : 'WFO' }}</td>
        <td>
          <div class="d-flex align-center py-1">
            <img
              class="img-presence mr-2"
              :src="`${API_URL}${item.face_image_clock_in}`" />
            <div>{{ item.time_in }}</div>
          </div>
        </td>
        <td>
          <template v-if="item.time_out !== null">
            <div class="d-flex align-center py-1">
              <img
                class="img-presence mr-2"
                :src="`${API_URL}${item.face_image_clock_out}`" />
              <div>{{ item.time_out }}</div>
            </div>
          </template>
        </td>
        <td>
          {{ item.clock_in_distance ?? '-' }}
        </td>
        <td>
          <template v-if="item.time_out !== null">
            {{ item.clock_out_distance ?? '-' }}
          </template>
        </td>
        <td>
          <div class="d-flex align-center">
            <v-btn variant="flat" icon="mdi-information-variant" size="small" class="mr-2" @click="() => onDetail(item.id)" />
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <v-pagination v-if="data.length > 0" v-model="page" :length="lastPage" class="mt-4" @update:modelValue="onPageChange">
  </v-pagination>

</template>

<script setup>
import { API_URL } from '@/core/Constants'
import { ref } from 'vue'
import SelectField from '../textfield/SelectField.vue'

defineProps({
  data: {
    type: Array,
    default: Array
  },
  lastPage: {
    type: Number,
    default: 1
  }
})

const statuses = ref([
  { id: 1, name: 'WFO' },
  { id: 2, name: 'WFH' }
])
const statusId = ref(null)
const page = ref(1)
const emit = defineEmits([
  'pageChange',
  'statusChange',
  'detail'
])

const onPageChange = (value) => {
  emit('pageChange', value)
}

const onStatusChange = (value) => {
  console.log(value)
  emit('statusChange', value)
}

const onDetail = (id) => {
  emit('detail', id)
}

</script>

<style lang="scss" scoped>
.img-presence {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
</style>
<template>

  <!-- TODO: filter -->

  <v-table
    fixed-header
    style="max-height: 540px">
    <thead>
      <tr class="text-left">
        <th>Tanggal WFH</th>
        <th>Pegawai</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in data"
        :key="`${item.id}-${index}`">
        <td>{{ item.formated_date }}</td>
        <td>
          <div class="d-flex align-center py-1">
            <img
              class="img-profile mr-2"
              :src="`${API_URL}${item.user.profile_image ?? '-'}`" />
            <span>{{ item.user.name ?? '-' }}</span>
          </div>
        </td>
        <td>
          <div class="d-flex align-center">
            <v-btn
              variant="flat"
              icon="mdi-pencil"
              size="small"
              color="teal"
              class="mr-2"
              @click="() => onEdit(item.id)">
            </v-btn>
            <v-btn
              variant="flat"
              icon="mdi-trash-can"
              color="red"
              size="small"
              @click="() => onDelete(item.id)">
            </v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <v-pagination
    v-if="data.length > 0"
    v-model="page"
    :length="lastPage"
    class="mt-4"
    @update:modelValue="onPageChange">
  </v-pagination>

</template>

<script setup>
import { API_URL } from '@/core/Constants'
import { ref } from 'vue'

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

const page = ref(1)
const emit = defineEmits([
  'search',
  'pageChange',
  'edit',
  'delete'
])

const onPageChange = (value) => {
  emit('pageChange', value)
}

const onEdit = (id) => {
  emit('edit', id)
}

const onDelete = (id) => {
  emit('delete', id)
}
</script>

<style lang="scss" scoped>
.img-profile {
  width: 56px;
  height: 56px;
  object-fit: contain;
}
</style>
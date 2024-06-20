<template>

  <v-row class="justify-end">
    <v-col cols="12" lg="4" sm="6" xs="12">
      <div class="d-sm-flex d-xs-block align-center">
        <TextField
          container-styles="flex-1-0 mr-2"
          v-model="search"
          icon="mdi-magnify"
          icon-color="teal"
          color="teal"
          label="Cari pegawai"
          variant="underlined" />
        <v-btn
          class="d-none d-sm-flex"
          color="teal"
          variant="flat"
          @click="onSearch">
          Cari
        </v-btn>
        <v-btn
          class="d-xs-block d-sm-none"
          block
          color="teal"
          variant="flat"
          @click="onSearch">
          Cari
        </v-btn>
      </div>
    </v-col>
  </v-row>

  <v-table
    fixed-header
    :hover="!isCrud"
    style="max-height: 540px"
    class="mt-sm-0 mt-3">
    <thead>
      <tr class="text-left">
        <th>Nama</th>
        <th>NIK</th>
        <th>Email</th>
        <th>Nomor HP</th>
        <th>Jenis kelamin</th>
        <th>Posisi</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in data"
        :key="`${item.id}-${index}`">
        <td>
          <div class="d-flex align-center py-1">
            <img
              class="img-profile mr-2"
              :src="`${API_URL}${item.profile_image}`" />
            <span>{{ item.name }}</span>
          </div>
        </td>
        <td>{{ item.nik }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.formatted_gender }}</td>
        <td>{{ item.position.name ?? '-' }}</td>
        <td>
          <div class="d-flex align-center">
            <v-btn
              v-if="!isCrud"
              variant="tonal"
              :prepend-icon="selectedId === item.id ? 'mdi-check-bold' : ''"
              color="teal"
              @click="() => onClick(item)">
              {{ selectedId === item.id ? 'Terpilih' : 'Pilih' }}
            </v-btn>
            <template v-if="isCrud">
              <v-btn
                variant="flat"
                icon="mdi-information-variant"
                size="small"
                class="mr-2"
                @click="() => onDetail(item.id)">
              </v-btn>
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
            </template>
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
import TextField from '../textfield/TextField.vue'
import { ref } from 'vue'

defineProps({
  data: {
    type: Array,
    default: Array
  },
  isCrud: {
    type: Boolean,
    default: true
  },
  selectedId: {
    type: Number,
    default: 0
  },
  lastPage: {
    type: Number,
    default: 1
  }
})

const search = ref('')
const page = ref(1)
const emit = defineEmits([
  'search',
  'pageChange',
  'click',
  'detail',
  'edit',
  'delete'
])

const onPageChange = (value) => {
  emit('pageChange', value)
}

const onSearch = () => {
  page.value = 1
  emit('search', search.value)
}

const onClick = item => {
  emit('click', item)
}

const onDetail = id => {
  emit('detail', id)
}

const onEdit = id => {
  emit('edit', id)
}

const onDelete = id => {
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
<template>
  <v-row class="justify-end pb-3">
    <v-col
      cols="12"
      lg="4"
      sm="6"
      xs="12"
    >
      <div class="d-sm-flex d-xs-block align-center">
        <TextField
          container-styles="flex-1-0 mr-2"
          v-model="search"
          icon="mdi-magnify"
          icon-color="teal"
          color="teal"
          label="Cari Data"
          variant="underlined"
        />
        <v-btn
          class="d-none d-sm-flex"
          color="teal"
          variant="flat"
          @click="onSearch"
        >
          Cari
        </v-btn>
        <v-btn
          class="d-xs-block d-sm-none"
          block
          color="teal"
          variant="flat"
          @click="onSearch"
        >
          Cari
        </v-btn>
      </div>
    </v-col>
  </v-row>

  <v-table
    fixed-header
    style="max-height: 540px"
  >
    <thead>
      <tr class="text-left">
        <th>Tanggal Libur</th>
        <th>Keterangan</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in data"
        :key="`${item.id}-${index}`"
      >
        <td>{{ item.formatted_date }}</td>
        <td>{{ item.name }}</td>
        <td>
          <div
            class="d-flex align-center"
            v-if="isManagement()"
          >
            <v-btn
              variant="flat"
              icon="mdi-pencil"
              size="small"
              color="teal"
              class="mr-2"
              @click="() => onEdit(item.id)"
            >
            </v-btn>
            <v-btn
              variant="flat"
              icon="mdi-trash-can"
              color="red"
              size="small"
              @click="() => onDelete(item.id)"
            >
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
    @update:modelValue="onPageChange"
  >
  </v-pagination>
</template>

<script setup>
import { isManagement } from "@/core/Constants"
import TextField from "../textfield/TextField.vue"
import { ref } from "vue"

defineProps({
  data: {
    type: Array,
    default: Array,
  },
  lastPage: {
    type: Number,
    default: 1,
  },
})

const search = ref("")
const page = ref(1)
const emit = defineEmits(["search", "pageChange", "edit", "delete"])

const onPageChange = (value) => {
  emit("pageChange", value)
}

const onSearch = () => {
  page.value = 1
  emit("search", search.value)
}

const onEdit = (id) => {
  emit("edit", id)
}

const onDelete = (id) => {
  emit("delete", id)
}
</script>

<style lang="scss" scoped></style>

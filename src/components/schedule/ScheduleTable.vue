<template>
  <v-row class="justify-end pt-3">
    <v-col
      cols="12"
      lg="4"
      sm="6"
      xs="12"
    >
      <TextField
        v-model="userName"
        readonly
        clearable
        container-styles=""
        label="Filter Pegawai"
        placeholder="Pilih Pegawai"
        @click="handleInputUserClick"
        @clear="handleInputUserClear"
      />
    </v-col>
  </v-row>

  <v-table
    fixed-header
    style="max-height: 540px"
  >
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
        :key="`${item.id}-${index}`"
      >
        <td>{{ item.formatted_date }}</td>
        <td>
          <div class="d-flex align-center py-1">
            <img
              class="img-profile mr-2"
              :src="`${API_URL}${item.user.profile_image ?? '-'}`"
            />
            <span>{{ item.user.name ?? "-" }}</span>
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

  <v-dialog
    v-model="showUserDialog"
    class="align-start"
  >
    <div class="bg-white pa-6 rounded-lg">
      <UserTable
        :data="users"
        :last-page="usersLastPage"
        :is-crud="false"
        :selected-id="userId"
        @pageChange="handleUsersPageChange"
        @search="handleUsersSearch"
        @click="handleUsersClick"
      />
    </div>
  </v-dialog>
</template>

<script setup>
import { API_URL } from "@/core/Constants"
import { ref, watch } from "vue"
import TextField from "../textfield/TextField.vue"
import Api from "@/core/ApiService"
import UserTable from "../user/UserTable.vue"

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

const showUserDialog = ref(false)
const userId = ref(null)
const userName = ref("")
const users = ref([])
const usersPage = ref(1)
const usersLastPage = ref(1)
const usersSearch = ref(null)
const page = ref(1)
const emit = defineEmits(["search", "pageChange", "edit", "delete"])

const handleInputUserClick = () => {
  showUserDialog.value = true
}

const handleInputUserClear = () => {
  userId.value = null
  userName.value = ""
  emit("search", null)
}

const handleUsersPageChange = (value) => {
  usersPage.value = value
}

const handleUsersSearch = (value) => {
  usersSearch.value = value
  usersPage.value = 1
  getUsers()
}

const handleUsersClick = (value) => {
  userId.value = value.id
  userName.value = value.name
  showUserDialog.value = false
  emit("search", value.id)
}

const onPageChange = (value) => {
  emit("pageChange", value)
}

const onEdit = (id) => {
  emit("edit", id)
}

const onDelete = (id) => {
  emit("delete", id)
}

const getUsers = async () => {
  let url = `users?page=${usersPage.value}`
  if (usersSearch.value) url += `&search=${usersSearch.value}`
  const response = await Api.get(url)
  if (response.status === 200) {
    const result = response.data
    users.value = result.data
    usersLastPage.value = result.meta.last_page
  }
}

watch(showUserDialog, () => {
  if (showUserDialog.value) getUsers()
})
</script>

<style lang="scss" scoped>
.img-profile {
  width: 56px;
  height: 56px;
  object-fit: contain;
}
</style>

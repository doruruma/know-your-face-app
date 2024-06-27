<template>
  <v-row class="justify-end pt-3">
    <v-col
      v-if="isManagement()"
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
    <v-col
      cols="12"
      lg="4"
      sm="6"
      xs="12"
    >
      <SelectField
        v-model="statusId"
        label="Filter Status"
        place-holder="Status"
        item-value="id"
        item-title="name"
        container-styles=""
        :items="statuses"
        clearable
        @update:modelValue="onStatusChange"
      />
    </v-col>
  </v-row>

  <v-table
    fixed-header
    style="max-height: 540px"
  >
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
        :key="`${item.id}-${index}`"
      >
        <td>{{ item.user.name ?? "-" }}</td>
        <td>{{ item.is_remote === 1 ? "WFH" : "WFO" }}</td>
        <td>
          <div class="d-flex align-center py-1">
            <img
              class="img-presence mr-2"
              :src="`${API_URL}${item.face_image_clock_in}`"
            />
            <div>{{ item.time_in }}</div>
          </div>
        </td>
        <td>
          <template v-if="item.time_out !== null">
            <div class="d-flex align-center py-1">
              <img
                class="img-presence mr-2"
                :src="`${API_URL}${item.face_image_clock_out}`"
              />
              <div>{{ item.time_out }}</div>
            </div>
          </template>
        </td>
        <td>
          {{ item.clock_in_distance ?? "-" }}
        </td>
        <td>
          <template v-if="item.time_out !== null">
            {{ item.clock_out_distance ?? "-" }}
          </template>
        </td>
        <td>
          <div class="d-flex align-center">
            <v-btn
              variant="flat"
              icon="mdi-information-variant"
              size="small"
              class="mr-2"
              @click="() => onDetail(item.id)"
            />
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
import { API_URL, isManagement } from "@/core/Constants"
import { ref, watch } from "vue"
import SelectField from "../textfield/SelectField.vue"
import UserTable from "../user/UserTable.vue"
import Api from "@/core/ApiService"
import TextField from "../textfield/TextField.vue"

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

const statuses = ref([
  { id: 1, name: "WFO" },
  { id: 2, name: "WFH" },
])
const showUserDialog = ref(false)
const statusId = ref(null)
const userId = ref(null)
const userName = ref("")
const users = ref([])
const usersPage = ref(1)
const usersLastPage = ref(1)
const usersSearch = ref(null)
const page = ref(1)
const emit = defineEmits(["pageChange", "statusChange", "userChange", "detail"])

const handleInputUserClick = () => {
  showUserDialog.value = true
}

const handleInputUserClear = () => {
  userId.value = null
  userName.value = ""
  emit("userChange", null)
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
  emit("userChange", value.id)
}

const onPageChange = (value) => {
  emit("pageChange", value)
}

const onStatusChange = (value) => {
  emit("statusChange", value)
}

const onDetail = (id) => {
  emit("detail", id)
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
.img-presence {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
</style>

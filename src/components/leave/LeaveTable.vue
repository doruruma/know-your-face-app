<template>
  <v-row class="justify-end pt-3">
    <v-col cols="12" lg="4" sm="6" xs="12">
      <TextField
        v-model="userName"
        readonly
        clearable
        container-styles=""
        label="Filter Pegawai"
        placeholder="Pilih Pegawai"
        @click="handleInputUserClick"
        @clear="handleInputUserClear" />
    </v-col>
    <v-col cols="12" lg="4" sm="6" xs="12">
      <SelectField
        v-model="statusId"
        label="Filter Status"
        place-holder="Status"
        item-value="id"
        item-title="name"
        container-styles=""
        :items="statuses"
        clearable
        @update:modelValue="onStatusChange" />
    </v-col>
  </v-row>

  <v-table
    fixed-header
    style="max-height: 540px"
    class="mt-sm-0 mt-3">
    <thead>
      <tr class="text-left">
        <th>Tgl Pengajuan</th>
        <th>Tgl Approve</th>
        <th>Pemohon</th>
        <th>Approver</th>
        <th>Tgl Cuti</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in data"
        :key="`${item.id}-${index}`">
        <td>{{ item.created_at }}</td>
        <td>{{ item.approved_date ?? '-' }}</td>
        <td>{{ item.user.name ?? '-' }}</td>
        <td>{{ item.approver?.name ?? '-' }}</td>
        <td>
          <div
            v-for="(item, index) in item.leave_details?.data ?? []"
            :key="`${item.id}-${index}`"
            class="d-flex align-center">
            <v-icon icon="mdi-circle-small" />
            <span>{{ item.leave_date }}</span>
          </div>
        </td>
        <td>
          <v-chip
            variant="tonal"
            :color="chipWorkstateColor(item.workstate_id)">
            <small class="font-weight-medium">{{ item.workstate.name }}</small>
          </v-chip>
        </td>
        <td>
          <div class="d-flex align-center">
            <v-btn
              v-if="item.workstate_id === 1"
              variant="flat"
              class="mr-2"
              color="teal"
              prepend-icon="mdi-eye"
              @click="() => onAction(item.id)">
              Tinjau
            </v-btn>
            <v-btn
              v-if="item.workstate_id > 1"
              size="small"
              variant="flat"
              icon="mdi-information-variant"
              @click="() => onDetail(item.id)" />
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

  <v-dialog v-model="showUserDialog" class="align-start">
    <div class="bg-white pa-6 rounded-lg">
      <UserTable
        :data="users"
        :last-page="usersLastPage"
        :is-crud="false"
        :selected-id="userId"
        @pageChange="handleUsersPageChange"
        @search="handleUsersSearch"
        @click="handleUsersClick" />
    </div>
  </v-dialog>

</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import TextField from '../textfield/TextField.vue'
import UserTable from '../user/UserTable.vue'
import Api from '@/core/ApiService';
import SelectField from '../textfield/SelectField.vue';
import { chipWorkstateColor } from '@/core/Helper';

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

const statuses = ref([])
const showUserDialog = ref(false)
const statusId = ref(null)
const userId = ref(null)
const userName = ref('')
const users = ref([])
const usersPage = ref(1)
const usersLastPage = ref(1)
const usersSearch = ref(null)
const page = ref(1)
const emit = defineEmits([
  'pageChange',
  'userChange',
  'statusChange',
  'action',
  'detail',
])

const handleInputUserClick = () => {
  showUserDialog.value = true
}

const handleInputUserClear = () => {
  userId.value = null
  userName.value = ''
  emit('userChange', null)
}

const handleUsersPageChange = value => {
  usersPage.value = value
}

const handleUsersSearch = value => {
  usersSearch.value = value
  usersPage.value = 1
  getUsers()
}

const handleUsersClick = value => {
  userId.value = value.id
  userName.value = value.name
  showUserDialog.value = false
  emit('userChange', value.id)
}

const onPageChange = (value) => {
  emit('pageChange', value)
}

const onStatusChange = (value) => {
  emit('statusChange', value)
}

const onAction = id => {
  emit('action', id)
}

const onDetail = id => {
  emit('detail', id)
}

const getUsers = async () => {
  let url = `users?page=${usersPage.value}`
  if (usersSearch.value)
    url += `&search=${usersSearch.value}`
  const response = await Api.get(url)
  if (response.status === 200) {
    const result = response.data
    users.value = result.data
    usersLastPage.value = result.meta.last_page
  }
}

const getStatuses = async () => {
  const response = await Api.get('workstates')
  if (response.status === 200)
    statuses.value = response.data.data
}

watch(showUserDialog, () => {
  if (showUserDialog.value)
    getUsers()
})

onMounted(() => {
  getStatuses()
})
</script>

<style lang="scss" scoped></style>
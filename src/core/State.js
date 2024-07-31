import { reactive } from 'vue'
import { getUser } from './LocalStorageService'

const user = getUser()

export const globalState = reactive({
  isLoading: false,
  userName: user ? user.name : null
})
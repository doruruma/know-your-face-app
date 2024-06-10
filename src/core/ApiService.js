import axios from 'axios'
import { getToken } from './LocalStorageService'

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: { Authorization: `Bearer ${getToken()}` },
  timeout: 15000
})

export default Api

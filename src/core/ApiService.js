import axios from 'axios'
import { destroyCredential, getRefreshToken, getToken, saveRefreshToken, saveToken } from './LocalStorageService'
import router from '@/router'

let isRefreshing = false
let refreshSubscribers = []

function subscribeTokenRefresh(axiosInstance) {
  refreshSubscribers.push(axiosInstance)
}

function onRefreshed(token) {
  refreshSubscribers.map(axiosInstance => axiosInstance(token))
  refreshSubscribers = []
}

const Api = axios.create({
  baseURL: `${import.meta.env.VITE_API_ENDPOINT}api/`,
  timeout: 15000
})

Api.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${getToken()}`
  return config
})

Api.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(resolve => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`
            resolve(Api(originalRequest))
          })
        })
      }
      originalRequest._retry = true
      isRefreshing = true
      return refreshToken(originalRequest)
    }
    return Promise.reject(error)
  }
)

const refreshToken = async (originalRequest) => {
  const response = await Api.post('refresh-token', { refresh_token: getRefreshToken() })
  try {
    if (response.status === 200) {
      const data = response.data
      Api.defaults.headers['Authorization'] = `Bearer ${data.access_token}`
      originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`
      saveToken(data.access_token)
      saveRefreshToken(data.refresh_token)
      onRefreshed(data.access_token)
      return Api(originalRequest)
    }
  } catch (error) {
    destroyCredential()
    router.replace({ name: 'login' })
    return Promise.reject(error)
  } finally {
    isRefreshing = false
  }
}

export default Api

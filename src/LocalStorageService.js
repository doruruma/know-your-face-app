const TOKEN_KEY = "TOKEN"
const REFRESH_TOKEN_KEY = "REFRESH_TOKEN"
const USER_ID = 'USER_ID'

export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY)
}

export const saveToken = token => {
  window.localStorage.setItem(TOKEN_KEY, token)
}

export const getRefreshToken = () => {
  return window.localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const saveRefreshToken = refreshToken => {
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export const saveUserId = userId => {
  window.localStorage.setItem(USER_ID, userId)
}

export const getUserId = () => {
  return window.localStorage.getItem(USER_ID)
}

export const destroyCredential = () => {
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(REFRESH_TOKEN_KEY)
  window.localStorage.removeItem(USER_ID)
}

export default { getToken, saveToken, getRefreshToken, saveRefreshToken, destroyCredential, saveUserId, getUserId }
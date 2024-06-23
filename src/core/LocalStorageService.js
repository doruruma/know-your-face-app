const TOKEN_KEY = 'TOKEN'
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN'
const USER_ID = 'USER_ID'
const USER = 'USER'

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

export const getUserId = () => {
  return window.localStorage.getItem(USER_ID)
}

export const saveUserId = userId => {
  window.localStorage.setItem(USER_ID, userId)
}

export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USER))
}

export const saveUser = user => {
  window.localStorage.setItem(USER, JSON.stringify(user))
}

export const destroyCredential = () => {
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(REFRESH_TOKEN_KEY)
  window.localStorage.removeItem(USER_ID)
  window.localStorage.removeItem(USER)
}

export default {
  getToken,
  saveToken,
  getRefreshToken,
  saveRefreshToken,
  destroyCredential,
  saveUserId,
  getUserId,
  saveUser,
  getUser
}
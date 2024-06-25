import { getUser } from "./LocalStorageService"

export const API_URL = import.meta.env.VITE_API_ENDPOINT
export const USER_PROFILE_IMAGE = 'default-profile.png'
export const SICK_LEAVE_ID = 1
export const LEAVE_ID = 2
export const STATE_REQUESTED_ID = 1
export const STATE_APPROVED_ID = 2
export const STATE_REJECTED_ID = 3
export const STATE_CANCELLED_ID = 4
export const MANAGEMENT_POSITION_ID = 2

export const isManagement = () => {
  return getUser().position_id === MANAGEMENT_POSITION_ID
}

export default {
  API_URL,
  USER_PROFILE_IMAGE,
  SICK_LEAVE_ID,
  LEAVE_ID,
  STATE_REQUESTED_ID,
  STATE_APPROVED_ID,
  STATE_REJECTED_ID,
  STATE_CANCELLED_ID,
  MANAGEMENT_POSITION_ID,
  isManagement
}
/**
 * Central API client.
 * --------------------------------------------------------------------------
 * The app ships with a full localStorage MOCK layer (so it runs with zero
 * backend). The moment `VITE_API_BASE_URL` is set, `API_ENABLED` flips to true
 * and the Pinia stores route their reads/writes through this axios client to the
 * real backend instead. Nothing else in the UI changes.
 *
 * Backend contract: JSON, JWT bearer auth, errors shaped as
 *   { error: { code, message, details? } }  (see backend middleware/error.js)
 */
import axios from 'axios'

// Normalise: drop trailing slashes AND a trailing `/api` if present, since we
// append `/api` below. This makes VITE_API_BASE_URL tolerant of both
// `https://host` and `https://host/api`.
const baseURL = (import.meta.env.VITE_API_BASE_URL || '')
  .replace(/\/+$/, '')
  .replace(/\/api$/, '')

export const API_ENABLED = !!baseURL

export const api = axios.create({
  baseURL: baseURL ? `${baseURL}/api` : '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach the JWT (persisted by the auth store) on every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fe_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Normalise backend errors into a plain Error with a readable message so the
// existing `catch (err) { toast.error(err.message) }` code keeps working.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const data = error.response?.data
    const message =
      data?.error?.message ||
      data?.message ||
      error.message ||
      'Something went wrong. Please try again.'
    const normalised = new Error(message)
    normalised.code = data?.error?.code
    normalised.status = error.response?.status
    normalised.details = data?.error?.details
    // Auto sign-out on an expired/invalid token.
    if (error.response?.status === 401 && localStorage.getItem('fe_token')) {
      localStorage.removeItem('fe_token')
      localStorage.removeItem('fe_user')
    }
    return Promise.reject(normalised)
  }
)

/** Unwrap `res.data` for convenience. */
export async function get(url, config) {
  return (await api.get(url, config)).data
}
export async function post(url, body, config) {
  return (await api.post(url, body, config)).data
}
export async function patch(url, body, config) {
  return (await api.patch(url, body, config)).data
}
export async function del(url, config) {
  return (await api.delete(url, config)).data
}

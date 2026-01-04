/**
 * Centralized HTTP client based on Axios.
 *
 * - Defines a single API base URL
 * - Automatically attaches authentication headers
 * - Handles global authentication errors
 */

import axios from "axios"

/**
 * Axios instance configuration
 * - baseURL is provided through environment variables (Vite)
 * - JSON is used as the default content type
 */
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

/**
 * Request interceptor
 * Attaches the JWT token to every outgoing request if present.
 */
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * Response interceptor
 * Handles global authentication errors.
 * If the session is invalid, the user is redirected to the login page.
 */
httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(err)
  }
)

export default httpClient

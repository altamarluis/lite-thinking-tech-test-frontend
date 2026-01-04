/**
 * API layer for authentication-related requests.
 * This module abstracts HTTP calls related to user authentication,
 * keeping API logic separated from UI components.
 */

import httpClient from "./apiClient"

/**
 * Sends login credentials to the authentication endpoint.
 *
 * @param {Object} credentials - User login data
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise} Axios response promise
 */
export const loginRequest = (credentials) =>
  httpClient.post("/auth/login/", credentials)

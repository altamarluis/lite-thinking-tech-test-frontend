/**
 * API layer for company-related operations.
 * This module provides a clear abstraction over HTTP requests
 * associated with company management.
 */

import httpClient from "./apiClient"

/**
 * Retrieves the list of all companies.
 *
 * @returns {Promise} Axios response promise
 */
export const getCompanies = () =>
  httpClient.get("/companies/")

/**
 * Creates a new company.
 *
 * @param {Object} data - Company payload
 * @returns {Promise} Axios response promise
 */
export const createCompany = (data) =>
  httpClient.post("/companies/", data)

/**
 * Updates an existing company.
 *
 * @param {string} nit - Company unique identifier
 * @param {Object} data - Updated company payload
 * @returns {Promise} Axios response promise
 */
export const updateCompany = (nit, data) =>
  httpClient.put(`/companies/${nit}/`, data)

/**
 * Deletes a company by its NIT.
 *
 * @param {string} nit - Company unique identifier
 * @returns {Promise} Axios response promise
 */
export const deleteCompany = (nit) =>
  httpClient.delete(`/companies/${nit}/`)

/**
 * API layer for product-related operations.
 * This module centralizes all HTTP requests related to products,
 * ensuring a clean separation between data access and UI logic.
 */

import httpClient from "./apiClient"

/**
 * Retrieves the list of all products.
 *
 * @returns {Promise} Axios response promise
 */
export const getProducts = () =>
  httpClient.get("/products/")


/**
 * Creates a new product.
 *
 * @param {Object} data - Product payload
 * @returns {Promise} Axios response promise
 */
export const createProduct = (data) =>
  httpClient.post("/products/", data)

/**
 * Updates an existing product.
 *
 * @param {string} code - Product unique identifier
 * @param {Object} data - Updated product payload
 * @returns {Promise} Axios response promise
 */
export const updateProduct = (code, data) =>
  httpClient.put(`/products/${code}/`, data)

/**
 * Deletes a product by its code.
 *
 * @param {string} code - Product unique identifier
 * @returns {Promise} Axios response promise
 */
export const deleteProduct = (code) =>
  httpClient.delete(`/products/${code}/`)

/**
 * Retrieves products associated with a specific company.
 *
 * @param {string} nit - Company unique identifier
 * @returns {Promise} Axios response promise
 */
export const getProductsByCompany = (nit) =>
  httpClient.get(`/products/company/${nit}/`)

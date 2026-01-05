/**
 * API layer for inventory-related operations.
 * This module encapsulates all HTTP requests related to inventory
 * management, reporting, and external integrations.
 */
import httpClient from "./apiClient"

/**
 * Retrieves the complete inventory list.
 *
 * @returns {Promise} Axios response promise
 */
export const getInventory = () =>
  httpClient.get("/inventory/")

/**
 * Creates a new inventory item.
 *
 * @param {Object} data - Inventory item payload
 * @returns {Promise} Axios response promise
 */
export const createInventoryItem = (data) =>
  httpClient.post("/inventory/", data)


/**
 * Deletes an inventory item by its identifier.
 *
 * @param {number|string} id - Inventory item unique identifier
 * @returns {Promise} Axios response promise
 */
export const deleteInventoryItem = (id) =>
  httpClient.delete(`/inventory/${id}/`)

/**
 * Retrieves inventory items associated with a specific company.
 *
 * @param {string} nit - Company unique identifier
 * @returns {Promise} Axios response promise
 */
export const getInventoryByCompany = (nit) =>
  httpClient.get(`/inventory/company/${nit}/`)

/**
 * Downloads the inventory report in PDF format.
 *
 * @returns {Promise} Axios response promise containing a PDF blob
 */
export const downloadInventoryPDF = () =>
  httpClient.get("/inventory/pdf/", {
    responseType: "blob",
  })

/**
 * Sends the inventory PDF report to a specified email address.
 *
 * @param {string} email - Destination email address
 * @returns {Promise} Axios response promise
 */
export const sendInventoryEmail = (email) =>
  httpClient.post("/email/send/", { email })

/**
 * Retrieves a summarized view of the inventory.
 *
 * @returns {Promise} Axios response promise
 */
export const getInventorySummary = () =>
  httpClient.get("/inventory/summary/")

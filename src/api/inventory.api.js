import httpClient from "./apiClient"

export const getInventory = () =>
  httpClient.get("/inventory/")

export const createInventoryItem = (data) =>
  httpClient.post("/inventory/", data)

export const deleteInventoryItem = (id) =>
  httpClient.delete(`/inventory/${id}/`)

export const getInventoryByCompany = (nit) =>
  httpClient.get(`/inventory/company/${nit}/`)

export const downloadInventoryPDF = () =>
  httpClient.get("/inventory/pdf/", {
    responseType: "blob",
  })

export const sendInventoryEmail = (email) =>
  httpClient.post("/email/send/", { email })

export const getInventorySummary = () =>
  httpClient.get("/inventory/summary/")

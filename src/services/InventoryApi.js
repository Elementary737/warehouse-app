import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const getInventory = () => API.get("/inventory");

export const getInventoryById = (id) =>
  API.get(`/inventory/${id}`);

export const createInventory = (data) =>
  API.post("/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateInventory = (id, data) =>
  API.put(`/inventory/${id}`, data);

export const updateInventoryPhoto = (id, data) =>
  API.put(`/inventory/${id}/photo`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteInventory = (id) =>
  API.delete(`/inventory/${id}`);
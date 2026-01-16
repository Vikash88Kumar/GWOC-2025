import api from "../api/axios.js";

export const getServicePage = async () => (await api.get("/services")).data;
export const updateServiceHero = async (data) => (await api.patch("/services/hero", data)).data;
export const updateServiceCTA = async (data) => (await api.patch("/services/cta", data)).data;

// Form Data functions for List
export const addServiceItem = async (formData) => (await api.post("/services/items", formData)).data;
export const updateServiceItem = async (id, formData) => (await api.patch(`/services/items/${id}`, formData)).data;
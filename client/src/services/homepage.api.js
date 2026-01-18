import api from "../api/axios.js";

export const getHomePage = async () => (await api.get("/homepage")).data;

// Hero (Accepts FormData)
export const updateHomeHero = async (data) => (await api.patch("/homepage/hero", data)).data;

export const updateHomeIntro = async (data) => (await api.patch("/homepage/intro", data)).data;

// Projects
export const updateHomeProjectsMeta = async (data) => (await api.patch("/homepage/projects/meta", data)).data;
export const addHomeProjectItem = async (formData) => (await api.post("/homepage/projects/items", formData)).data;
export const updateHomeProjectItem = async (id, formData) => (await api.patch(`/homepage/projects/items/${id}`, formData)).data;

export const updateHomeStats = async (data) => (await api.patch("/homepage/stats", data)).data;

// Clients (Accepts FormData)
export const updateHomeClients = async (formData) => (await api.patch("/homepage/clients", formData)).data;

export const updateHomeFooter = async (data) => (await api.patch("/homepage/footer", data)).data;
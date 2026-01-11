import api from "../api/axios.js";

// --- GET FULL PAGE ---
export const getServicePage = async () => {
  try {
    const res = await api.get("/service");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch service page", error);
    throw error;
  }
};

// --- HERO SECTION ---
export const updateServiceHero = async (data) => {
  try {
    // data example: { headline, subHeadline, tag, primaryCta: {...} }
    const res = await api.patch("/service/hero", data);
    return res.data;
  } catch (error) {
    console.error("Failed to update service hero", error);
    throw error;
  }
};

// --- SERVICES LIST (Array) ---
export const updateServicesList = async (servicesArray) => {
  try {
    // Backend expects a raw array of service objects
    const res = await api.patch("/service/list", servicesArray);
    return res.data;
  } catch (error) {
    console.error("Failed to update services list", error);
    throw error;
  }
};

// --- PROCESS SECTION ---
export const updateServiceProcess = async (data) => {
  try {
    const res = await api.patch("/service/process", data);
    return res.data;
  } catch (error) {
    console.error("Failed to update process section", error);
    throw error;
  }
};

// --- CTA SECTION ---
export const updateServiceCTA = async (data) => {
  try {
    const res = await api.patch("/service/cta", data);
    return res.data;
  } catch (error) {
    console.error("Failed to update service CTA", error);
    throw error;
  }
};
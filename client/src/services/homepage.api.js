import api from "../api/axios.js";

// --- GET FULL PAGE ---
export const getHomePage = async () => {
  try {
    const res = await api.get("/homepage");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch home page", error);
    throw error;
  }
};

// --- UPDATE HERO SECTION ---
export const updateHomeHero = async (data) => {
  try {
    // data: { headline, subHeadline, ctaText, ctaLink, backgroundImage }
    const res = await api.patch("/homepage/hero", data);
    return res.data;
  } catch (error) {
    console.error("Failed to update home hero", error);
    throw error;
  }
};

// --- UPDATE INTRO SECTION ---
export const updateHomeIntro = async (data) => {
  try {
    // data: { heading, description, floatingCircleText }
    const res = await api.patch("/homepage/intro", data);
    return res.data;
  } catch (error) {
    console.error("Failed to update home intro", error);
    throw error;
  }
};

// --- UPDATE PROJECTS SECTION ---
export const updateHomeProjects = async (data) => {
  try {
    // data: { heading, subHeading, items: [] }
    const res = await api.patch("/homepage/projects", data);
    return res.data;
  } catch (error) {
    console.error("Failed to update home projects", error);
    throw error;
  }
};

// --- UPDATE STATS SECTION ---
export const updateHomeStats = async (data) => {
  try {
    // data: { heading, items: [] }
    const res = await api.patch("/homepage/stats", data);
    return res.data;
  } catch (error) {
    console.error("Failed to update home stats", error);
    throw error;
  }
};

// --- UPDATE FOOTER SECTION ---
export const updateHomeFooter = async (data) => {
  try {
    // data: { heading, ctaText, marqueeImages: [] }
    const res = await api.patch("/homepage/footer", data);
    return res.data;
  } catch (error) {
    console.error("Failed to update home footer", error);
    throw error;
  }
};
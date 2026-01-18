import api from '../api/axios.js';

// --- CREATE ---
// Frontend sends: { role, message, star }
// Global Axios sends: Cookies/Token
export const createTestimonial = async (data) => {
  try {
    // No need to manually add headers or withCredentials here
    // because your api instance already handles it.
    const res = await api.post("/testimonial", data);
    return res.data;
  } catch (error) {
    console.error(
      "Testimonial failed",
      error?.response?.data || error.message
    );
    throw error;
  }
};

// --- GET ALL ---
export const getAllTestimonials = async () => {
  try {
    const res = await api.get("/testimonial");
    return res.data;
  } catch (error) {
    console.log("failed to get testimonial", error?.message);
    throw error;
  }
};

// --- TOGGLE STATUS (Admin) ---
export const toggleTestimonialActive = async (id, data) => {
  try {
    const res = await api.patch(`/testimonial/${id}`, data);
    return res.data;
  } catch (error) {
    console.log("failed to toggle isActive", error?.message);
    throw error;
  }
};

// --- REJECT (Admin) ---
export const rejectTestimonial = async (id) => {
  try {
    const res = await api.patch(`/testimonial/reject/${id}`);
    return res.data;
  } catch (error) {
    console.log("failed to reject testimonial", error?.message);
    throw error;
  }
};
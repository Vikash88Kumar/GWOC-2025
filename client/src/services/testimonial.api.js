import api from '../api/axios.js'

export const createTestimonial = async (data) => {
  try {
    const res = await api.post(
      "/testimonial",
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return res.data;
  } catch (error) {
    console.error(
      "Testimonial failed",
      error?.response?.data || error.message
    );
    throw error;
  }
};

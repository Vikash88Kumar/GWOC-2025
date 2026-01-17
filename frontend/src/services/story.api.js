import api from "../api/axios.js"

// --- 1. Full Page Operations ---

export const getStoryPage = async () => {
    try {
        const res = await api.get("/story");
        return res.data;
    } catch (error) {
        console.error("Failed to get story page", error);
        throw error;
    }
}

export const updateStoryPage = async (data) => {
    try {
        const res = await api.patch("/story", data);
        return res.data;
    } catch (error) {
        console.error("Failed to update story page", error);
        throw error;
    }
}

// --- 2. Hero Section (UPDATED) ---

export const updateHeroSection = async (data) => {
    try {
        // 'data' can now be a JSON object OR a FormData object.
        // If it's FormData, axios handles the headers automatically.
        const res = await api.patch("/story/hero", data);
        return res.data;
    } catch (error) {
        console.error("Failed to update hero section", error);
        throw error;
    }
}

// --- 3. Timeline Section (Meta & Milestones) ---

export const updateTimelineSection = async (data) => {
    try {
        const res = await api.patch("/story/timeline", data);
        return res.data;
    } catch (error) {
        console.error("Failed to update timeline meta", error);
        throw error;
    }
}

export const addMilestone = async (data) => {
    try {
        const res = await api.post("/story/timeline/milestones", data);
        return res.data;
    } catch (error) {
        console.error("Failed to add milestone", error);
        throw error;
    }
}

export const updateMilestoneById = async (id, data) => {
    try {
        const res = await api.patch(`/story/timeline/milestones/${id}`, data);
        return res.data;
    } catch (error) {
        console.error(`Failed to update milestone ${id}`, error);
        throw error;
    }
}

export const deleteMilestoneById = async (id) => {
    try {
        const res = await api.delete(`/story/timeline/milestones/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Failed to delete milestone ${id}`, error);
        throw error;
    }
}

export const replaceMilestones = async (milestonesArray) => {
    try {
        const res = await api.put("/story/timeline/milestones", milestonesArray);
        return res.data;
    } catch (error) {
        console.error("Failed to replace milestones", error);
        throw error;
    }
}

// --- 4. Marquee Section ---

export const updateMarqueeSection = async (data) => {
    try {
        const res = await api.patch("/story/marquee", data);
        return res.data;
    } catch (error) {
        console.error("Failed to update marquee", error);
        throw error;
    }
}

// --- 5. Testimonials Section ---

export const updateTestimonialsSection = async (data) => {
    try {
        const res = await api.patch("/story/testimonials", data);
        return res.data;
    } catch (error) {
        console.error("Failed to update testimonials", error);
        throw error;
    }
}
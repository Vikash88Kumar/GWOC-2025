import api from "../api/axios.js"

// --- 1. Full Page Operations ---

// GET full story page
export const getStoryPage = async () => {
    try {
        const res = await api.get("/story");
        return res.data;
    } catch (error) {
        console.error("Failed to get story page", error);
        throw error;
    }
}

// UPDATE full story page (General)
export const updateStoryPage = async (data) => {
    try {
        const res = await api.patch("/story", data);
        return res.data;
    } catch (error) {
        console.error("Failed to update story page", error);
        throw error;
    }
}

// --- 2. Hero Section ---

export const updateHeroSection = async (data) => {
    try {
        // data should be { titleLines: [], subtitle: "", miniTag: "", ... }
        const res = await api.patch("/story/hero", data);
        return res.data;
    } catch (error) {
        console.error("Failed to update hero section", error);
        throw error;
    }
}

// --- 3. Timeline Section (Meta & Milestones) ---

// Update Timeline Heading/Eyebrow
export const updateTimelineSection = async (data) => {
    try {
        // data: { eyebrow: "...", heading: "..." }
        const res = await api.patch("/story/timeline", data);
        return res.data;
    } catch (error) {
        console.error("Failed to update timeline meta", error);
        throw error;
    }
}

// Add a NEW Milestone
export const addMilestone = async (data) => {
    try {
        // data: { year, title, description, iconKey, ... }
        const res = await api.post("/story/timeline/milestones", data);
        return res.data;
    } catch (error) {
        console.error("Failed to add milestone", error);
        throw error;
    }
}

// Update an EXISTING Milestone
export const updateMilestoneById = async (id, data) => {
    try {
        const res = await api.patch(`/story/timeline/milestones/${id}`, data);
        return res.data;
    } catch (error) {
        console.error(`Failed to update milestone ${id}`, error);
        throw error;
    }
}

// Delete a Milestone
export const deleteMilestoneById = async (id) => {
    try {
        const res = await api.delete(`/story/timeline/milestones/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Failed to delete milestone ${id}`, error);
        throw error;
    }
}

// Replace ALL Milestones (Bulk Edit/Reorder)
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
        // data: { isEnabled, heading, images: [] }
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
        // data: { isEnabled, heading, items: [] }
        const res = await api.patch("/story/testimonials", data);
        return res.data;
    } catch (error) {
        console.error("Failed to update testimonials", error);
        throw error;
    }
}
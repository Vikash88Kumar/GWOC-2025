import api from "../api/axios.js"

// --- GET FULL PAGE ---
export const getFounderPage = async () => {
    try {
        const res = await api.get("/founderpage");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch founder page", error);
        throw error;
    }
}

// --- UPDATE HERO SECTION ---
export const updateFounderHero = async (data) => {
    try {
        // data: { role, firstName, lastName, tagline, experienceYears, profileImage }
        const res = await api.patch("/founderpage/hero", data);
        return res.data;
    } catch (error) {
        console.error("Failed to update hero section", error);
        throw error;
    }
}

// --- UPDATE STORY SECTION ---
export const updateFounderStory = async (data) => {
    try {
        // data: { quote, paragraphs: ["...", "..."] }
        const res = await api.patch("/founderpage/story", data);
        return res.data;
    } catch (error) {
        console.error("Failed to update story section", error);
        throw error;
    }
}

// --- UPDATE VALUES SECTION ---
export const updateFounderValues = async (valuesArray) => {
    try {
        // The controller expects a direct Array: [{ title, description, icon }, ...]
        const res = await api.patch("/founderpage/values", valuesArray);
        return res.data;
    } catch (error) {
        console.error("Failed to update values", error);
        throw error;
    }
}

// --- UPDATE MILESTONES SECTION ---
export const updateFounderMilestones = async (milestonesArray) => {
    try {
        // The controller expects a direct Array: [{ year, title, description }, ...]
        const res = await api.patch("/founderpage/milestones", milestonesArray);
        return res.data;
    } catch (error) {
        console.error("Failed to update milestones", error);
        throw error;
    }
}

// --- UPDATE CONNECT SECTION ---
export const updateFounderConnect = async (data) => {
    try {
        // data: { headline, subHeadline, email, socials: [] }
        const res = await api.patch("/founderpage/connect", data);
        return res.data;
    } catch (error) {
        console.error("Failed to update connect section", error);
        throw error;
    }
}

export const updateFounderAwards = async (data) => {
    try {
        // data: { headline, subHeadline, email, socials: [] }
        const res = await api.patch("/founderpage/awards", data);
        return res.data;
    } catch (error) {
        console.error("Failed to update connect section", error);
        throw error;
    }
}
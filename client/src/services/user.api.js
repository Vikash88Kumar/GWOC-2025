import api from "../api/axios.js";

// 1. REGISTER (Payload: firstName, email, password, etc.)
export const register = async (data) => {
    try {
        const res = await api.post("/users/register", data);
        return res.data;
    } catch (error) {
        // Throw the error so the UI (React) can catch it and show a toast
        throw error;
    }
};

// 2. LOGIN (Payload: email, password)
export const login = async (data) => {
    try {
        const res = await api.post("/users/login", data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

// 3. VERIFY OTP (Payload: email, otp)
export const verifyOTP = async (data) => {
    try {
        const res = await api.post("/users/verify-otp", data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

// 4. RESEND OTP (Payload: email)
export const resendOTP = async (data) => {
    try {
        const res = await api.post("/users/resend-otp", data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

// 5. LOGOUT
export const logout = async () => {
    try {
        const res = await api.post("/users/logout");
        return res.data;
    } catch (error) {
        throw error;
    }
};

// 6. GET CURRENT USER
export const getCurrentUser = async () => {
    try {
        // Changed to GET because we are fetching data, not sending it
        const res = await api.get("/users/current-user"); 
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const updateAccountDetails = async (data) => {
    try {
        // Changed to GET because we are fetching data, not sending it
        const res = await api.patch("/users/update-account",data); 
        return res.data;
    } catch (error) {
        throw error;
    }
};
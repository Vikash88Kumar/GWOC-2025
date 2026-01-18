import api from "../api/axios.js";

// 1. REGISTER
export const register = async (data) => {
    try {
        const res = await api.post("/users/register", data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

// 2. LOGIN
export const login = async (data) => {
    try {
        const res = await api.post("/users/login", data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

// 3. VERIFY OTP
export const verifyOTP = async (data) => {
    try {
        const res = await api.post("/users/verify-otp", data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

// 4. RESEND OTP
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
        const res = await api.get("/users/current-user"); 
        return res.data;
    } catch (error) {
        throw error;
    }
};

// 7. UPDATE ACCOUNT DETAILS (Text Data)
export const updateAccountDetails = async (data) => {
    try {
        const res = await api.patch("/users/update-account", data);
        return res.data;
    } catch (error) {
        // ✅ Fixed: Throw error so the frontend knows it failed
        throw error; 
    }
};

// ✅ 8. UPDATE AVATAR (File Upload)
// This function handles the FormData specifically
export const updateUserAvatar = async (formData) => {
    try {
        const res = await api.patch("/users/avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};
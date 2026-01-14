import { Router } from "express";
import { 
    registerUser, 
    loginUser, 
    logout, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateAccountDetails, 
    updateUserAvatar, 
    verifyOTP
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const router = Router();

// --- PUBLIC ROUTES ---

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 }
        // Removed coverImage to match new model
    ]),
    registerUser
);
router.route("/verify-otp").post(verifyOTP)
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);

// --- SECURED ROUTES (Require JWT) ---

router.route("/logout").post(verifyJwt, logout);
router.route("/change-password").post(verifyJwt, changeCurrentPassword);
router.route("/current-user").get(verifyJwt, getCurrentUser);
router.route("/update-account").patch(verifyJwt, updateAccountDetails);

// Only avatar update remains
router.route("/avatar").patch(verifyJwt, upload.single("avatar"), updateUserAvatar);

export default router;
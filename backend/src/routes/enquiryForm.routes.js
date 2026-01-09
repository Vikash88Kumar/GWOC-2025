import {Router } from "express"
// import { refreshAccessToken,changeCurrentPassword,getCurrentUser,updateAccountDetails,updateUserAvatar,updateUserCoverImage, loginUser, logout, registerUser } from "../controllers/user.controller.js"
// import { upload } from "../middlewares/multer.middleware.js"
// import  verifyJwt  from "../middlewares/auth.middleware.js"
import { submitEnquiryForm } from "../controllers/enquiryForm.controller.js"
const router =Router()


router.route("/").post(submitEnquiryForm)


export default router
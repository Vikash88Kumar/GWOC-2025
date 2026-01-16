import {Router} from "express"
import {getFounderPage,updateFounderPage,updateConnectSection,updateHeroSection,updateMilestonesSection,updateStorySection,updateValuesSection, updateAwardsSection} from '../controllers/founder.controller.js'
import { upload } from "../middlewares/multer.middleware.js";
const router=Router()

router.route("/").get( getFounderPage);
router.route("/").patch(updateFounderPage);

router.route("/hero").patch(upload.single("profileImage"),updateHeroSection);
router.route("/story").patch( updateStorySection);
router.route("/values").patch(updateValuesSection);
router.route("/milestones").patch(updateMilestonesSection);
router.route("/connect").patch( updateConnectSection);
router.route("/awards").patch( updateAwardsSection);

export default router
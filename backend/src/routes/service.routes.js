import express from "express";
import {
  getServicePage,
  updateServiceHero,
  updateServiceCTA,
  updateServiceItem,
  addServiceItem
} from "../controllers/service.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/", getServicePage);
router.patch("/hero", updateServiceHero);
router.patch("/cta", updateServiceCTA);

// List Operations (With File Upload)
router.post("/items", upload.single("serviceImage"), addServiceItem);
router.patch("/items/:itemId", upload.single("serviceImage"), updateServiceItem);

export default router;
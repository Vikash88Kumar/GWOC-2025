import express from "express";
import {
  getHomePage,
  updateHomePage,
  updateHomeHero,
  updateHomeIntro,
  updateHomeProjectItem,
  addHomeProjectItem,
  updateHomeProjectsMeta,
  updateHomeStats,
  updateHomeClients,
  updateHomeFooter
} from "../controllers/homepage.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/", getHomePage);
router.route("/").patch(updateHomePage)
// Hero (Image Upload supported)
router.patch("/hero", upload.single("heroImage"), updateHomeHero);

// Intro
router.patch("/intro", updateHomeIntro);

// Projects (Split into Meta, Add Item, Update Item)
router.patch("/projects/meta", updateHomeProjectsMeta);
router.post("/projects/items", upload.single("projectImage"), addHomeProjectItem);
router.patch("/projects/items/:itemId", upload.single("projectImage"), updateHomeProjectItem);

// Stats
router.patch("/stats", updateHomeStats);

// Clients (New Section)
router.patch("/clients", upload.single("clientLogo"), updateHomeClients);

// Footer
router.patch("/footer", updateHomeFooter);

export default router;
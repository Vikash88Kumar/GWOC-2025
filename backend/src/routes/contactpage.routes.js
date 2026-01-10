import { Router } from "express";
import { getContactPage, updateContactPage, updateFooterSection, updateFormSection, updateHeroSection, updateServicesSection } from "../controllers/contactPage.controller.js";
const router = Router();    

router.get("/", getContactPage);

router.patch("/", updateContactPage);

router.patch("/hero", updateHeroSection);
router.patch("/form", updateFormSection);
router.patch("/services", updateServicesSection);
router.patch("/footer", updateFooterSection);

export default router
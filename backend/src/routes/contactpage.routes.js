import { Router } from "express";
import { getContactPage, updateContactPage, updateFooterSection, updateFormSection, updateHeroSection, updateServicesSection } from "../controllers/contactPage.controller.js";
const router = Router();    

router.get("/contact", getContactPage);

router.put("/contact", updateContactPage);

router.put("/contact/hero", updateHeroSection);
router.put("/contact/form", updateFormSection);
router.put("/contact/services", updateServicesSection);
router.put("/contact/footer", updateFooterSection);

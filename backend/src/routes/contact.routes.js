import express from "express";
import {
  submitContactForm,
  getAllMessages,
  respondToMessage
} from "../controllers/contact.controller.js";

const router = express.Router();

/* Public */
router.post("/", submitContactForm);

/* Admin */
router.get("/", getAllMessages);
router.patch("/:id/respond", respondToMessage);

export default router;

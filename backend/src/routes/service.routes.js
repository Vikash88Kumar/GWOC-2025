import express from "express";
import {
  getServicePage,
  updateServicePage,
  updateServiceHero,
  updateServicesList,
  updateServiceCTA,
  updateServiceProcess,
} from "../controllers/service.controller.js";

const router = express.Router();

router.route("/").get(getServicePage);

router.route("/").patch(updateServicePage);

router.route("/hero").patch( updateServiceHero);
router.route("/lists").patch( updateServicesList);
router.route("/process").patch(updateServiceProcess)
router.route("/cta").patch( updateServiceCTA);

export default router;

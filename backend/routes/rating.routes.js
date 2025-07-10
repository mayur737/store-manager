import express from "express";
import {
  submitRating,
  getStoreRatings,
} from "../controllers/rating.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, submitRating);
router.get("/:id", authenticate, getStoreRatings);

export default router;

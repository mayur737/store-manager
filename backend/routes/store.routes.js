import express from "express";
import { createStore, getAllStores } from "../controllers/store.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, authorize("ADMIN"), createStore);
router.get("/", authenticate, getAllStores);

export default router;

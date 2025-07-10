import express from "express";
import {
  updatePassword,
  getAllUsers,
  createUserByAdmin,
} from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put("/update-password", authenticate, updatePassword);
router.get("/", authenticate, authorize("ADMIN"), getAllUsers);
router.post("/", authenticate, authorize("ADMIN"), createUserByAdmin);

export default router;

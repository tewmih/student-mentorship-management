import express from "express";
import authenticateJWT from "../middlewares/authMiddleware.js";
import {
  showProfile,
  updateProfile,
} from "../controllers/ProfileController.js";
import upload from "../middlewares/uploadMiddleware.js";
const router = express.Router();
router.use(authenticateJWT);

router.get("/", showProfile);

router.put(
  "/",
  upload.fields([
    { name: "profile_photo", maxCount: 1 },
    { name: "cover_photo", maxCount: 1 },
  ]),
  updateProfile
);

export default router;

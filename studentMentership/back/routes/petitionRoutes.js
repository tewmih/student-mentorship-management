

import express from "express";
import PetitionController from "../controllers/PetitionController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";
const router = express.Router();
export default router;

router.use(authenticateJWT);

// Additional petition routes if needed

module.exports = router;

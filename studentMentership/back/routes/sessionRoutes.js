const express = require("express");
const router = express.Router();
const SessionController = require("../controllers/SessionController");
const authenticateJWT = require("../middlewares/authMiddleware");

router.use(authenticateJWT);

// These routes are generally called inside mentorRoutes.js or menteeRoutes.js
// but you can expose session-specific routes here if needed

module.exports = router;

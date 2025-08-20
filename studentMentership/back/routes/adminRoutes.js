const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const authenticateJWT = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.use(authenticateJWT, roleMiddleware("admin"));

router.get("/users", AdminController.listUsers);
router.post("/assign-union/:id", AdminController.assignUnion);

module.exports = router;

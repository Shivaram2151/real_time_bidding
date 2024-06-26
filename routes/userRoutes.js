const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/profile", authMiddleware.verifyToken, userController.profile);

module.exports = router;

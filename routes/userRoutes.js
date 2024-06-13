const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// router.post("/register", userController.register);

// router.post("/login", userController.login);

//router.get("/profile", authMiddleware.verifyToken, userController.profile);
// router.get("/profile", (req, res, next) => {
//   // Call authMiddleware.verifyToken before userController.profile
//   authMiddleware.verifyToken(req, res, () => {
//     userController.profile(req, res);
//   });
// });

module.exports = router;
